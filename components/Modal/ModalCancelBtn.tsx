import React from 'react'
import { AlertDialogCancel } from '../ui/alert-dialog'

type Props = {}

const ModalCancelBtn = (props: Props) => {
  return (
    <AlertDialogCancel
      className="bg-zinc-800 hover:bg-zinc-700 border-none cursor-pointer"
    >
      Cancel
    </AlertDialogCancel>
  )
}

export default ModalCancelBtn