// features/rooms/components/RoomPageClient.tsx

'use client';
import dynamic from "next/dynamic";

import RoomPageHeader from "./RoomPageHeader";
import RoomMembers from "./RoomMembers";
import { useRoomPage } from "../../hooks/use-room-page";
import { useRoomUI } from "../../hooks/use-room-ui";
import { useRoomData } from "../../hooks/use-room-data";
import { useRoomActions } from "../../hooks/use-room-actions";
import { useParams } from "next/navigation";
const RoomPageTaskList = dynamic(
  () => import('./RoomPageTaskList'),
  { ssr: false }
)


export default function RoomPageClient() {
  // export default function RoomPageClient({roomId}: RoomPageProps) {

  // const { roomId } = useParams() as { roomId: string };

  // const {
  //   room,
  //   members,
  //   roomTasks,
  //   loadingMembers,
  //   loadingRoomTasks,
  // } = useRoomData(roomId);
  // const {
  //   handleCreateRoomTask,
  //   handleInvite,
  //   handleChangeStatus,
  //   deleteRoomTask,
  //   deleteMember,
  // } = useRoomActions(roomId);
  // const {
  //   taskTitle,
  //   setTaskTitle,
  //   inviteEmail,
  //   setInviteEmail,
  // } = useRoomUI();
  
  const {
    roomId,
    room,
    members,
    loadingMembers,
    taskTitle,
    setTaskTitle,
    inviteEmail,
    setInviteEmail,
    handleInvite,
    deleteMember,
    roomTasks,
    loadingRoomTasks,
    handleCreateRoomTask,
    handleChangeStatus,
    deleteRoomTask,
  } = useRoomPage();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navigation & Header */}
        <RoomPageHeader
          room={room}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TASKS COLUMN (Left 2/3) */}
          <RoomPageTaskList
            taskTitle={taskTitle}
            setTaskTitle={setTaskTitle}
            loadingRoomTasks={loadingRoomTasks}
            handleCreateRoomTask={handleCreateRoomTask}
            handleChangeStatus={handleChangeStatus}
            roomTasks={roomTasks}
            deleteRoomTask={deleteRoomTask}
            roomId={roomId}
          />

          {/* MEMBERS COLUMN (Right 1/3) */}

          <RoomMembers
            members={members}
            loadingMembers={loadingMembers}
            inviteEmail={inviteEmail}
            setInviteEmail={setInviteEmail}
            handleInvite={handleInvite}
            deleteMember={deleteMember}
            roomId={roomId}
          />

        </div>
      </div>
    </div>
  );
}
