// features/dashboard/components/NoRoomBlock.tsx

import { BiHash } from 'react-icons/bi'

const NoRoomsBlock = () => {
  return (
    <div className="flex flex-col items-center justify-center p-20 border-2 border-dashed border-zinc-800 rounded-3xl bg-zinc-900/20">
      <div className="bg-zinc-800/50 p-4 rounded-full mb-4">
        <BiHash className="w-8 h-8 text-zinc-500" />
      </div>
      <h3 className="text-lg font-medium">No rooms found</h3>
      <p className="text-zinc-500 text-sm">Create your first room to get started.</p>
    </div>
  )
}

export default NoRoomsBlock