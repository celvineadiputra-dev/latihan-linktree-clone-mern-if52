import z from "zod";
import { StoreLinkRequest } from "../request/StoreLinkRequest.js"
import LinkModel from "../models/linkModel.js";
import mongoose from "mongoose";

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

    await LinkModel.create({
        title: title,
        icon: icon,
        url: url,
        user: userId
    });

    return res.status(201).json({
        message: "Berhasil menambahkan link",
        data: null
    })
}

export const removeLink = (req, res) => {

}