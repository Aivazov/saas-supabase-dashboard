// store/useRoomTasks.ts

import { create } from "zustand";
import { supabase } from "@/lib/supabase-client";
import { Status } from "@/constants/status";

type TodosState = {
  todos: any[];

  loadTodos: (roomId: string) => Promise<void>;
  createTodo: (roomId: string, title: string) => Promise<void>;
  updateRoomTaskStatus: (taskId: string, status: Status, roomId: string) => Promise<void>;
  deleteRoomTask: (taskId: string, roomId: string) => Promise<void>;
};

export const useRoomTasksStore = create<TodosState>((set, get) => ({
  todos: [],

  loadTodos: async (roomId) => {
    const { data } = await supabase
      .from("room_todos")
      .select("*")
      .eq("room_id", roomId)
      .order("created_at", { ascending: false });

    set({ todos: data || [] });
  },

  createTodo: async (roomId, title) => {
    if (!title) return;

    const { data, error } = await supabase
      .from("room_todos")
      .insert({ title, room_id: roomId })
      .select()
      .single();

    if (error) return;

    set((state) => ({
      todos: data ? [data, ...state.todos] : state.todos,
    }));
  },

  updateRoomTaskStatus: async (taskId: string, status: Status, roomId: string) => {
    const { error } = await supabase
      .from("room_todos")
      .update({ status })
      .eq("id", taskId);

    if (error) return;

    // перезагрузка списка
    await get().loadTodos(roomId); 
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

    await get().loadTodos(roomId)
  }
}));