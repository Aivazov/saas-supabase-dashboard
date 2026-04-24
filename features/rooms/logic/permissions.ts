// features/rooms/logic/permissions.ts

import { Room } from "@/types/room";
import { RoomMember } from "@/types/room-member";

export type AppRole = 'owner' | 'admin' | 'member' | 'guest';

export const calculateRole = (
  currentUserId: string | undefined,
  room: Room | null,
  members: RoomMember[]
): AppRole => {
  if (!currentUserId || !room) return 'guest';
  
  // 1. Владелец — тот, кто создал комнату
  if (room.created_by === currentUserId) return 'owner';
  
  // 2. Ищем пользователя в списке участников
  const membership = members.find(m => 
    // Проверяем по вложенному объекту профиля или если у тебя в RoomMember есть user_id напрямую
    (m as any).user_id === currentUserId 
  );

  if (membership) return membership.role as AppRole;

  return 'guest';
};