// components/RoomPage.tsx
'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useRoomDetailsStore } from "@/store/userRoomDetails";
import { useRoomTasksStore } from "@/store/useRoomTasks";
import TaskComponent from "./Task/TaskComponent";
import { Status } from "@/constants/status";

// interface RoomPageProps {
//   roomdId: string;
// }

export default function RoomPage() {
// export default function RoomPage({roomId}: RoomPageProps) {
  const { roomId } = useParams() as { roomId: string}; // getting roomId from URL

  const {
    room,
    members,
    loadRoom,
    loadMembers,
    inviteMember,
    deleteMember
  } = useRoomDetailsStore();

  const {
    todos,
    loadTodos,
    createTodo,
    updateRoomTaskStatus
  } = useRoomTasksStore();

  // const [room, setRoom] = useState<any>(null);
  // const [members, setMembers] = useState<any[]>([]);
  // const [todos, setTodos] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");

  const handleCreateTodo = async () => {
    await createTodo(roomId as string, taskTitle)
  }

  const handleInvite = async () => {
    await inviteMember(roomId as string, inviteEmail)
  }

  useEffect(() => {
    if (!roomId) return;

    const id = roomId as string;

    loadRoom(id);
    loadMembers(id);
    loadTodos(id);
  }, [roomId, loadRoom, loadMembers, loadTodos]);
  // useEffect(() => {
  //   if (!roomId) return;

  //   loadRoom(roomId as string);
  //   loadMembers(roomId as string);
  //   loadTodos(roomId as string);
  // }, [roomId]);

  // async function loadRoom() {
  //   const { data } = await supabase.from("rooms").select("*").eq("id", roomId).single();
  //   setRoom(data);
  // }

  // async function loadMembers() {
  //   const { data } = await supabase
  //     .from("room_members")
  //     .select("id, role, profiles(email, nickname)")
  //     .eq("room_id", roomId);
  //   setMembers(data || []);
  // }

  // async function loadTodos() {
  //   const { data } = await supabase
  //     .from("room_todos")
  //     .select("*")
  //     .eq("room_id", roomId)
  //     .order("created_at", { ascending: false });
  //   setTodos(data || []);
  // }


  // useEffect(() => {
  //   loadRoom();
  //   loadMembers();
  //   loadTodos();
  // }, [roomId]);

  // async function createTodo() {
  //   if (!taskTitle) return;
  //   const { data } = await supabase
  //     .from("room_todos")
  //     .insert({ title: taskTitle, room_id: roomId })
  //     .select()
  //     .single();
  //   if (data) {
  //     setTodos((prev) => [data, ...prev]);
  //     setTaskTitle("");
  //   }
  // }

  // async function inviteMember() {
  //   if (!inviteEmail) return;
  //   // ищем пользователя по email
  //   const { data: user } = await supabase
  //     .from("profiles")
  //     .select("id")
  //     .eq("email", inviteEmail)
  //     .maybeSingle();
    
  //   if (!user) {
  //     alert("User not found")
  //     return;
  //   }

  //   if (user) {
  //     await supabase.from("room_members").insert({
  //       room_id: roomId,
  //       user_id: user.id,
  //       role: "member"
  //     });
  //     loadMembers();
  //     setInviteEmail("");
  //   }
  // }
  // const handleDeleteMember = async (memberId, roomId) => {
  //   await supabase
  //     .from("room_members")
  //     .delete()
  //     .eq("id", memberId);
  //   loadMembers(roomId);
  // }

  const handleChangeStatus = (status: Status, task: any) => {
    updateRoomTaskStatus(task.id, status, roomId);
  };

  const columns = {
    todo: todos.filter((t) => t.status === "todo"),
    in_progress: todos.filter((t) => t.status === "doing"),
    done: todos.filter((t) => t.status === "done"),
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
            {members.map((m) => (
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
            ))}
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
            <Button onClick={handleCreateTodo}>Add</Button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-3">
              {todos.map((task) => (
                <TaskComponent
                  key={task.id}
                  task={task}
                  onChangeStatus={handleChangeStatus}
                />
              ))}
            </div>
            {/* {Object.entries(columns).map(([status, items]) => (
              <div key={status} className="space-y-2">
                <h3 className="text-lg font-semibold capitalize">{status.replace("_", " ")}</h3>
                {items.map((task) => (
                  <div
                    key={task.id}
                    className="p-3 border rounded-lg flex justify-between items-center hover:bg-muted transition"
                  >
                    <span>{task.title}</span>
                    <span className="text-sm text-muted-foreground">{task.status}</span>
                  </div>
                ))}
              </div>
            ))} */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
