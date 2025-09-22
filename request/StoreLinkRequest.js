import z from "zod";

export const StoreLinkRequest = z.object({
    title : z.string('Judul wajib di isi'),
    icon : z.string('Icon wajib di isi'),
    url : z.url("url wajib di isi")
})