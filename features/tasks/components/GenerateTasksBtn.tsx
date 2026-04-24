// features/tasks/components/GenerateTasksBtn.tsx

import { Button } from '@/components/ui/button'
import { IoSparkles } from 'react-icons/io5'

type GenerateTasksBtnProps = {
  generateTasks: () => Promise<void>;
  aiLoading: boolean;
}

const GenerateTasksBtn = ({ generateTasks, aiLoading }: GenerateTasksBtnProps) => {
  return (
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
  )
}

export default GenerateTasksBtn