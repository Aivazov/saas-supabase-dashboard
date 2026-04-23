// hooks/use-room-actions.ts

import { useRoomTasksStore } from "@/store/useRoomTasks";
import { useRoomDetailsStore } from "@/store/userRoomDetails";
import { Status } from "@/types/status";

export const useRoomActions = (roomId: string) => {
  const { inviteMember, deleteMember } = useRoomDetailsStore();
  const { createRoomTask, updateRoomTaskStatus, deleteRoomTask } = useRoomTasksStore();

  const handleCreateRoomTask = async (title: string) => {
    if (!title.trim()) return;
    await createRoomTask(roomId, title);
  };

  const handleInvite = async (email: string) => {
    if (!email.trim()) return;
    await inviteMember(roomId, email);
  };

  const handleChangeStatus = (taskId: string, status: Status) => {
    updateRoomTaskStatus(taskId, status, roomId);
  };

  return {
    handleCreateRoomTask,
    handleInvite,
    handleChangeStatus,
    deleteRoomTask,
    deleteMember,
  };
};