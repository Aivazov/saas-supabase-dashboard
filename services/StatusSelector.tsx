// services/StatusSelector.tsx

import TodoListbox from '@/components/TodoListbox'
import { Status, STATUS_OPTIONS } from '@/constants/status'

type Props = {
  value: Status
  onChange: (value: Status) => void 
}

export function StatusSelector({ value, onChange }: Props) {
  return (
    <TodoListbox<Status>
      value={value}
      onChange={onChange}
      options={STATUS_OPTIONS}
    />
  )
}