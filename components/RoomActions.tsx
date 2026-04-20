// components/RoomActions.tsx
"use client";

import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog, 
  AlertDialogAction, 
  // AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useRoomsStore  } from "@/store/useRooms";
import { BiDotsVerticalRounded, BiEditAlt, BiTrash } from "react-icons/bi";
// import { useRouter } from "next/navigation";
// import { BiSolidEdit } from "react-icons/bi";
// import { MdDeleteOutline } from "react-icons/md";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ModalCancelBtn from "./Modal/ModalCancelBtn";


type RoomActionsProps = {
  roomId: string;
  currentName: string;
};

export default function RoomActions({ roomId, currentName }: RoomActionsProps) {
  const { renameRoom, deleteRoom } = useRoomsStore ();
  // const router = useRouter();

  const [isRenameOpen, setRenameOpen] = useState(false);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [newName, setNewName] = useState(currentName);

  const handleRename = async () => {
    try {
      await renameRoom(roomId, newName);
      setRenameOpen(false);
    } catch (err) {
      console.error(err);
      alert("Ошибка при переименовании комнаты");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRoom(roomId);
      setDeleteOpen(false);
      // router.push("/rooms"); // перенаправление на список комнат
    } catch (err) {
      console.error(err);
      alert("Ошибка при удалении комнаты");
    }
  };

  return (
    // <div className="flex gap-2">
    //   <button
    //     className="px-3 py-1 rounded cursor-pointer hover:bg-blue-100"
    //     onClick={() => setRenameOpen(true)}
    //   >
    //     <BiSolidEdit />
    //   </button>
    //   <button
    //     className="px-3 py-1 rounded cursor-pointer hover:bg-blue-100"
    //     onClick={() => setDeleteOpen(true)}
    //   >
    //     <MdDeleteOutline />
    //   </button>

    //   {isRenameOpen && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    //       <div className="bg-white p-4 rounded shadow-md w-80">
    //         <h2 className="text-lg font-bold mb-2">Rename Room</h2>
    //         <input
    //           type="text"
    //           value={newName}
    //           onChange={(e) => setNewName(e.target.value)}
    //           className="border p-2 w-full mb-3"
    //         />
    //         <div className="flex justify-end gap-2">
    //           <button onClick={() => setRenameOpen(false)}>Cancel</button>
    //           <button
    //             className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-400"
    //             onClick={handleRename}
    //           >
    //             Save
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}

    //   {isDeleteOpen && (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    //       <div className="bg-white p-4 rounded shadow-md w-80">
    //         <h2 className="text-lg font-bold mb-2">Delete Room</h2>
    //         <p className="mb-3">Вы уверены, что хотите удалить комнату?</p>
    //         <div className="flex justify-end gap-2">
    //           <button onClick={() => setDeleteOpen(false)}>Cancel</button>
    //           <button
    //             className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:bg-red-400"
    //             onClick={handleDelete}
    //           >
    //             Delete
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div >
      
      
      
    <div onClick={(e) => e.stopPropagation()}> {/* Блокируем клик для всей зоны экшенов */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-zinc-800 text-zinc-400">
            <BiDotsVerticalRounded className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <DropdownMenuItem onClick={() => setRenameOpen(true)} className="cursor-pointer">
            <BiEditAlt className="mr-2" /> Rename
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setDeleteOpen(true)} 
            className="cursor-pointer text-red-400 focus:text-red-400"
          >
            <BiTrash className="mr-2" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Модалка редактирования */}
      <AlertDialog open={isRenameOpen} onOpenChange={setRenameOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle>Rename Room</AlertDialogTitle>
            <AlertDialogDescription>
              Enter a new name for your workspace.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)}
            className="bg-zinc-800 border-zinc-700 mt-4"
          />
          <AlertDialogFooter className="mt-6">
            {/* <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 border-none">
              Cancel
            </AlertDialogCancel> */}
            <ModalCancelBtn />
            <AlertDialogAction onClick={handleRename} className="bg-cyan-600 hover:bg-cyan-500 cursor-pointer">
              Save Changes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Модалка удаления */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setDeleteOpen}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-zinc-400">
              This action cannot be undone. This will permanently delete the room and all its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6">
            <ModalCancelBtn />
            {/* <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 border-none">Cancel</AlertDialogCancel> */}
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-500 cursor-pointer"
            >
              Delete Anyway
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
