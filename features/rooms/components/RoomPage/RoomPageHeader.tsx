// features/rooms/components/RoomPage/RoomPageHeader.tsx

import { Room } from '@/types/room';
import Link from 'next/link'
import { BiArrowBack, BiTask } from 'react-icons/bi'

type RoomPageHeaderProps = {
  room: Room | null;
}

const RoomPageHeader = ({ room }: RoomPageHeaderProps) => {
  return (
    <div className="space-y-4">
      <Link 
        href="/dashboard" 
        className="inline-flex items-center text-sm text-zinc-500 hover:text-cyan-400 transition-colors group"
      >
        <BiArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            {room?.name || "Loading room..."}
          </h1>
          <p className="text-zinc-400 mt-1 flex items-center gap-2">
            <BiTask className="text-cyan-500" />
            Manage tasks and collaborators in this space.
          </p>
        </div>
      </div>
    </div>
  )
}

export default RoomPageHeader