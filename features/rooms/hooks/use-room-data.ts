// hooks/use-room-data.ts

import { useRoomTasksStore } from "@/store/useRoomTasks";
import { useRoomDetailsStore } from "@/store/userRoomDetails";
import { useEffect } from "react";

export const useRoomData = (roomId: string) => {
  const {
    room,
    members,
    fetchRoom,
    fetchMembers,
    loadingMembers,
  } = useRoomDetailsStore();

  const {
    roomTasks,
    fetchRoomTasks,
    loadingRoomTasks,
  } = useRoomTasksStore();

  useEffect(() => {
    if (!roomId) return;

    fetchRoom(roomId);
    fetchMembers(roomId);
    fetchRoomTasks(roomId);
  }, [roomId]);

  return {
    room,
    members,
    roomTasks,
    loadingMembers,
    loadingRoomTasks,
  };
};