// features/dashboard/components/DashboardContentSection.tsx

import { Room } from '@/types/room'
import RoomCard from '@/features/rooms/components/RoomCard'
import NoRoomsBlock from './NoRoomsBlock'
import { BiLayer } from 'react-icons/bi'

const DashboardContentSection = ({ rooms }: {rooms: Room[]}) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 text-zinc-400 text-sm font-medium uppercase tracking-wider">
        <BiLayer className="w-4 h-4" />
        <h2>Your Rooms</h2>
        <span className="ml-auto bg-zinc-800 px-2 py-0.5 rounded text-xs">{rooms.length} total</span>
      </div>

      {/* ROOMS Section */}
      {rooms.length === 0 ? (
        // No rooms
        <NoRoomsBlock />
      ) : (
          
        //Rooms List 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </section>
  )
}

export default DashboardContentSection