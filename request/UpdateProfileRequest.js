import z from 'zod';

export const updateProfileRequest = z.object({
  displayName: z.string('Display Name wajib diisi').min(5, 'Display name minimal 5 karakter'),
  profilePicture: z.url('Profile Picture adalah url'),
  bio: z
    .string('Bio wajib diisi')
    .min(10, 'Bio minimal 10 karakter')
    .max(150, 'Bio maksimal 150 karakter'),
});
