// features/tasks/components/StatusFilter.tsx

import TasksDropdown from '@/features/tasks/components/TaskDropdown/TasksDropdown'
import { FILTER_OPTIONS, FilterValue } from '@/types/status'

type Props = {
  value: FilterValue
  onChange: (value: FilterValue) => void
}

export function StatusFilter({ value, onChange }: Props) {
  return (
    <TasksDropdown<FilterValue>
      value={value}
      onChange={onChange}
      options={FILTER_OPTIONS}
    />
  )
}
