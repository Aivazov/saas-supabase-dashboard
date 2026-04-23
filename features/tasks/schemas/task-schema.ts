// features/personal-dashboard/schemas/task-schema.ts

import z from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(2, 'Task name should be at least 2 characters')
    .max(100, 'Task is too long')
    .trim(),
})

export type TaskFormValues = z.infer<typeof taskSchema>;