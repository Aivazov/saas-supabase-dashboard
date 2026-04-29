import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BiUserPlus } from 'react-icons/bi';

type InviteMemberProps = {
  inviteEmail: string;
  setInviteEmail: (value: string) => void;
  handleInvite: (email: string) => void;
};

const InviteMember = ({
  inviteEmail,
  setInviteEmail,
  handleInvite,
}: InviteMemberProps) => {
  return (
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
  );
};

export default InviteMember;
