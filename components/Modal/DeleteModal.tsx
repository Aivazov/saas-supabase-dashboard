import React, { Dispatch, SetStateAction } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleAction: () => Promise<void>;
}

const DeleteModal = ({
  title = 'Are you absolutely sure?',
  description = 'This action cannot be undone. This will permanently delete the room and all its data.',
  isOpen,
  setIsOpen,
  handleAction
}: Props) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-zinc-900 border-zinc-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-400">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-zinc-400">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-6">
          {/* <ModalCancelBtn /> */}
          <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleAction} 
            className="bg-red-600 hover:bg-red-500 cursor-pointer"
          >
            Delete Anyway
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteModal