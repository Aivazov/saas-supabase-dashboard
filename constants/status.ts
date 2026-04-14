// constants/status.ts
export type Option<T extends string> = {
  value: T
  name: string
}

export const STATUS_OPTIONS: readonly Option<'todo' | 'doing' | 'done'>[] = [
  { value: 'todo', name: 'Todo' },
  { value: 'doing', name: 'Doing' },
  { value: 'done', name: 'Done' },
]

export type Status = typeof STATUS_OPTIONS[number]['value']

export const FILTER_OPTIONS: readonly Option<Status | 'all'>[] = [
  { value: 'all', name: 'All' },
  ...STATUS_OPTIONS,
]

export type FilterValue = Status | 'all'