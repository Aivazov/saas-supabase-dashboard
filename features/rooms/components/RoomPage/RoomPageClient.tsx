// features/rooms/components/RoomPageClient.tsx

'use client';
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";

// import { useRoomDetailsStore } from "@/store/userRoomDetails";
// import { useRoomTasksStore } from "@/store/useRoomTasks";

// import { Status } from "@/types/status";
// import { Task } from "@/types/task";

import RoomPageHeader from "./RoomPageHeader";
import RoomPageTaskList from "./RoomPageTaskList";
import RoomMembers from "./RoomMembers";
import { useRoomPage } from "../../hooks/use-room-page";
import { useParams } from "next/navigation";
import { useRoomData } from "../../hooks/use-room-data";
import { useRoomActions } from "../../hooks/use-room-actions";
import { useRoomUI } from "../../hooks/use-room-ui";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Badge } from "@/components/ui/badge";
// import { 
//   BiUserPlus, 
//   BiGroup, 
//   BiTrash, 
// } from "react-icons/bi";


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
    inviteEmail,
    setInviteEmail,
    handleInvite,
    deleteMember,
    roomTasks,
    loadingRoomTasks,
    taskTitle,
    setTaskTitle,
    handleCreateRoomTask,
    handleChangeStatus,
    deleteRoomTask,
  } = useRoomPage();

  // const { roomId } = useParams() as { roomId: string}; 

  // const {
  //   room,
  //   members,
  //   fetchRoom,
  //   loadingMembers,
  //   fetchMembers,
  //   inviteMember,
  //   deleteMember
  // } = useRoomDetailsStore();

  // const {
  //   roomTasks,
  //   loadingRoomTasks,
  //   fetchRoomTasks,
  //   createRoomTask,
  //   updateRoomTaskStatus,
  //   deleteRoomTask
  // } = useRoomTasksStore();

  // const [taskTitle, setTaskTitle] = useState("");
  // const [inviteEmail, setInviteEmail] = useState("");
  
  // useEffect(() => {
  //   if (!roomId) return;
  //   const id = roomId as string;

  //   fetchRoom(id);
  //   fetchMembers(id);
  //   fetchRoomTasks(id);
  // }, [roomId, fetchRoom, fetchMembers, fetchRoomTasks]);

  // const handleCreateRoomTask = async () => {
  //   if (!taskTitle.trim()) return;
  //   await createRoomTask(roomId, taskTitle);
  // };

  // const handleInvite = async () => {
  //   if (!inviteEmail.trim()) return;
  //   await inviteMember(roomId, inviteEmail);
  // };

  // const handleChangeStatus = (status: Status, task: Task) => {
  //   updateRoomTaskStatus(task.id, status, roomId);
  // };

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
          {/* <div className="space-y-6">
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md h-fit">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2 text-zinc-300">
                  <BiGroup className="text-cyan-500" />
                  Members
                </CardTitle>
                <div className="pt-2 flex flex-col gap-2">
                  <Input
                    placeholder="Email address..."
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 text-sm text-zinc-300"
                  />
                  <Button 
                    onClick={handleInvite} 
                    variant="outline" 
                    className="border-zinc-700 text-cyan-700 hover:bg-zinc-800 hover:text-cyan-400"
                  >
                    <BiUserPlus className="mr-2 h-4 w-4" />
                    Invite
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {loadingMembers ? (
                    Array(2).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-12 w-full bg-zinc-800/50" />
                    ))
                  ) : (
                    members.map((m) => (
                      <div 
                        key={m.id} 
                        className="flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-800/50 hover:border-zinc-700 transition-colors text-zinc-300"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm font-medium truncate max-w-[120px]">
                            {m.profiles?.nickname || m.user?.email?.split('@')[0] || 'User'}
                          </span>
                          <Badge variant="secondary" className="w-fit text-[10px] mt-1 bg-zinc-800 text-zinc-400">
                            {m.role}
                          </Badge>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                          onClick={() => deleteMember(m.id, roomId)}
                        >
                          <BiTrash className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div> */}

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
