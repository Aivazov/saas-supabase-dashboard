// store/useRooms.ts
import { create } from 'zustand';
import { supabase } from '@/lib/supabase-client';
import { Room } from '@/types/room';
import { PostgrestError } from '@supabase/supabase-js';
import { toast } from 'sonner';

// export type Room = {
//   id: string;
//   name: string;
//   created_by: string;
//   created_at: string;
// };

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
      const { data, error } = await supabase.from('rooms').select('*');
      if (error) throw error;

      set({ rooms: data || [] });
    } finally {
      set({ loadingRooms: false });
    }
  },

  createRoom: async (roomName: string) => {
    set({ loadingWhenCreatingRoom: true });
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: room, error } = await supabase
        .from('rooms')
        .insert({
          name: roomName,
          created_by: user?.id,
        })
        .select()
        .single();

      // onActionError(error, 'Нет прав для создания комнаты');
      if (error) throw error;

      if (room) {
        await supabase.from('room_members').insert({
          room_id: room.id,
          user_id: user?.id,
          role: 'admin',
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
      .from('rooms')
      .update({ name: newName })
      .eq('id', roomId);
    // onActionError(error, 'Нет прав для переименования комнаты');
    // if (error) throw error;

    // if (error) {
    //   console.error(error);
    //   console.log('Нет прав для переименования комнаты');
    //   return;
    // }

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId ? { ...r, name: newName } : r,
      ),
    }));
    toast.success('Название комнаты изменено');
  },

  deleteRoom: async (roomId) => {
    const { data, error } = await supabase
      .from('rooms')
      .delete()
      .eq('id', roomId)
      .select();
    // onActionError(error, 'Нет прав для удаления команты');
    // if (error) throw error;
    if (error) {
      console.error(error);
      throw error;
    }

    if (!data || data.length === 0) {
      toast.error('Нет прав для удаления комнаты');
      // throw new Error('Нет прав для удаления комнаты');
      return;
    }

    set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== roomId),
    }));
    toast.success('Комната успешно удалена');
  },
}));

function assertNoError(error: PostgrestError | null, message: string) {
  if (error) {
    console.error(error);
    throw new Error(message);
  }
}
