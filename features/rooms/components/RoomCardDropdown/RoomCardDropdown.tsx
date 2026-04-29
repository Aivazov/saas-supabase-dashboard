// features/rooms/components/RoomCardDropdown/RoomCardDropdown.tsx

'use client';

import { useRoomCardDropdown } from '../../hooks/use-room-card-dropdown';
import { RoomCardDropdownProps } from '@/types/room-card-dropdown';
import RenameRoomDialog from './RenameRoomDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BiDotsVerticalRounded, BiEditAlt, BiTrash } from 'react-icons/bi';
import DeleteModal from '@/components/Modal/DeleteModal';

export default function RoomCardDropdown({
  roomId,
  currentName,
}: RoomCardDropdownProps) {
  const {
    isRenameOpen,
    setRenameOpen,
    isDeleteOpen,
    setDeleteOpen,
    newName,
    setNewName,
    handleRename,
    handleDelete,
  } = useRoomCardDropdown({ roomId, currentName });

  return (
    <div onClick={(e) => e.stopPropagation()}>
      {' '}
      {/*  Blocking click for whole actions area */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='h-8 w-8 p-0 hover:bg-zinc-800 text-zinc-400 cursor-pointer'
          >
            <BiDotsVerticalRounded className='h-5 w-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='bg-zinc-900 border-zinc-800 text-zinc-100'
        >
          <DropdownMenuItem
            onClick={() => setRenameOpen(true)}
            className='cursor-pointer'
          >
            <BiEditAlt className='mr-2' /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setDeleteOpen(true)}
            className='cursor-pointer text-red-400 focus:text-red-400'
          >
            <BiTrash className='mr-2' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* Rename Modal */}
      <RenameRoomDialog
        isRenameOpen={isRenameOpen}
        setRenameOpen={setRenameOpen}
        newName={newName}
        setNewName={setNewName}
        handleRename={handleRename}
      />
      {/* Delete Modal */}
      <DeleteModal
        title='Are you absolutely sure?'
        description='This action cannot be undone. This will permanently delete the room
            and all its data.'
        isOpen={isDeleteOpen}
        setIsOpen={setDeleteOpen}
        handleAction={handleDelete}
      />
    </div>
  );
}
