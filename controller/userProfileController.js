import z from "zod";
import UserModel from "../models/userModel.js";
import { updateProfileRequest } from "../request/UpdateProfileRequest.js";
import ProfileModel from "../models/profileModel.js";
import mongoose from "mongoose";

export const publicProfile = async (req, res) => {
  const username = req.params.username;

  const user = await UserModel.findOne({
    username
  })

  if (!user) {
    return res.send("User not found")
  }

  const profile = await ProfileModel.findOne({
    user : new mongoose.Types.ObjectId(user?.id)
  })

  return res.render('index', {
    user,
    profile
  });
};

export const privateProfile = async (req, res) => {
  try {
    const userId = req.user?.id

    const user = await UserModel.findById(userId)

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        data: null
      })
    }

    return res.status(200).json({
      message: "User Profile",
      data: {
        username: user.username,
        email: user.email,
        createAt: user?.createdAt,
        updatedAt: user?.updatedAt,
        shareProfileLink: `${req.protocol}://${req.host}/${user.username}`
      }
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null
    });
  }
}

export const updateProfile = async (req, res) => {
  try {
    const validation = updateProfileRequest.safeParse(req.body)

    if (!validation.success) {
      return res.status(402).json({
        message: "Validation error",
        data: z.flattenError(validation.error)?.fieldErrors
      })
    }

    const userId = new mongoose.Types.ObjectId(req.user.id)
    const { displayName, profilePicture, bio } = validation.data

    await ProfileModel.findOneAndUpdate(
      { user: userId },
      { $set: { displayName, profilePicture, bio } },
      { new: true, upsert: true, runValidators: true }
    )

    return res.status(200).json({
      message: "Berhasil update profile",
      data: null
    })
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      data: null
    })
  }
}