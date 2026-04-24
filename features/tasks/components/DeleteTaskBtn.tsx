// features/tasks/components/DeleteTaskBtn.tsx

import { useState } from 'react'
import { Button } from '@headlessui/react';
import MyModal from '@/components/MyModal';

type DeleteTaskBtnProps = {
  onConfirm: () => Promise<void> | void;
}

const DeleteTaskBtn = ({ onConfirm }: DeleteTaskBtnProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const onConfirmDelete = async () => {
    try {
      setLoading(true);
      await onConfirm();
      // await deleteTask(taskId);
      setIsOpen(false);
    } catch (e) {
      console.error('Delete failed:', e)
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="text-red-700 hover:text-red-500 cursor-pointer"
        disabled={loading}
      >
        ✕
      </Button>
      <MyModal
        title='Delete confirmation'
        description='Are you sure you want to delete this task?'
        handleAction={onConfirmDelete}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default DeleteTaskBtn