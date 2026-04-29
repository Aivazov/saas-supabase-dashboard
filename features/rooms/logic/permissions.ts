// features/rooms/logic/permissions.ts

import { Room } from '@/types/room';
import { RoomMember } from '@/types/room-member';

export type AppRole = 'owner' | 'admin' | 'member';

export const calculateRole = (
  currentUserId: string | null,
  room: Room | null,
  members: RoomMember[],
): AppRole => {
  if (!currentUserId || !room) return 'member';

  // 1. Владелец — тот, кто создал комнату
  if (room.created_by === currentUserId) return 'owner';

  // 2. Ищем пользователя в списке участников
  const membership = members.find(
    (member) =>
      // Проверяем по вложенному объекту профиля или если у тебя в RoomMember есть user_id напрямую
      (member as any).user_id === currentUserId,
  );
  // console.log('currentUserId calculateRole', currentUserId);
  // console.log('room calculateRole', room);
  // console.log('members calculateRole', members);

  if (membership) return membership.role as AppRole;

  return 'member';
};

export const permissions = {
  canCreateRoom: (role: AppRole) =>
    role === 'owner' || role === 'admin' || role === 'member',

  canDeleteRoom: (role: AppRole) => role === 'owner',

  canViewRoom: (role: AppRole) => role !== 'member',

  // canCreateRoomTask: (role: AppRole) => role === 'owner',
  canCreateRoomTask: (role: AppRole) => role === 'owner' || role === 'admin',

  canInviteMember: (role: AppRole) => role === 'owner' || role === 'admin',
  canDeleteMember: (role: AppRole) => role === 'owner' || role === 'admin',

  canChangeTask: (role: AppRole) => role === 'owner' || role === 'admin',
};
