// features/tasks/components/TasksDropdown/TasksDropdown.tsx

// 'use client'
import { Fragment } from 'react'
import { Listbox, Portal, Transition } from '@headlessui/react'
import { Option } from '@/types/status';
import { useDropdownPosition } from '../../hooks/use-dropdown-position';
import DropdownItem from './DropdownItem';
import DropdownBtn from './DropdownBtn';

type TasksDropdownProps<T extends string>  = {
  value: T;
  onChange: (value: T) => void;
  options: readonly Option<T>[];
}

export default function TasksDropdown<T extends string>({
  value,
  onChange,
  options
}: TasksDropdownProps<T>) {
  const { buttonRef, position, updatePosition } = useDropdownPosition();
  const selectedOption = options.find(item => item.value === value)

  if (!selectedOption) return null;

  const handleChange = (option: Option<T>) => {
    onChange(option.value)
  }

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1 min-w-[100px]">

            <DropdownBtn
              buttonRef={buttonRef}
              updatePosition={updatePosition}
              selectedOption={selectedOption}
            />
          </div>

          <Portal>
            <Transition
              show={open}
              as={Fragment}
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0 scale-95 -translate-y-1"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition duration-100 ease-in"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 -translate-y-1"
            >

              <Listbox.Options
                style={{ top: position.top, left: position.left, width: position.width }}
                className="fixed mt-1 max-h-60 overflow-auto rounded-xl bg-zinc-900 border border-zinc-800 py-1 text-sm shadow-2xl z-[9999] backdrop-blur-xl"
              >
                {options.map((option, idx) => (
                  <DropdownItem key={idx} option={option} />
                ))}
              </Listbox.Options>
            </Transition>
          </Portal>
        </>
      )}
    </Listbox>
  )
}