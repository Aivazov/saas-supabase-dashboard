// features/tasks/components/StatusBadge.tsx

import { Status } from "@/types/status";

type StatusBadgeProps = {
  status: Status;
}

const statusMap = {
  todo: {
    label: 'Todo',
    color: 'text-zinc-400',
    dot: 'bg-zinc-400'
  },
  doing: {
    label: 'In Progress',
    color: 'text-orange-400',
    dot: 'bg-orange-400'
  },
  done: {
    label: 'Done',
    color: 'text-emerald-400',
    dot: 'bg-emerald-400'
  }
}

const StatusBadge = ({status}: StatusBadgeProps) => {
  const config = statusMap[status];

  return (
    <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-bold ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} shadow-[0_0_5px_currentColor]`} />
      {config.label}
    </span>
  )
}

export default StatusBadge