// features/rooms/hooks/use-dashboard.ts

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRoomsStore } from '@/store/useRooms';
import { RoomFormValues, roomSchema } from '../schemas/room-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { calculateRole } from '@/features/rooms/logic/permissions';

export const useDashboard = () => {
  const { rooms, loadingWhenCreatingRoom, fetchRooms, createRoom } =
    useRoomsStore();

  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // const role = calculateRole(user?.id, currentRoomId, members);
  // const [roomName, setRoomName] = useState("");

  const form = useForm<RoomFormValues>({
    resolver: zodResolver(roomSchema),
    mode: 'onChange',
    defaultValues: { name: '' },
  });

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
  };

  return {
    rooms,
    loadingWhenCreatingRoom,
    currentRoomId,
    setCurrentRoomId,
    form,
    handleCreateRoom,
  };
};
