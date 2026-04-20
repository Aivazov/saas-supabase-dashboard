// components/RoomPageClient.tsx
'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRoomDetailsStore } from "@/store/userRoomDetails";
import { useRoomTasksStore } from "@/store/useRoomTasks";
import TaskComponent from "./Task/TaskComponent";
import { Status } from "@/constants/status";
import { Task } from "@/constants/task";
import { Skeleton } from "@/components/ui/skeleton";


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

  // const [loadingMembers, setLoadingMembers] = useState(true);
  // const [loadingTasks, setLoadingTasks] = useState(false);

  const handleCreateRoomTask = async () => {
    await createRoomTask(roomId as string, taskTitle)
  }

  const handleInvite = async () => {
    await inviteMember(roomId as string, inviteEmail)
  }

  useEffect(() => {
    if (!roomId) return;
    const id = roomId as string;

    fetchRoom(id);

    // setLoadingMembers(true);
    fetchMembers(id);
    // fetchMembers(id).finally(() => setLoadingMembers(false));

    // setLoadingTasks(true);
    fetchRoomTasks(id);
    // fetchRoomTasks(id).finally(() => setLoadingTasks(false));
  }, [roomId, fetchRoom, fetchMembers, fetchRoomTasks]);

  const handleChangeStatus = (status: Status, task: Task) => {
    updateRoomTaskStatus(task.id, status, roomId);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 text-white">
      <h1 className="text-3xl font-bold">{room?.name}</h1>

      <Link href='/dashboard' className="px-3 py-1 bg-blue-600 text-white rounded">Back</Link>
      {/* MEMBERS */}
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Members</CardTitle>
          <div className="flex gap-2">
            <Input
              placeholder="Invite by email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <Button onClick={handleInvite}>Invite</Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2">
            {loadingMembers ? (
              <>
                {[...Array(2)].map((_, i) => (
                  <li key={i} className="flex flex-col w-full justify-between px-4 py-2">
                    <Skeleton className="h-10 w-full" />
                    {/* <Skeleton className="h-4 w-32" /> */}
                  </li>
                ))}
              </>
            ) : (
                members.map((m) => (
                <li key={m.id} className="flex justify-between bg-gray-300 hover:bg-gray-400 rounded-sm px-4 py-2">
                  <span>{m.profiles?.nickname || m.user?.email || 'Unknown user'}</span>
                  <span className="text-sm text-muted-foreground">{m.role}</span>
                  <Button
                    variant="destructive"
                    className="cursor-pointer"
                    size="sm"
                    onClick={() => deleteMember(m.id, roomId)}
                  >
                    Remove
                  </Button>
                </li>
              ))
            )}
            
            {/* {members.map((m) => (
              <li key={m.id} className="flex justify-between bg-gray-300 hover:bg-gray-400 rounded-sm px-4 py-2">
                <span>{m.profiles?.nickname || m.user?.email || 'Unknown user'}</span>
                <span className="text-sm text-muted-foreground">{m.role}</span>
                <Button
                  variant="destructive"
                  className="cursor-pointer"
                  size="sm"
                  onClick={() => deleteMember(m.id, roomId)}
                >
                  Remove
                </Button>
              </li>
            ))} */}
          </ul>
          
        </CardContent>
      </Card>

      {/* TASKS */}
      <Card>
        <CardHeader>
          <CardTitle>Tasks</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="New task"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <Button onClick={handleCreateRoomTask}>Add</Button>
          </div>

          <div className="flex w-full items-center justify-between">
            <div className="flex flex-col items-center justify-between w-full gap-4">
              {loadingRoomTasks ? (
              <>
                {[...Array(2)].map((_, i) => (
                  <li key={i} className="flex flex-col w-full justify-between px-4 py-2">
                    <Skeleton className="h-12 w-full" />
                    {/* <Skeleton className="h-4 w-32" /> */}
                  </li>
                ))}
              </>
              ) : (
                roomTasks.map((task) => (
                  <TaskComponent
                    key={task.id}
                    task={task}
                    onChangeStatus={handleChangeStatus}
                    onDelete={(task) => deleteRoomTask(task.id, roomId)}
                  />
                ))
              )}
              
              {/* {roomTasks.map((task) => (

                <TaskComponent
                  key={task.id}
                  task={task}
                  onChangeStatus={handleChangeStatus}
                  onDelete={(task) => deleteRoomTask(task.id, roomId)}
                />
              ))} */}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
