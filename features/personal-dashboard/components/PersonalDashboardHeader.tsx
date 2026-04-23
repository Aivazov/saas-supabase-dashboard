// features/personal-dashboard/components/PersonalDashboardHeader.tsx

import { Button } from '@/components/ui/button'
import React from 'react'
import { BiUserCircle } from 'react-icons/bi'
import { IoSparkles } from 'react-icons/io5';

type PersonalDashboardHeaderProps = {
  userEmail?: string | null;
  generateTasks: () => Promise<void>;
  aiLoading: boolean;
}

const PersonalDashboardHeader = ({ userEmail, generateTasks, aiLoading }: PersonalDashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
          My Tasks
        </h1>
        <div className="flex items-center gap-2 text-zinc-500 bg-zinc-900/50 w-fit px-3 py-1 rounded-full border border-zinc-800">
          <BiUserCircle className="text-cyan-500" />
          <span className="text-xs font-medium">{userEmail}</span>
        </div>
      </div>

      <Button
        onClick={generateTasks}
        disabled={aiLoading}
        className="relative overflow-hidden group bg-zinc-900 rounded-md border border-zinc-800 hover:border-cyan-500/50 transition-all px-6 py-2 cursor-pointer"
      >
        <span className="relative z-10 flex items-center gap-2">
          {aiLoading ? (
            <div className="h-4 w-4 border-2 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />
          ) : (
            <IoSparkles className="text-cyan-400 group-hover:rotate-12 transition-transform" />
          )}
          {aiLoading ? 'Magic in progress...' : 'AI Generate'}
        </span>

        {/* Glowing effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      </Button>
    </div>
  )
}

export default PersonalDashboardHeader