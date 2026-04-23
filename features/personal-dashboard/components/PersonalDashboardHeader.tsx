// features/personal-dashboard/components/PersonalDashboardHeader.tsx

import GenerateTasksBtn from '@/features/tasks/components/GenerateTasksBtn';
import { BiUserCircle } from 'react-icons/bi'

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

      <GenerateTasksBtn
        generateTasks={generateTasks}
        aiLoading={aiLoading}
      />
    </div>
  )
}

export default PersonalDashboardHeader