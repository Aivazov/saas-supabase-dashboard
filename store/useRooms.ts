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
  fetchRooms: () => Promise<void>;
  addRoom: (room: Room) => void;
  renameRoom: (roomId: string, newName: string) => Promise<void>;
  deleteRoom: (roomId: string) => Promise<void>;
};

export const useRoomsStore = create<RoomsState>((set, get) => ({
  rooms: [],

  fetchRooms: async () => {
    const { data, error } = await supabase.from("rooms").select("*");
    if (error) throw error;
    set({ rooms: data || [] });
  },

  addRoom: async (room) => {
    set((state) => ({
      rooms: [...state.rooms, room],
    }))
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
