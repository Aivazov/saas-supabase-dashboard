// components/RoomActions.tsx
"use client";

import { useState } from "react";
import { useRoomsStore  } from "@/store/useRooms";
import { useRouter } from "next/navigation";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";


type RoomActionsProps = {
  roomId: string;
  currentName: string;
};

export default function RoomActions({ roomId, currentName }: RoomActionsProps) {
  const { renameRoom, deleteRoom } = useRoomsStore ();
  const router = useRouter();

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
    <div className="flex gap-2">
      <button
        className="px-3 py-1 rounded cursor-pointer hover:bg-blue-100"
        onClick={() => setRenameOpen(true)}
      >
        <BiSolidEdit />
      </button>
      <button
        className="px-3 py-1 rounded cursor-pointer hover:bg-blue-100"
        onClick={() => setDeleteOpen(true)}
      >
        <MdDeleteOutline />
      </button>

      {/* Rename Modal */}
      {isRenameOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-2">Rename Room</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 w-full mb-3"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setRenameOpen(false)}>Cancel</button>
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-400"
                onClick={handleRename}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-2">Delete Room</h2>
            <p className="mb-3">Вы уверены, что хотите удалить комнату?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteOpen(false)}>Cancel</button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer hover:bg-red-400"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
