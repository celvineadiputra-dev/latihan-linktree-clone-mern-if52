import multer from "multer";

export const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "storage/public")
    },
    filename : (req, file, cb) => {
        const ext = file.originalname.split(".").pop()
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
        cb(null, `${uniqueName}.${ext}`)
    }
})