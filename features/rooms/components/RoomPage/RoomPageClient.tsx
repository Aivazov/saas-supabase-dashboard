// features/rooms/components/RoomPage/RoomPageClient.tsx

'use client';
import dynamic from 'next/dynamic';

import RoomPageHeader from './RoomPageHeader';
import RoomMembers from './RoomMembers';
import { useRoomPage } from '../../hooks/use-room-page';
// import { useInitAuth } from '@/hooks/useInitAuth';
const RoomPageTaskList = dynamic(() => import('./RoomPageTaskList'), {
  ssr: false,
});

export default function RoomPageClient() {
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
  // useInitAuth();

  return (
    <div className='min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10'>
      <div className='max-w-6xl mx-auto space-y-8'>
        {/* Top Navigation & Header */}
        <RoomPageHeader room={room} />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
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
            room={room}
            members={members}
          />

          {/* MEMBERS COLUMN (Right 1/3) */}

          <RoomMembers
            room={room}
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
