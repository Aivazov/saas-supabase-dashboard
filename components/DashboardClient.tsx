// components/DashboardClient.tsx
'use client';

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import RoomActions from "./RoomActions";
import { useRoomsStore } from "@/store/useRooms";

interface DashboardClientProps {
  userEmail?: string | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {

  // const [rooms, setRooms] = useState<any[]>([]);
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // const [todos, setTodos] = useState<any[]>([]);

  const [roomName, setRoomName] = useState("");
  // const [taskTitle, setTaskTitle] = useState("");

  const { rooms, fetchRooms, addRoom } = useRoomsStore();

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (rooms.length && !currentRoomId) {
      setCurrentRoomId(rooms[0].id);
    }
  }, [rooms, currentRoomId]);

  // async function loadRooms() {
  //   const { data } = await supabase.from("rooms").select("*");
  //   setRooms(data || []);

  //   if (data?.length && !currentRoomId) {
  //     setCurrentRoomId(data[0].id);
  //   }
  // }

  // async function loadTodos(roomId: string) {
  //   const { data } = await supabase
  //     .from("room_todos")
  //     .select("*")
  //     .eq("room_id", roomId)
  //     .order("created_at", { ascending: false });

  //   setTodos(data || []);
  // }

  // useEffect(() => {
  //   loadRooms();
  // }, []);

  // useEffect(() => {
  //   if (currentRoomId) {
  //     loadTodos(currentRoomId);
  //   }
  // }, [currentRoomId]);

  // async function createRoom() {
  //   if (!roomName) return;

  //   const { data, error } = await supabase
  //     .from("rooms")
  //     .insert({
  //       name: roomName,
  //       created_by: (await supabase.auth.getUser()).data.user?.id
  //     })
  //     .select()
  //     .single();

  //   if (data) {
  //     setRooms((prev) => [...prev, data]);
  //     setCurrentRoomId(data.id);
  //     setRoomName("");
  //   }
  // }
  async function createRoom() {
    if (!roomName) return;

    const { data: { user } } = await supabase.auth.getUser();

    const { data: room, error } = await supabase
      .from("rooms")
      .insert({
        name: roomName,
        created_by: user?.id
      })
      .select()
      .single();

    if (room) {
      // гарантированно добавляем создателя в room_members
      await supabase.from("room_members").insert({
        room_id: room.id,
        user_id: user?.id,   // ← это должно совпадать с auth.uid()
        role: "admin"
      });

      // setRooms((prev) => [...prev, room]);
      addRoom(room);
      setCurrentRoomId(room.id);
      setRoomName("");
    }
  }


  // async function createTodo() {
  //   if (!taskTitle || !currentRoomId) return;

  //   const { data } = await supabase
  //     .from("room_todos")
  //     .insert({
  //       title: taskTitle,
  //       room_id: currentRoomId,
  //     })
  //     .select()
  //     .single();

  //   if (data) {
  //     setTodos((prev) => [data, ...prev]);
  //     setTaskTitle("");
  //   }
  // }

  // группировка задач по статусу
  // const columns = {
  //   todo: todos.filter((t) => t.status === "todo"),
  //   in_progress: todos.filter((t) => t.status === "in_progress"),
  //   done: todos.filter((t) => t.status === "done"),
  // };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 text-white">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      
      {/* ROOM SECTION */}
      <Card>
        <CardHeader>
          <CardTitle>Rooms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="New room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <Button onClick={createRoom}>Create</Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {rooms.map((room) => (
              <div key={room.id} className="flex flex-col items-center justify-center rounded-md bg-gray-400 hover:bg-gray-500">
                <Link href={`/dashboard/${room.id}`} className="p-3 w-full cursor-pointer flex items-center justify-center">
                  {room.name}
                </Link>

                <RoomActions roomId={room.id} currentName={room.name} />

              </div>
            ))}
            {/* {rooms.map((room) => (
              <Button
                key={room.id}
                variant={room.id === currentRoomId ? "default" : "outline"}
                onClick={() => setCurrentRoomId(room.id)}
              >
                {room.name}
              </Button>
            ))} */}
          </div>
        </CardContent>
      </Card>

      {/* TODO SECTION */}
      {/* {currentRoomId && (
        <Card>
          <CardHeader>
            <CardTitle>Tasks in {rooms.find(r => r.id === currentRoomId)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="New task"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
              />
              <Button onClick={createTodo}>Add</Button>
            </div>

            Kanban board 
            <div className="grid grid-cols-3 gap-4">
              {["todo", "in_progress", "done"].map((status) => (
                <div key={status} className="space-y-2">
                  <h3 className="text-lg font-semibold capitalize">{status.replace("_", " ")}</h3>
                  {todos.filter(t => t.status === status).map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border rounded-lg flex justify-between items-center hover:bg-muted transition"
                    >
                      <span>{task.title}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={async () => {
                          await supabase
                            .from("room_todos")
                            .update({ status })
                            .eq("id", task.id);
                          loadTodos(currentRoomId);
                        }}
                      >
                        Move here
                      </Button>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}