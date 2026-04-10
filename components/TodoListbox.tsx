import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Status } from '@/types/components';

interface StatusOption {
  value: Status;
  name: string;
}

interface StatusOptionProps {
  value: Status;
  onChange: (value: Status) => void;
}

const list: StatusOption[] = [
  { value: 'todo', name: 'Todo' },
  { value: 'doing', name: 'Doing' },
  { value: 'done', name: 'Done' }
]

export default function TodoListbox({value, onChange}: StatusOptionProps) {
  // const [selected, setSelected] = useState(list[0])
  const selectedOption = list.find(item => item.value === value) || list[0];
  const handleChange = (option: StatusOption) => {
    onChange(option.value);
  };

  return (
      <Listbox value={selectedOption} onChange={handleChange}>
        <div className="relative mt-1">
          <Listbox.Button
            className="relative w-full rounded-lg bg-gray-500 py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm z-0 cursor-pointer"
          >
            <span className="block truncate">{selectedOption.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm z-20">
              {list.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-7 pr-4 ${
                      active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
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
