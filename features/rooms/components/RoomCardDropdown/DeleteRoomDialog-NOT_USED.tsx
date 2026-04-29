// features/rooms/components/RoomCardDropdown/DeleteRoomDialog.tsx

// import ModalCancelBtn from '@/components/Modal/ModalCancelBtn'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DeleteRoomDialogProps = {
  isDeleteOpen: boolean;
  setDeleteOpen: (isDeleteOpen: boolean) => void;
  handleDelete: () => void;
};

const DeleteRoomDialog = ({
  isDeleteOpen,
  setDeleteOpen,
  handleDelete,
}: DeleteRoomDialogProps) => {
  return (
    <AlertDialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
      <AlertDialogContent className='bg-zinc-900 border-zinc-800'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-red-400'>
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-zinc-400'>
            This action cannot be undone. This will permanently delete the room
            and all its data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='mt-6'>
          {/* <ModalCancelBtn /> */}
          <AlertDialogCancel className='bg-zinc-800 hover:bg-zinc-700 border-none'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className='bg-red-600 hover:bg-red-500 cursor-pointer'
          >
            Delete Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteRoomDialog;
