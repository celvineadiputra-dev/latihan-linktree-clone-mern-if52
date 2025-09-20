import z from "zod";

export const LoginRequest = z.object({
    email : z.email(),
    password : z.string()
})