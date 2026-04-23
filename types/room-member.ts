// types/room-member.ts

export type RoomMember = {
  id: string;
  role: string | null;
  profiles: {
    email: string | null;
    nickname: string | null;
  } | null;
  user?: {
    email?: string | null;
  } | null;
};

// import { Tables } from "@/types/supabase";

// export type RoomMember = Tables<"room_members"> & {
//   profiles?: Tables<"profiles"> | null;
//   user?: {
//     email?: string | null;
//   } | null;
// };