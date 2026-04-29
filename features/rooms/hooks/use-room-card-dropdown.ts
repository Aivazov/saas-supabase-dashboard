// features/rooms/hooks/use-room-card-dropdown.ts

import { useRoomsStore } from '@/store/useRooms';
import { RoomCardDropdownProps } from '@/types/room-card-dropdown';
import { useState } from 'react';
import { toast } from 'sonner';

export const useRoomCardDropdown = ({
  roomId,
  currentName,
}: RoomCardDropdownProps) => {
  const { renameRoom, deleteRoom } = useRoomsStore();

  const [isRenameOpen, setRenameOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [newName, setNewName] = useState(currentName);

  const handleRename = async () => {
    try {
      await renameRoom(roomId, newName);
      setRenameOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Error with renaming the room');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(roomId);
      setDeleteOpen(false);
    } catch (err) {
      console.error(err);
      toast.error('Error with deleting the room');
    }
  };

  return {
    isRenameOpen,
    setRenameOpen,
    isDeleteOpen,
    setDeleteOpen,
    newName,
    setNewName,
    handleRename,
    handleDelete,
  };
};
