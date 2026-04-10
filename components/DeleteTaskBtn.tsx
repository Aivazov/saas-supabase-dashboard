import { useState } from 'react'
import MyModal from './MyModal'
import { useTasks } from '@/store/useTasks';
import { Button } from '@headlessui/react';

type Props = {
  taskId: string;
}

const DeleteTaskBtn = ({taskId}: Props) => {
  const { deleteTask } = useTasks();
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleDeleteTask = () => {
    deleteTask(taskId)
  }
  return (
    <>
      <Button
        onClick={handleOpenModal}
        className="text-red-700 hover:text-red-500 cursor-pointer"
      >
        ✕
      </Button>
      <MyModal
        title='Delete confirmation'
        description='Are you sure you want to delete this task?'
        handleAction={handleDeleteTask}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  )
}

export default DeleteTaskBtn