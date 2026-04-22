// constants/tasks.ts
import { Tables } from "@/types/supabase";
import { Status } from "./status";

// Taking structure from Table line 'tasks'
// Но 'status' там просто string | null, поэтому мы его переопределяем
export type Task = Omit<Tables<'tasks'>, 'status'> & {
  status: Status; // enum: 'todo' | 'doing' | 'done'
};

// export interface Task {
//   id: string;
//   title: string;
//   status: Status;
// }