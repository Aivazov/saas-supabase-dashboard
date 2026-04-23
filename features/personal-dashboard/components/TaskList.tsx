// features/personal-dashboard/components/TaskList.tsx

import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton";
import { Status } from "@/constants/status";
import { Task } from "@/constants/task";
import TaskComponent from "@/features/tasks/components/TaskComponent"
import { BiTask } from "react-icons/bi"


type TaskListProps = {
  tasks: Task[];
  totalCount: number;
  isLoading: boolean;
  filter: "all" | "todo" | "doing" | "done";
  updateStatus: (status: Status, task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
}

const TaskList = ({ 
  tasks,
  totalCount,
  isLoading,
  filter,
  updateStatus,
  deleteTask
}: TaskListProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
          {filter === 'all' ? 'All Tasks' : `${filter} Tasks`}
        </h3>
        <Badge variant="outline" className="border-zinc-800 text-zinc-500">
          {totalCount}
        </Badge>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array(3).fill(0).map((_, i) => (
            <div key={i} className="p-1">
              <Skeleton className="h-20 w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl" />
            </div>
          ))
        ) : tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.id} className="transition-all hover:translate-x-1">
              <TaskComponent
                task={task}
                onChangeStatus={updateStatus}
                onDelete={(t) => deleteTask(t.id)}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-3xl">
            <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
              <BiTask className="text-3xl text-zinc-600" />
            </div>
            <p className="text-zinc-500">No tasks found. Time to create something new!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskList