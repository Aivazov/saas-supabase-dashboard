// features/rooms/schemas/room-schema.ts

import z from "zod";


export const roomSchema = z.object({
  name: z
    .string()
    .min(2, 'Room name must be at least 2 characters')
    .max(30, 'Room name must be less than 30 characters')
    .trim(),
}) 

export type RoomFormValues = z.infer<typeof roomSchema>;