// app/dashboard/[roomId]/RoomPageClient.tsx

import RoomPageClient from "@/features/rooms/components/RoomPage/RoomPageClient";

export default function Room({ params }: { params: { roomId: string } }) {
  return <RoomPageClient />;
}
