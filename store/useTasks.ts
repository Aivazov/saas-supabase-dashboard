// store/useTasks.ts
import { Status } from "@/types/status";
import { Task } from "@/types/task";
import { supabase } from "@/lib/supabase-client";
// import { Status } from "@/types/components";
import { create } from "zustand";

// type Task = {
//   id: string;
//   title: string;
//   status: Status | null;
//   created_at: string | null;
//   updated_at?: string | null;
//   user_id: string | null;
// };

// type Task = {
//   id: string;
//   title: string;
//   status: Status;
//   created_at: string;
//   updated_at: string;
//   user_id: string;
// };

type TasksState = {
  tasks: Task[];

  setTasks: (task: Task[]) => void;

  loadingTasks: boolean;
  refreshingTasks: boolean;
  fetchTasks: (options?: { silent?: boolean }) => Promise<void>;

  createTask: (title: string) => Promise<void>;
  updateTaskStatus: (id: string, status: Task["status"]) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
};

export const useTasks = create<TasksState>((set, get) => ({
  tasks: [],

  setTasks: (tasks) => set({ tasks }),

  loadingTasks: true,
  refreshingTasks: false,

  fetchTasks: async (options) => {
    //separating modes for skeleton correct appearing
    if (!options?.silent) {
      set({ loadingTasks: true });
    } else {
      set({ refreshingTasks: true });
    }

    // set({ loadingTasks: true });
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      set({ tasks: [], loadingTasks: false, refreshingTasks: false });
      return;
    }

    const { data, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    
    if (error) {
      console.error(error);
      set({ loadingTasks: false, refreshingTasks: false });
      return;
    }

    // Вот тут магия: превращаем string | null в Status
    const sanitizedTasks: Task[] = (data || []).map(t => ({
      ...t,
      status: (t.status as Status) || 'todo' 
    }));

    set({ 
      tasks: sanitizedTasks, 
      loadingTasks: false, 
      refreshingTasks: false 
    });
    // if (data) {
    //   const sanitizedTasks: Task[] = data.map(t => ({
    //     ...t,
    //     // Если статус из базы null или невалидный, ставим 'todo' по дефолту
    //     status: (t.status as Status) || 'todo' 
    //   }));
    //   set({ tasks: sanitizedTasks, loadingTasks: false });
    // }
    // if (!error) set({ tasks: data || [], loadingTasks: false });
    // else console.error(error);
  
    // if (!error) {
    //   set({ tasks: data || [], loadingTasks: false, refreshingTasks: false });
    // } else {
    //   console.error(error);
    //   set({ loadingTasks: false, refreshingTasks: false });
    // }
  },

  createTask: async (title) => {
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

    // await get().fetchTasks();
    await get().fetchTasks({ silent: true });
  },

  updateTaskStatus: async (id, status) => {
    await supabase.from("tasks").update({ status }).eq("id", id);
    // get().fetchTasks();
    await get().fetchTasks({ silent: true });
  },

  deleteTask: async (id) => {
    await supabase.from("tasks").delete().eq("id", id);
    // get().fetchTasks();
    await get().fetchTasks({ silent: true });
  },
}));