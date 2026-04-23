// features/auth/components/DashboardClient.tsx
'use client';

// import { useEffect, useState } from "react";
import RoomCard from "@/features/rooms/components/RoomCard";
import { useDashboard } from "../hooks/use-dashboard";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useRoomsStore } from "@/store/useRooms";
import { BiPlusCircle, BiLayer, BiHash } from "react-icons/bi";

interface DashboardClientProps {
  userEmail?: string | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const {
    rooms,
    loadingWhenCreatingRoom,
    // currentRoomId,
    // setCurrentRoomId,
    form,
    handleCreateRoom
  } = useDashboard();

  // const { rooms, loadingWhenCreatingRoom, fetchRooms, createRoom } = useRoomsStore();

  // const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // const [roomName, setRoomName] = useState("");

  // useEffect(() => {
  //   fetchRooms();
  // }, [fetchRooms]);

  // useEffect(() => {
  //   if (rooms.length && !currentRoomId) {
  //     setCurrentRoomId(rooms[0].id);
  //   }
  // }, [rooms, currentRoomId]);

  // async function handleCreateRoom() {
  //   if (!roomName) return;

  //   const room = await createRoom(roomName);

  //   if (room) {
  //     setCurrentRoomId(room.id);
  //     setRoomName("");
  //   }
  // }


  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-zinc-400 mt-1">Manage your collaborative spaces and projects.</p>
          </div>
          
          <form 
            onSubmit={form.handleSubmit(handleCreateRoom)}
            className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800 shadow-2xl"
          >
            <div className="relative">
              <Input
                {...form.register("name")}
                placeholder="New room name..."
                className="bg-transparent border-none focus-visible:ring-0 w-full md:w-64 text-sm"
              />
              {form.formState.errors.name && (
                <span className="absolute -bottom-5 left-0 text-[10px] text-red-500">
                  {form.formState.errors.name.message}
                </span>
              )}
            </div>
            <Button 
              type="submit"
              disabled={loadingWhenCreatingRoom || !form.formState.isValid}
              className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(8,145,178,0.3)] cursor-pointer"
            >
              <BiPlusCircle className="mr-2 h-4 w-4" />
              {loadingWhenCreatingRoom ? "Creating..." : "Create Room"}
            </Button>
          </form>

          {/* <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800 shadow-2xl">
            <Input
              placeholder="New room name..."
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              className="bg-transparent border-none focus-visible:ring-0 w-full md:w-64 text-sm"
            />
            <Button 
              onClick={handleCreateRoom}
              disabled={loadingWhenCreatingRoom || !roomName}
              className="bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(8,145,178,0.3)]"
            >
              <BiPlusCircle className="mr-2 h-4 w-4" />
              {loadingWhenCreatingRoom ? "Creating..." : "Create Room"}
            </Button>
          </div> */}
        </div>

        {/* Content Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium uppercase tracking-wider">
            <BiLayer className="w-4 h-4" />
            <h2>Your Rooms</h2>
            <span className="ml-auto bg-zinc-800 px-2 py-0.5 rounded text-xs">{rooms.length} total</span>
          </div>

          {/* ROOMS Section */}
          {rooms.length === 0 ? (
            // No rooms
            <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
              <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
                <BiHash className="w-8 h-8 text-zinc-500" />
              </div>
              <h3 className="text-lg font-medium">No rooms found</h3>
              <p className="text-zinc-500 text-sm">Create your first room to get started.</p>
            </div>
          ) : (
              
            //Rooms List 
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rooms.map((room) => (
                  <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}