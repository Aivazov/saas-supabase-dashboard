//components/TodoListbox.tsx

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Option } from '@/constants/status';

type TodoListboxProps<T extends string>  = {
  value: T;
  onChange: (value: T) => void;
  options: readonly Option<T>[];
}

export default function TodoListbox<T extends string>({ value, onChange, options }: TodoListboxProps<T>) {
  const selectedOption = options.find(item => item.value === value)

  if (!selectedOption) {
    console.error('Invalid value:', value)
    return null
  }

  const handleChange = (option: Option<T>) => {
    onChange(option.value)
  }

  return (
    <Listbox value={selectedOption} onChange={handleChange}>
      <div className="relative mt-1">
        <Listbox.Button
          className="relative w-full rounded-lg bg-gray-500 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm cursor-pointer"
        >
          <span className="block truncate">{selectedOption.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm z-20">
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-7 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                      {option.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
}