import RoomPage from "@/components/RoomPage";

export default function Room({ params }: { params: { roomId: string } }) {
  return <RoomPage />;
  // return <RoomPage roomId={params.roomId} />;
}
