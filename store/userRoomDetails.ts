// store/useRoomDetails.ts

import { create } from "zustand";
import { supabase } from "@/lib/supabase-client";

type RoomDetailsState = {
  room: any | null;
  members: any[];

  loading: boolean;
  error: string | null;

  loadRoom: (roomId: string) => Promise<void>;
  loadMembers: (roomId: string) => Promise<void>;
  inviteMember: (roomId: string, email: string) => Promise<void>;
};

export const useRoomDetailsStore = create<RoomDetailsState>((set, get) => ({
  room: null,
  members: [],
  loading: false,
  error: null,

  loadRoom: async (roomId) => {
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .maybeSingle();

    if (error) return set({ error: error.message });

    set({ room: data });
  },

  loadMembers: async (roomId) => {
    const { data, error } = await supabase
      .from("room_members")
      .select("id, role, profiles(email, nickname)")
      .eq("room_id", roomId);

    if (error) return set({ error: error.message });

    set({ members: data || [] });
  },

  inviteMember: async (roomId, email) => {
    const { data: user } = await supabase
      .from("profiles")
      .select("id")
      .eq("email", email.trim())
      .maybeSingle();

    if (!user) {
      alert("User not found");
      return;
    }

    const { error } = await supabase.from("room_members").insert({
      room_id: roomId,
      user_id: user.id,
      role: "member",
    });

    if (error) return set({ error: error.message });

    await get().loadMembers(roomId);
  },
}));