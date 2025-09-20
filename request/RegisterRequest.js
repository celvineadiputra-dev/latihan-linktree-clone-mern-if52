import z from 'zod';

export const RegisterRequest = z
  .object({
    username: z.string('User name wajib diisi'),
    email: z.email('Format email tidak valid'),
    password: z.string('Password wajib diisi').min(8, 'Password minimal 8 karakter'),
    password_confirmation: z.string('Password Confirmation wajib diisi'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.password_confirmation) {
      ctx.addIssue({
        path: ['password_confirmation'],
        code: 'error',
        message: 'Password dan password confirmation tidak sama',
      });
    }
  });
