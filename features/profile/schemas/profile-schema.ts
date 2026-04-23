// features/profile/profile-schema.ts

import { z } from "zod";

export const profileSchema = z.object({
  nickname: z
    .string()
    .min(3, "Nickname must be at least 3 characters")
    .max(20, "Nickname must be less than 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;