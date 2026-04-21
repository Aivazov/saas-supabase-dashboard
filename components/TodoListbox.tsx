//components/TodoListbox.tsx

import { Fragment, useRef, useState } from 'react'
import { Listbox, Portal, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Option } from '@/constants/status';

type TodoListboxProps<T extends string>  = {
  value: T;
  onChange: (value: T) => void;
  options: readonly Option<T>[];
}

export default function TodoListbox<T extends string>({ value, onChange, options }: TodoListboxProps<T>) {
  const selectedOption = options.find(item => item.value === value)
  
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

  if (!selectedOption) {
    console.error('Invalid value:', value)
    return null
  }

  const handleChange = (option: Option<T>) => {
    onChange(option.value)
  }

  const updatePosition = () => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()

    setPosition({
      top: rect.bottom + 4,
      left: rect.left,
      width: rect.width,
    })
  }

  return (
    // <Listbox value={selectedOption} onChange={handleChange}>
    //   <div className="relative mt-1">
    //     <Listbox.Button
    //       className="relative w-full rounded-lg bg-gray-500 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm cursor-pointer"
    //     >
    //       <span className="block truncate">{selectedOption.name}</span>
    //       <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
    //         <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
    //       </span>
    //     </Listbox.Button>
    //     <Transition
    //       as={Fragment}
    //       leave="transition ease-in duration-100"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 sm:text-sm z-20">
    //         {options.map((option, idx) => (
    //           <Listbox.Option
    //             key={idx}
    //             className={({ active }) =>
    //               `relative cursor-default select-none py-2 pl-7 pr-4 ${
    //                 active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
    //               }`
    //             }
    //             value={option}
    //           >
    //             {({ selected }) => (
    //               <>
    //                 <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
    //                   {option.name}
    //                 </span>
    //                 {selected ? (
    //                   <span className="absolute inset-y-0 left-0 flex items-center pl-1 text-amber-600">
    //                     <CheckIcon className="h-5 w-5" aria-hidden="true" />
    //                   </span>
    //                 ) : null}
    //               </>
    //             )}
    //           </Listbox.Option>
    //         ))}
    //       </Listbox.Options>
    //     </Transition>
    //   </div>
    // </Listbox>

    <Listbox value={selectedOption} onChange={handleChange}>
      {({ open }) => (
        <>
          <div className="relative mt-1 min-w-[80px]">
            <Listbox.Button
              ref={buttonRef}
              onClick={updatePosition}
              className="relative w-full rounded-lg bg-gray-500 py-2 pl-3 pr-10 text-left shadow-md sm:text-sm cursor-pointer"
            >
              <span className="block truncate">{selectedOption.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-200" />
              </span>
            </Listbox.Button>
          </div>

          <Portal>
            <Transition
              show={open}
              as={Fragment}
              // leave="transition ease-in duration-100"
              // leaveFrom="opacity-100"
              // leaveTo="opacity-0"
              enter="transition duration-150 ease-out"
              enterFrom="opacity-0 scale-95 -translate-y-1"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition duration-100 ease-in"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 -translate-y-1"
            >
              <Listbox.Options
                style={{
                  position: 'fixed',
                  top: position.top,
                  left: position.left,
                  width: position.width,
                }}
                // className="origin-top max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-2xl ring-1 ring-black/10 sm:text-sm z-[9999]"
                className="origin-top max-h-60 overflow-auto rounded-md bg-white/90 backdrop-blur-md py-1 text-base shadow-2xl ring-1 ring-black/10 sm:text-sm z-[9999]"
              >
                {options.map((option, idx) => (
                  <Listbox.Option
                    key={idx}
                    value={option}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 pl-8 pr-4 transition-colors duration-100 ${
                      // `relative cursor-pointer select-none py-2 pl-8 pr-4 ${
                        active ? 'bg-cyan-100 text-cyan-900' : 'text-gray-900'
                      }`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {option.name}
                        </span>

                        {selected && (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-cyan-600">
                            <CheckIcon className="h-5 w-5" />
                          </span>
                        )}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Portal>
        </>
      )}
    </Listbox>
  )
}