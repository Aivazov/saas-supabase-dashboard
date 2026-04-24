// features/rooms/components/RoomPage/RoomPageTaskList.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import TaskComponent from "@/features/tasks/components/TaskComponent";
import { Status } from "@/types/status";
import { Task } from "@/types/task";
// import { SetStateAction } from "react";

import { BiPlus, BiTask } from "react-icons/bi";

type RoomPageTaskListProps = {
  taskTitle: string;
  setTaskTitle: (value: string) => void;
  // setTaskTitle: (value: SetStateAction<string>) => void;
  loadingRoomTasks: boolean;
  // handleCreateRoomTask: (title: string) => Promise<void>;
  handleCreateRoomTask: () => Promise<void>;
  // handleChangeStatus: (taskId: string, status: Status) => void;
  handleChangeStatus: (status: Status, task: Task) => void;
  roomTasks: any[];
  deleteRoomTask: (taskId: string, roomId: string) => Promise<void>;
  roomId: string;
}

const RoomPageTaskList = ({
  taskTitle,
  setTaskTitle,
  loadingRoomTasks,
  handleCreateRoomTask,
  handleChangeStatus,
  roomTasks,
  deleteRoomTask,
  roomId,
}: RoomPageTaskListProps) => {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl flex items-center gap-2 text-zinc-300">
                <BiTask className="text-cyan-500" />
                Tasks
              </CardTitle>
              <CardDescription>Track and update your progress.</CardDescription>
            </div>
          </div>
          
          {/* Create Task Input Row */}
          <div className="flex gap-2 pt-4">
            <Input
              placeholder="What needs to be done?"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="bg-zinc-800/50 border-zinc-700 focus:ring-cyan-500 text-zinc-300"
            />
            <Button 
              onClick={handleCreateRoomTask} 
              // onClick={() => handleCreateRoomTask(taskTitle)} 
              disabled={Boolean(loadingRoomTasks) || taskTitle.length === 0}
              // disabled={loadingRoomTasks || !taskTitle}
              className="bg-cyan-600 hover:bg-cyan-500 text-white"
            >
              <BiPlus className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {loadingRoomTasks ? (
              Array(3).fill(0).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full bg-zinc-800/50 rounded-xl" />
              ))
            ) : roomTasks.length > 0 ? (
              roomTasks.map((task) => (
                <div key={task.id} className="transition-all hover:translate-x-1">
                  <TaskComponent
                    task={task}
                    onChangeStatus={handleChangeStatus}
                    onDelete={(t) => deleteRoomTask(t.id, roomId)}
                  />
                </div>
              ))
            ) : (
              <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-2xl">
                <p className="text-zinc-500 text-sm">No tasks yet. Add one above!</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default RoomPageTaskList