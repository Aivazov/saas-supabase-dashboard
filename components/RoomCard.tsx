import { Room } from '@/store/useRooms'
import { BiChevronRight, BiHash } from 'react-icons/bi';
import RoomCardDropdown from './RoomCardDropdown';
import Link from 'next/link';

type Props = {
  room: Room;
}

const RoomCard = ({room}: Props) => {
  return (
    <div 
      className="group relative bg-zinc-900/40 border border-zinc-800 hover:border-cyan-500/50 rounded-2xl p-5 transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1"
    >
      <div className="flex justify-between items-start mb-10">
        <div className="bg-cyan-500/10 p-3 rounded-xl group-hover:bg-cyan-500/20 transition-colors">
          <BiHash className="w-6 h-6 text-cyan-500" />
        </div>
        <RoomCardDropdown roomId={room.id} currentName={room.name} />
      </div>

      <Link href={`/dashboard/${room.id}`} className="block">
        <h3 className="text-lg font-semibold group-hover:text-cyan-400 transition-colors truncate">
          {room.name}
        </h3>
        <div className="flex items-center mt-2 text-zinc-500 text-sm group-hover:text-zinc-300">
          View details
          <BiChevronRight className="ml-1 w-4 h-4" />
        </div>
      </Link>
    </div>
  )
}

export default RoomCard