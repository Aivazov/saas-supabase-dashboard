// types/room-member.ts

import { AppRole } from './permission';

export type RoomMember = {
  id: string;
  user_id: string | null;
  role: string;
  // role: AppRole;
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
