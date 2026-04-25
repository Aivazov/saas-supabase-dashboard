// features/rooms/components/RoomPage/RoomMembers.tsx

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { BiGroup, BiTrash, BiUserPlus } from 'react-icons/bi';
import { Badge } from '@/components/ui/badge';
import { RoomMember } from '@/types/room-member';

type RoomMembersProps = {
  members: RoomMember[];
  loadingMembers: boolean;
  inviteEmail: string;
  setInviteEmail: (v: string) => void;
  handleInvite: (email: string) => void;
  // handleInvite: () => void;
  deleteMember: (memberId: string, roomId: string) => void;
  roomId: string;
};

const RoomMembers = ({
  members,
  loadingMembers,
  inviteEmail,
  setInviteEmail,
  handleInvite,
  deleteMember,
  roomId,
}: RoomMembersProps) => {
  return (
    <Card className='bg-zinc-900/40 border-zinc-800 backdrop-blur-md h-fit'>
      <CardHeader>
        <CardTitle className='text-xl flex items-center gap-2 text-zinc-300'>
          <BiGroup className='text-cyan-500' /> Members
        </CardTitle>
        <div className='pt-2 flex flex-col gap-2 text-zinc-300'>
          <Input
            placeholder='Email address...'
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            className='bg-zinc-800/50 border-zinc-700 text-sm'
          />
          <Button
            onClick={() => handleInvite(inviteEmail)}
            // onClick={handleInvite}
            variant='outline'
            className='border-zinc-700 text-cyan-700 hover:text-cyan-400'
          >
            <BiUserPlus className='mr-2 h-4 w-4' /> Invite
          </Button>
        </div>
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
                  <Button
                    variant='ghost'
                    size='icon'
                    className='text-zinc-500 hover:text-red-400 hover:bg-red-400/10'
                    onClick={() => deleteMember(m.id, roomId)}
                  >
                    <BiTrash className='w-4 h-4' />
                  </Button>
                </div>
              ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RoomMembers;
