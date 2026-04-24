// features/tasks/components/StatusSelector.tsx

import TasksDropdown from '@/features/tasks/components/TaskDropdown/TasksDropdown'
import { Status, STATUS_OPTIONS } from '@/types/status'

type StatusSelectorProps = {
  value: Status
  onChange: (value: Status) => void 
}

export function StatusSelector({ value, onChange }: StatusSelectorProps) {
  return (
    <TasksDropdown<Status>
      value={value}
      onChange={onChange}
      options={STATUS_OPTIONS}
    />
  )
}