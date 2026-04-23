// features/tasks/components/TasksDropdown/DropdownItem.tsx

import { Option } from '@/types/status';
import { Listbox } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

type DropdownItemProps<T extends string> = {
  option: Option<T>;
}

const DropdownItem = <T extends string>({ option }: DropdownItemProps<T>) => {
  return (
    <Listbox.Option
      value={option}
      className={({ active, selected }) => `
        relative cursor-pointer select-none py-2 pl-9 pr-4 transition-colors
        ${active ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-400'}
        ${selected ? 'text-cyan-400 font-semibold' : ''}
      `}
    >
      {({ selected }) => (
        <>
          {selected && (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-500">
              <CheckIcon className="h-4 w-4" />
            </span>
          )}
          <span className="block truncate">{option.name}</span>
        </>
      )}
    </Listbox.Option>
  );
}

export default DropdownItem