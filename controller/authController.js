import UserModel from "../models/userModel.js";
import { RegisterRequest } from "../request/RegisterRequest.js";
import { hash } from "../utils/hashUtil.js";
import { jwtSignUtil } from "../utils/jwtSignUtil.js";

export const register = async (req, res) => {
    try {
        const registerData = req.body

        const validation = RegisterRequest.safeParse(registerData)

        if(!validation.success) {
            res.status(402).json({
                message : "Validation error",
                data : validation.error.issues
            })
        }

        const {username, email, password} = validation.data
        
        const hashPassword = hash(password)

        const user = await UserModel.create({
            username,
            email,
            password : hashPassword
        })

        res.status(200).json({
            message : "Berhasil register, silahkan login",
            data : jwtSignUtil(user)
        })
    } catch (error) {
         res.status(500).json({
            message : error.message,
            data : null
         });
    }
}