import z from 'zod';

export const LoginRequest = z.object({
  email: z.email('Format email tidak valid'),
  password: z.string('Password wajib diisi'),
});
