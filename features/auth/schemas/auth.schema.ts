// features/auth/schemas/auth.schema.ts

import * as z from "zod"

export const authSchema = z.object({
  email: z.string().email("Incorrect email"),
  password: z.string().min(6, "Password should have at least 6 symbols"),
  nickname: z.string().min(2, "Nickname too short").optional().or(z.literal('')),
})

export type AuthFormData = z.infer<typeof authSchema>