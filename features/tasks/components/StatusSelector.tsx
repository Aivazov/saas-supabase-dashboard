// features/tasks/components/StatusSelector.tsx

import TasksDropdown from '@/features/tasks/components/TasksDropdown'
import { Status, STATUS_OPTIONS } from '@/constants/status'

type Props = {
  value: Status
  onChange: (value: Status) => void 
}

export function StatusSelector({ value, onChange }: Props) {
  return (
    <TasksDropdown<Status>
      value={value}
      onChange={onChange}
      options={STATUS_OPTIONS}
    />
  )
}