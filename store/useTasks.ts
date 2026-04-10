// store/useTasks.ts
import { supabase } from "@/lib/supabase-client";
import { Status } from "@/types/components";
import { create } from "zustand";

type Task = {
  id: string;
  title: string;
  status: Status;
  created_at: string;
  updated_at: string;
  user_id: string;
};

type Store = {
  tasks: Task[];
  setTasks: (task: Task[]) => void;
  fetchTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
  updateTaskStatus: (id: string, status: Task["status"]) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

export const useTasks = create<Store>((set, get) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  fetchTasks: async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      set({ tasks: [] });
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) set({ tasks: data || [] });
    else console.error(error);
  },

  addTask: async (title) => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error("User is not authenticated");
      return;
    }

    const { error } = await supabase.from("tasks").insert([
      {
        title,
        user_id: user.id,
      },
    ]);

    if (error) {
      console.error(error);
      return;
    }

    await get().fetchTasks();
  },

  updateTaskStatus: async (id, status) => {
    await supabase.from("tasks").update({ status }).eq("id", id);
    get().fetchTasks();
  },

  deleteTask: async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    get().fetchTasks();
  },
}));