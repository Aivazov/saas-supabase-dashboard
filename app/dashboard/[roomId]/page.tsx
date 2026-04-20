import RoomPageClient from "@/components/RoomPageClient";

export default function Room({ params }: { params: { roomId: string } }) {
  return <RoomPageClient />;
  // return <RoomPageClient roomId={params.roomId} />;
}
