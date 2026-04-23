import { Option } from '@/types/status';
import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { RefObject } from 'react'

type DropdownBtnProps<T extends string> = {
  buttonRef: RefObject<HTMLButtonElement | null>;
  updatePosition: () => void;
  selectedOption: Option<T>;
}

const DropdownBtn = <T extends string>({
  buttonRef,
  updatePosition,
  selectedOption,
}: DropdownBtnProps<T>) => {
  return (
    <Listbox.Button
      ref={buttonRef}
      onClick={updatePosition}
      className="relative w-full rounded-xl bg-zinc-800/50 border border-zinc-700 py-2 pl-3 pr-8 text-left text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
    >
      <span className="block truncate">{selectedOption.name}</span>
      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <ChevronUpDownIcon className="h-4 w-4 text-zinc-500" />
      </span>
    </Listbox.Button>
  )
}

export default DropdownBtn