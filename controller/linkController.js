import z from "zod";
import { StoreLinkRequest } from "../request/StoreLinkRequest.js"
import LinkModel from "../models/linkModel.js";
import mongoose from "mongoose";

export const links = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const links = await LinkModel.find({
        user: userId
    })

    return res.status(200).json({
        message: "List link",
        data: links
    })
}

export const addNewLink = async (req, res) => {
    const validation = StoreLinkRequest.safeParse(req.body)

    if (!validation.success) {
        return res.status(402).json({
            message: "validation error",
            data: z.flattenError(validation.error)?.fieldErrors
        });
    }

    const userId = new mongoose.Types.ObjectId(req.user.id);
    const { title, icon, url } = validation.data

    const newLink = await LinkModel.create({
        title: title,
        icon: icon,
        url: url,
        user: userId
    });

    return res.status(201).json({
        message: "Berhasil menambahkan link",
        data: newLink?._id
    })
}

export const removeLink = async (req, res) => {
    const id = req.params.id
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const response = await LinkModel.findOneAndDelete({
        _id: id,
        user: userId
    })

    if (!response) {
        return res.status(404).json({
            message: "Link tidak ditemukan",
            data: null
        })
    }

    return res.status(201).json({
        message: "Berhasil menghapus link",
        data: null
    })
}