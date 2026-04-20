// store/useRoomTasks.ts

import { create } from "zustand";
import { supabase } from "@/lib/supabase-client";
import { Status } from "@/constants/status";

type RoomTasksState = {
  roomTasks: any[];

  loadingRoomTasks: boolean;
  refreshingRoomTasks: boolean;
  fetchRoomTasks: (roomId: string, options?: {silent?: boolean}) => Promise<void>;

  createRoomTask: (roomId: string, title: string) => Promise<void>;
  updateRoomTaskStatus: (taskId: string, status: Status, roomId: string) => Promise<void>;
  deleteRoomTask: (taskId: string, roomId: string) => Promise<void>;
};

export const useRoomTasksStore = create<RoomTasksState>((set, get) => ({
  roomTasks: [],

  loadingRoomTasks: true,
  refreshingRoomTasks: false,
  
  fetchRoomTasks: async (roomId, options) => {
    if (!options?.silent) {
      set({ loadingRoomTasks: true });
    } else {
      set({ refreshingRoomTasks: true });
    }
    
    const { data, error } = await supabase
      .from("room_todos")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: false });
    
    if (error) {
      console.log('error UseRoomTasks', error.message);
      
      set({ loadingRoomTasks: false, refreshingRoomTasks: false });
      return;
    }

    // set({ roomTasks: data || [], loadingRoomTasks: false });
    set({ roomTasks: data || [], loadingRoomTasks: false, refreshingRoomTasks: false });
  
  },

  createRoomTask: async (roomId, title) => {
    if (!title) return;

    const { data, error } = await supabase
      .from("room_todos")
      .insert({ title, room_id: roomId })
      .select()
      .single();

    if (error) return;

    set((state) => ({
      roomTasks: data ? [data, ...state.roomTasks] : state.roomTasks,
    }));
    await get().fetchRoomTasks(roomId, { silent: true });
  },

  updateRoomTaskStatus: async (taskId: string, status: Status, roomId: string) => {
    const { error } = await supabase
      .from("room_todos")
      .update({ status })
      .eq("id", taskId);

    if (error) return;

    // перезагрузка списка
    // await get().fetchRoomTasks(roomId); 
    await get().fetchRoomTasks(roomId, { silent: true });
  },
  
  deleteRoomTask: async (taskId: string, roomId: string) => {
    const { error } = await supabase
      .from('room_todos')
      .delete()
      .eq('id', taskId);
    
    if (error) {
      console.error(error);
      return;
    }

    // await get().fetchRoomTasks(roomId)
    await get().fetchRoomTasks(roomId, { silent: true });
  }
}));