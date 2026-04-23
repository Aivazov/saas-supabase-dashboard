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

  // const updatePosition = () => {
  //   if (!buttonRef.current) return
  //   const rect = buttonRef.current.getBoundingClientRect()

  //   setPosition({
  //     top: rect.bottom + 4,
  //     left: rect.left,
  //     width: rect.width,
  //   })
  // }

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
            {/* <Listbox.Button
              ref={buttonRef}
              onClick={updatePosition}
              className="relative w-full rounded-xl bg-zinc-800/50 border border-zinc-700 py-2 pl-3 pr-8 text-left text-xs font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer"
            >
              <span className="block truncate">{selectedOption.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-4 w-4 text-zinc-500" />
              </span>
            </Listbox.Button> */}
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
                  // <Listbox.Option
                  //   key={idx}
                  //   value={option}
                  //   className={({ active, selected }) => `
                  //     relative cursor-pointer select-none py-2 pl-9 pr-4 transition-colors
                  //     ${active ? 'bg-zinc-800 text-cyan-400' : 'text-zinc-400'}
                  //     ${selected ? 'text-cyan-400 font-semibold' : ''}
                  //   `}
                  // >
                  //   {({ selected }) => (
                  //     <>
                  //       {selected && (
                  //         <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-500">
                  //           <CheckIcon className="h-4 w-4" />
                  //         </span>
                  //       )}
                  //       <span className="block truncate">{option.name}</span>
                  //     </>
                  //   )}
                  // </Listbox.Option>
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