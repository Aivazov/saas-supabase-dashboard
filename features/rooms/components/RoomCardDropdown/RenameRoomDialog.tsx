// features/rooms/components/RoomCardDropdown/RenameRoomDialog.tsx

import ModalCancelBtn from '@/components/Modal/ModalCancelBtn';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';

type RenameRoomDialogProps = {
  isRenameOpen: boolean;
  setRenameOpen: (isRenameOpen: boolean) => void;
  newName: string;
  setNewName: (value: string) => void;
  handleRename: () => void;
};

const RenameRoomDialog = ({
  isRenameOpen,
  setRenameOpen,
  newName,
  setNewName,
  handleRename,
}: RenameRoomDialogProps) => {
  return (
    <AlertDialog open={isRenameOpen} onOpenChange={setRenameOpen}>
      <AlertDialogContent className='bg-zinc-900 border-zinc-800 text-zinc-300'>
        <AlertDialogHeader>
          <AlertDialogTitle>Rename Room</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a new name for your workspace.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className='bg-zinc-800 border-zinc-700 mt-4'
        />
        <AlertDialogFooter className='mt-6'>
          {/* <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 border-none">
            Cancel
          </AlertDialogCancel> */}
          <ModalCancelBtn />
          <AlertDialogAction
            onClick={handleRename}
            className='bg-cyan-600 hover:bg-cyan-500 cursor-pointer'
          >
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RenameRoomDialog;
