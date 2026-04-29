// features/rooms/components/RoomPage/RoomMembers.tsx

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BiGroup, BiTrash } from 'react-icons/bi';
import { Badge } from '@/components/ui/badge';
import { RoomMember } from '@/types/room-member';
import DeleteModal from '@/components/Modal/DeleteModal';
import { useState } from 'react';
import { useAuthStore } from '@/store/useAuth';
import { calculateRole, permissions } from '../../logic/permissions';
import InviteMember from './InviteMember';
import { Room } from '@/types/room';

type RoomMembersProps = {
  room: Room | null;
  members: RoomMember[];
  loadingMembers: boolean;
  inviteEmail: string;
  setInviteEmail: (v: string) => void;
  handleInvite: (email: string) => void;
  deleteMember: (memberId: string, roomId: string) => Promise<void>;
  roomId: string;
};

const RoomMembers = ({
  room,
  members,
  loadingMembers,
  inviteEmail,
  setInviteEmail,
  handleInvite,
  deleteMember,
  roomId,
}: RoomMembersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuthStore();
  const role = calculateRole(user?.id ?? null, room, members);

  const handleOpenModal = () => {
    setIsOpen(true);
  };
  return (
    <Card className='bg-zinc-900/40 border-zinc-800 backdrop-blur-md h-fit'>
      <CardHeader>
        <CardTitle className='text-xl flex items-center gap-2 text-zinc-300'>
          <BiGroup className='text-cyan-500' /> Members
        </CardTitle>
        {permissions?.canInviteMember(role) && (
          <InviteMember
            inviteEmail={inviteEmail}
            setInviteEmail={setInviteEmail}
            handleInvite={handleInvite}
          />
        )}
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {loadingMembers
            ? Array(2)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className='h-12 w-full bg-zinc-800/50 rounded-xl'
                  />
                ))
            : members.map((m) => (
                <div
                  key={m.id}
                  className='flex items-center justify-between p-3 rounded-xl bg-zinc-800/30 border border-zinc-800/50 hover:border-zinc-700 transition-colors text-zinc-300'
                >
                  <div className='flex flex-col'>
                    <span className='text-sm font-medium truncate max-w-[120px]'>
                      {m.profiles?.nickname ||
                        m.user?.email?.split('@')[0] ||
                        'User'}
                    </span>
                    <Badge
                      variant='secondary'
                      className='w-fit text-[10px] mt-1 bg-zinc-800 text-zinc-400'
                    >
                      {m.role}
                    </Badge>
                  </div>
                  {permissions?.canDeleteMember(role) && (
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-zinc-500 hover:text-red-400 hover:bg-red-400/10 cursor-pointer'
                      // onClick={() => deleteMember(m.id, roomId)}
                      onClick={handleOpenModal}
                    >
                      <BiTrash className='w-4 h-4' />
                    </Button>
                  )}
                  {/* <Button
                    variant='ghost'
                    size='icon'
                    className='text-zinc-500 hover:text-red-400 hover:bg-red-400/10 cursor-pointer'
                    // onClick={() => deleteMember(m.id, roomId)}
                    onClick={handleOpenModal}
                  >
                    <BiTrash className='w-4 h-4' />
                  </Button> */}
                  <DeleteModal
                    title='Confirm removing'
                    description='Are you sure you want to remove this member?'
                    handleAction={() => deleteMember(m.id, roomId)}
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                  />
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomMembers;
