// services/StatusFilter.tsx
import TodoListbox from '@/components/TodoListbox'
import { FILTER_OPTIONS, FilterValue } from '@/constants/status'

type Props = {
  value: FilterValue
  onChange: (value: FilterValue) => void
}

export function StatusFilter({ value, onChange }: Props) {
  return (
    <TodoListbox<FilterValue>
      value={value}
      onChange={onChange}
      options={FILTER_OPTIONS}
    />
  )
}
