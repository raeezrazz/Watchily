// src/dto/CreateUserDTO.ts
import { z } from 'zod';

export const authSchema = z.object({
  
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type authDTO = z.infer<typeof authSchema>;
