// features/rooms/hooks/use-room-page2.ts

import { useParams } from "next/navigation";
import { useRoomData } from "./use-room-data";
import { useRoomActions } from "./use-room-actions";
import { useRoomUI } from "./use-room-ui";

export const useRoomPage = () => {
  const { roomId } = useParams() as { roomId: string };

  const data = useRoomData(roomId);
  const actions = useRoomActions(roomId);
  const ui = useRoomUI();

  return {
    roomId,
    ...data,
    ...actions,
    ...ui,
  };
};