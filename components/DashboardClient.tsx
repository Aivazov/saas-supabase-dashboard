// components/DashboardClient.tsx
'use client';

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
// import { supabase } from "@/lib/supabase-client";
// import Link from "next/link";
// import RoomCardDropdown from "./RoomCardDropdown";
import { useRoomsStore } from "@/store/useRooms";
import { BiPlusCircle, BiLayer, BiHash } from "react-icons/bi";
import RoomCard from "./RoomCard";

interface DashboardClientProps {
  userEmail?: string | null;
}

export default function DashboardClient({ userEmail }: DashboardClientProps) {
  const { rooms, loadingWhenCreatingRoom, fetchRooms, createRoom } = useRoomsStore();

  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    fetchRooms();
  }, [fetchRooms]);

  useEffect(() => {
    if (rooms.length && !currentRoomId) {
      setCurrentRoomId(rooms[0].id);
    }
  }, [rooms, currentRoomId]);

  async function handleCreateRoom() {
    if (!roomName) return;

    const room = await createRoom(roomName);

    if (room) {
      setCurrentRoomId(room.id);
      setRoomName("");
    }
  }
  
  // async function handleCreateRoom() {
  //   if (!roomName) return;

  //   const { data: { user } } = await supabase.auth.getUser();

  //   const { data: room, error } = await supabase
  //     .from("rooms")
  //     .insert({
  //       name: roomName,
  //       created_by: user?.id
  //     })
  //     .select()
  //     .single();

  //   if (room) {
  //     // гарантированно добавляем создателя в room_members
  //     await supabase.from("room_members").insert({
  //       room_id: room.id,
  //       user_id: user?.id,   // ← это должно совпадать с auth.uid()
  //       role: "admin"
  //     });

  //     // setRooms((prev) => [...prev, room]);
  //     createRoom(room);
  //     setCurrentRoomId(room.id);
  //     setRoomName("");
  //   }
  // }

  return (
    // <div className="p-8 max-w-6xl mx-auto space-y-6 text-white">
    //   <h1 className="text-3xl font-bold">Dashboard</h1>
      
    //   <Card>
    //     <CardHeader>
    //       <CardTitle>Rooms</CardTitle>
    //     </CardHeader>
    //     <CardContent className="space-y-4">

    //       {/* Create Room Input */}
    //       {/* <div className="flex gap-2">
    //         <Input
    //           placeholder="New room name"
    //           value={roomName}
    //           onChange={(e) => setRoomName(e.target.value)}
    //         />
    //         <Button onClick={handleCreateRoom}>Create</Button>
    //       </div> */}

    //       <div className="flex gap-2 bg-gray-800 p-4 rounded-lg shadow-md">
    //         <Input
    //           placeholder="Enter room name..."
    //           value={roomName}
    //           onChange={(e) => setRoomName(e.target.value)}
    //           className="bg-gray-700 text-white border-none focus:ring-2 focus:ring-cyan-400"
    //         />
    //         <Button
    //           onClick={handleCreateRoom}
    //           className="bg-cyan-500 hover:bg-cyan-600 text-white flex items-center gap-2"
    //         >
    //           <BiPlusCircle className="w-4 h-4" /> Create
    //         </Button>
    //       </div>

    //       {/* ROOMS List */}
    //       <div className="flex flex-wrap gap-2">
    //         {rooms.map((room) => (
    //           <div key={room.id} className="flex flex-col items-center justify-center rounded-md bg-gray-400 hover:bg-gray-500">
    //             <Link href={`/dashboard/${room.id}`} className="p-3 w-full cursor-pointer flex items-center justify-center">
    //               {room.name}
    //             </Link>

    //             <RoomCardDropdown roomId={room.id} currentName={room.name} />

    //           </div>
    //         ))}
    //       </div>
    //     </CardContent>
    //   </Card>
    // </div>

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
          
          <div className="flex items-center gap-3 bg-zinc-900/50 p-2 rounded-xl border border-zinc-800 shadow-2xl">
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
          </div>
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
                  // <div
                  //   key={room.id}
                  //   className="group relative bg-zinc-900/40 border border-zinc-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
                  // >
                  //   <div className="flex justify-between items-start mb-10">
                  //     <div className="bg-cyan-500/10 p-3 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
                  //       <BiHash className="w-6 h-6 text-cyan-500" />
                  //     </div>
                  //     <RoomCardDropdown roomId={room.id} currentName={room.name} />
                  //   </div>

                  //   <Link href={`/dashboard/${room.id}`} className="block">
                  //     <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors truncate">
                  //       {room.name}
                  //     </h3>
                  //     <div className="flex items-center mt-2 text-zinc-500 text-sm group-hover:text-zinc-300">
                  //       View details
                  //       <BiChevronRight className="ml-1 w-4 h-4" />
                  //     </div>
                  //   </Link>
                  // </div>
                  <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}