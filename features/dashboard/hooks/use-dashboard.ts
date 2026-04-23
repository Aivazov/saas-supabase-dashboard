// features/rooms/hooks/use-dashboard.ts

import { useRoomsStore } from "@/store/useRooms";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RoomFormValues, roomSchema } from "../schemas/room-schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useDashboard = () => {
  const { rooms, loadingWhenCreatingRoom, fetchRooms, createRoom } = useRoomsStore();

  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // const [roomName, setRoomName] = useState("");

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    mode: "onChange",
    defaultValues: { name: '' },
  })

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (rooms.length && !currentRoomId) {
      setCurrentRoomId(rooms[0].id);
    }
  }, [rooms, currentRoomId]);

  const handleCreateRoom = async (data: RoomFormValues) => {
    const room = await createRoom(data.name);

    if (room) {
      setCurrentRoomId(room.id);
      form.reset();
      // setRoomName("");
    }
  }

  return {
    rooms,
    loadingWhenCreatingRoom,
    currentRoomId,
    setCurrentRoomId,
    form,
    handleCreateRoom
  }
}