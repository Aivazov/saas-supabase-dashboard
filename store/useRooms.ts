// store/useRooms.ts
import { create } from "zustand";
import { supabase } from "@/lib/supabase-client";

export type Room = {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
};

type RoomsState = {
  rooms: Room[];
  loadingRooms: boolean;
  loadingWhenCreatingRoom: boolean;
  fetchRooms: () => Promise<void>;
  // createRoom: (room: Room) => void;
  createRoom: (roomName: string) => Promise<Room | undefined>;
  renameRoom: (roomId: string, newName: string) => Promise<void>;
  deleteRoom: (roomId: string) => Promise<void>;
};

export const useRoomsStore = create<RoomsState>((set, get) => ({
  rooms: [],
  loadingRooms: false,
  loadingWhenCreatingRoom: false,
  fetchRooms: async () => {
    set({ loadingRooms: true });

    try {
      const { data, error } = await supabase.from("rooms").select("*");
      if (error) throw error;

      set({ rooms: data || [] });
    } finally {
      set({ loadingRooms: false });
    }
    // const { data, error } = await supabase.from("rooms").select("*");
    // if (error) throw error;
    // set({ rooms: data || [] });
  },

  // createRoom: async (room) => {
  //   set((state) => ({
  //     rooms: [...state.rooms, room],
  //   }))
  // },

  createRoom: async (roomName: string) => {
    set({ loadingWhenCreatingRoom: true });
    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { data: room, error } = await supabase
        .from("rooms")
        .insert({
          name: roomName,
          created_by: user?.id
        })
        .select()
        .single();

      if (error) throw error;

      if (room) {
        await supabase.from("room_members").insert({
          room_id: room.id,
          user_id: user?.id,
          role: "admin"
        });

        set((state) => ({
          rooms: [...state.rooms, room],
        }));

        return room;
      }
    } finally {
      set({ loadingWhenCreatingRoom: false });
    }
  },
  
  renameRoom: async (roomId, newName) => {
    const { error } = await supabase
      .from("rooms")
      .update({ name: newName })
      .eq("id", roomId);
    if (error) throw error;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId ? { ...r, name: newName } : r
      ),
    }));
  },

  deleteRoom: async (roomId) => {
    const { error } = await supabase.from("rooms").delete().eq("id", roomId);
    if (error) throw error;

    set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== roomId),
    }));
  },
}));
