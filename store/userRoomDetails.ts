// store/useRoomDetails.ts

import { create } from "zustand";
import { supabase } from "@/lib/supabase-client";
import { RoomMember } from "@/types/room-member";
import { Room } from "@/types/room";

type RoomDetailsState = {
  room: Room | null; // .select("*")
  // members: any[];
  members: RoomMember[];


  loadingRoom: boolean;
  loadingMembers: boolean;
  error: string | null;

  fetchRoom: (roomId: string) => Promise<void>;
  fetchMembers: (roomId: string) => Promise<void>;
  inviteMember: (roomId: string, email: string) => Promise<void>;
  deleteMember: (memberId: string, roomId: string) => Promise<void>;
};

export const useRoomDetailsStore = create<RoomDetailsState>((set, get) => ({
  room: null,
  members: [],
  loadingRoom: false,
  loadingMembers: true,
  error: null,

  fetchRoom: async (roomId) => {
    set({ loadingRoom: true, error: null });
    const { data, error } = await supabase
      .from("rooms")
      .select("*")
      .eq("id", roomId)
      .maybeSingle();

    if (error) return set({ error: error.message, loadingRoom: false });

    set({ room: data, loadingRoom: false });
  },

  fetchMembers: async (roomId) => {
    set({ loadingMembers: true, error: null });
    const { data, error } = await supabase
      .from("room_members")
      .select("id, role, profiles(email, nickname)")
      .eq("room_id", roomId);

    if (error) return set({ error: error.message, loadingMembers: false });

    set({ members: data || [], loadingMembers: false });
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

    await get().fetchMembers(roomId);
  },
  
  deleteMember: async (memberId, roomId) => {
    const prevMembers = get().members;

    // оптимистично убираем
    set({
      members: prevMembers.filter((m) => m.id !== memberId),
    });

    const { error } = await supabase
      .from("room_members")
      .delete()
      .eq("id", memberId);

    if (error) {
      // откат если ошибка
      set({ members: prevMembers, error: error.message });
      return;
    }
  }
  // deleteMember: async (memberId, roomId) => {
  //   const { error } = await supabase
  //     .from("room_members")
  //     .delete()
  //     .eq("id", memberId);
    
  //   if (error) return set({ error: error.message })
    
  //   await get().fetchMembers(roomId)
  // }
}));