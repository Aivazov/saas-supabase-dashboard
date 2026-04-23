// features/tasks/hooks/use-dropdown-position.ts

import { useCallback, useRef, useState } from "react"

export const useDropdownPosition = () => {
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 })

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()

    setPosition({
      top: rect.bottom + window.scrollY + 4,
      left: rect.left + window.scrollX,
      width: rect.width,
    });
    // setPosition({
    //   top: rect.bottom + 4,
    //   left: rect.left,
    //   width: rect.width,
    // })
  }, [])

  return {
    buttonRef,
    position,
    updatePosition
  }
}