// hooks/use-room-actions.ts

import { useRoomTasksStore } from "@/store/useRoomTasks";
import { useRoomDetailsStore } from "@/store/userRoomDetails";
import { Status } from "@/types/status";
import { Task } from "@/types/task";

export const useRoomActions = (roomId: string) => {
  const { inviteMember, deleteMember } = useRoomDetailsStore();
  const { createRoomTask, updateRoomTaskStatus, deleteRoomTask } = useRoomTasksStore();

  const handleCreateRoomTask = async (taskTitle: string) => {
    if (!taskTitle.trim()) return;
    await createRoomTask(roomId, taskTitle);
  };

  // const handleCreateRoomTask = async (title: string) => {
  //   if (!title.trim()) return;
  //   await createRoomTask(roomId, title);
  // };

  const handleInvite = async (email: string) => {
    if (!email.trim()) return;
    await inviteMember(roomId, email);
  };

  const handleChangeStatus = (status: Status, task: Task) => {
  // const handleChangeStatus = (taskId: string, status: Status) => {
    updateRoomTaskStatus(task.id, status, roomId);
    // updateRoomTaskStatus(taskId, status, roomId);
  };

  return {
    handleCreateRoomTask,
    handleInvite,
    handleChangeStatus,
    deleteRoomTask,
    deleteMember,
  };
};