// components/RoomPageClient.tsx
'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { useRoomDetailsStore } from "@/store/userRoomDetails";
import { useRoomTasksStore } from "@/store/useRoomTasks";
import TaskComponent from "./Task/TaskComponent";
import { Status } from "@/constants/status";
import { Task } from "@/constants/task";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { 
  BiArrowBack, 
  BiUserPlus, 
  BiTask, 
  BiGroup, 
  BiTrash, 
  BiPlus 
} from "react-icons/bi";


export default function RoomPageClient() {
// export default function RoomPageClient({roomId}: RoomPageProps) {
  const { roomId } = useParams() as { roomId: string}; 

  const {
    room,
    members,
    fetchRoom,
    loadingMembers,
    fetchMembers,
    inviteMember,
    deleteMember
  } = useRoomDetailsStore();

  const {
    roomTasks,
    loadingRoomTasks,
    fetchRoomTasks,
    createRoomTask,
    updateRoomTaskStatus,
    deleteRoomTask
  } = useRoomTasksStore();

  const [taskTitle, setTaskTitle] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  
  useEffect(() => {
    if (!roomId) return;
    const id = roomId as string;

    fetchRoom(id);
    fetchMembers(id);
    fetchRoomTasks(id);
  }, [roomId, fetchRoom, fetchMembers, fetchRoomTasks]);

  const handleCreateRoomTask = async () => {
    if (!taskTitle.trim()) return;
    await createRoomTask(roomId, taskTitle);
    // setTaskTitle("");
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) return;
    await inviteMember(roomId, inviteEmail);
    // setInviteEmail("");
  };

  const handleChangeStatus = (status: Status, task: Task) => {
    updateRoomTaskStatus(task.id, status, roomId);
  };

  return (
    // <div className="p-8 max-w-6xl mx-auto space-y-6 text-white">
    //   <h1 className="text-3xl font-bold">{room?.name}</h1>

    //   <Link href='/dashboard' className="px-3 py-1 bg-blue-600 text-white rounded">Back</Link>
    //   {/* MEMBERS */}
    //   <Card>
    //     <CardHeader className="flex items-center justify-between">
    //       <CardTitle>Members</CardTitle>
    //       <div className="flex gap-2">
    //         <Input
    //           placeholder="Invite by email"
    //           value={inviteEmail}
    //           onChange={(e) => setInviteEmail(e.target.value)}
    //         />
    //         <Button onClick={handleInvite}>Invite</Button>
    //       </div>
    //     </CardHeader>

    //     <CardContent className="space-y-4">
    //       <ul className="space-y-2">
    //         {loadingMembers ? (
    //           <>
    //             {[...Array(2)].map((_, i) => (
    //               <li key={i} className="flex flex-col w-full justify-between px-4 py-2">
    //                 <Skeleton className="h-10 w-full" />
    //                 {/* <Skeleton className="h-4 w-32" /> */}
    //               </li>
    //             ))}
    //           </>
    //         ) : (
    //             members.map((m) => (
    //             <li key={m.id} className="flex justify-between bg-gray-300 hover:bg-gray-400 rounded-sm px-4 py-2">
    //               <span>{m.profiles?.nickname || m.user?.email || 'Unknown user'}</span>
    //               <span className="text-sm text-muted-foreground">{m.role}</span>
    //               <Button
    //                 variant="destructive"
    //                 className="cursor-pointer"
    //                 size="sm"
    //                 onClick={() => deleteMember(m.id, roomId)}
    //               >
    //                 Remove
    //               </Button>
    //             </li>
    //           ))
    //         )}
    //       </ul>
          
    //     </CardContent>
    //   </Card>

    //   {/* TASKS */}
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Tasks</CardTitle>
    //     </CardHeader>
    //     <CardContent className="space-y-4">
    //       <div className="flex gap-2">
    //         <Input
    //           placeholder="New task"
    //           value={taskTitle}
    //           onChange={(e) => setTaskTitle(e.target.value)}
    //         />
    //         <Button onClick={handleCreateRoomTask}>Add</Button>
    //       </div>

    //       <div className="flex w-full items-center justify-between">
    //         <div className="flex flex-col items-center justify-between w-full gap-4">
    //           {loadingRoomTasks ? (
    //           <>
    //             {[...Array(2)].map((_, i) => (
    //               <li key={i} className="flex flex-col w-full justify-between px-4 py-2">
    //                 <Skeleton className="h-12 w-full" />
    //                 {/* <Skeleton className="h-4 w-32" /> */}
    //               </li>
    //             ))}
    //           </>
    //           ) : (
    //             roomTasks.map((task) => (
    //               <TaskComponent
    //                 key={task.id}
    //                 task={task}
    //                 onChangeStatus={handleChangeStatus}
    //                 onDelete={(task) => deleteRoomTask(task.id, roomId)}
    //               />
    //             ))
    //           )}
    //         </div>
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>

    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Navigation & Header */}
        <div className="space-y-4">
          <Link 
            href="/dashboard" 
            className="inline-flex items-center text-sm text-zinc-500 hover:text-cyan-400 transition-colors group"
          >
            <BiArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
                {room?.name || "Loading room..."}
              </h1>
              <p className="text-zinc-400 mt-1 flex items-center gap-2">
                <BiTask className="text-cyan-500" />
                Manage tasks and collaborators in this space.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* TASKS COLUMN (Left 2/3) */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-zinc-900/40 border-zinc-800 backdrop-blur-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <CardTitle className="text-xl flex items-center gap-2 text-zinc-300">
                      <BiTask className="text-cyan-500" />
                      Tasks
                    </CardTitle>
                    <CardDescription>Track and update your progress.</CardDescription>
                  </div>
                </div>
                
                {/* Create Task Input Row */}
                <div className="flex gap-2 pt-4">
                  <Input
                    placeholder="What needs to be done?"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="bg-zinc-800/50 border-zinc-700 focus:ring-cyan-500 text-zinc-300"
                  />
                  <Button 
                    onClick={handleCreateRoomTask} 
                    disabled={loadingRoomTasks || !taskTitle}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white"
                  >
                    <BiPlus className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {loadingRoomTasks ? (
                    Array(3).fill(0).map((_, i) => (
                      <Skeleton key={i} className="h-16 w-full bg-zinc-800/50 rounded-xl" />
                    ))
                  ) : roomTasks.length > 0 ? (
                    roomTasks.map((task) => (
                      <div key={task.id} className="transition-all hover:translate-x-1">
                        <TaskComponent
                          task={task}
                          onChangeStatus={handleChangeStatus}
                          onDelete={(t) => deleteRoomTask(t.id, roomId)}
                        />
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10 border-2 border-dashed border-zinc-800 rounded-2xl">
                      <p className="text-zinc-500 text-sm">No tasks yet. Add one above!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* MEMBERS COLUMN (Right 1/3) */}
          <div className="space-y-6">
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
          </div>

        </div>
      </div>
    </div>
  );
}
