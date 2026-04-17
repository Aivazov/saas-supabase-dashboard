// components/StatusBadge.tsx
// import { Status } from "@/types/components";

import { Status } from "@/constants/status";

type StatusBadgeProps = {
  status: Status;
}

const statusMap = {
  todo: {
    label: 'Todo',
    className: 'bg-blue-300 text-gray-900'
  },
  doing: {
    label: 'In Progress',
    className: 'bg-orange-300 text-gray-900'
  },
  done: {
    label: 'Done',
    className: 'bg-green-300 text-gray-900'
  }
}

const StatusBadge = ({status}: StatusBadgeProps) => {
  const config = statusMap[status];

  return (
    <span className={`text-xs px-2 py-1 rounded-full ${config.className}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge