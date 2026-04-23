// features/rooms/hooks/use-room-page.ts

import { useRoomTasksStore } from "@/store/useRoomTasks";
import { useRoomDetailsStore } from "@/store/userRoomDetails";
import { Status } from "@/types/status";
import { Task } from "@/types/task";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export const useRoomPage = () => {
  const { roomId } = useParams() as { roomId: string}; 
  const [taskTitle, setTaskTitle] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const {
    room,
    members,
    fetchRoom,
    loadingMembers,
    fetchMembers,
    inviteMember,
    deleteMember
  } = useRoomDetailsStore();

  const {
    roomTasks,
    loadingRoomTasks,
    fetchRoomTasks,
    createRoomTask,
    updateRoomTaskStatus,
    deleteRoomTask
  } = useRoomTasksStore();

  
  useEffect(() => {
    if (!roomId) return;

    fetchRoom(roomId);
    fetchMembers(roomId);
    fetchRoomTasks(roomId);
  }, [roomId, fetchRoom, fetchMembers, fetchRoomTasks]);

  const handleCreateRoomTask = async () => {
    if (!taskTitle.trim()) return;
    await createRoomTask(roomId, taskTitle);
    // setTaskTitle("");
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    await inviteMember(roomId, inviteEmail);
    // setInviteEmail("");
  };

  const handleChangeStatus = (status: Status, task: Task) => {
    updateRoomTaskStatus(task.id, status, roomId);
  };
  
  return {
    roomId,
    room,
    members,
    loadingMembers,
    inviteEmail,
    setInviteEmail,
    handleInvite,
    deleteMember,
    roomTasks,
    loadingRoomTasks,
    taskTitle,
    setTaskTitle,
    handleCreateRoomTask,
    handleChangeStatus,
    deleteRoomTask,
  };
}