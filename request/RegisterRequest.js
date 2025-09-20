import z from "zod";

export const RegisterRequest = z.object({
    username : z.string(),
    email : z.email(),
    password : z.string().min(8),
    password_confirmation : z.string().min(8)
}).superRefine((data, ctx) => {
    if(data.password !== data.password_confirmation) {
        ctx.addIssue({
            path : ['password_confirmation'],
            code : 'error',
            message : "Password dan password confirmation tidak sama"
        })
    }
})