import { useState, useRef, useEffect } from 'react'

type Timer = ReturnType<typeof setTimeout>
type SomeFunction = (...args: any[]) => void
/**
 *
 * @param func The original, non debounced function (You can pass any number of args to it)
 * @param delay The delay (in ms) for the function to return
 * @returns The debounced function, which will run only if the debounced function has not been called in the last (delay) ms
 */

export function useDebounce<Func extends SomeFunction>(func: Func, delay = 1000) {
  const timer = useRef<Timer>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    return () => {
      if (!timer.current) return
      clearTimeout(timer.current)
    }
  }, [])

  const debouncedFunction = ((...args) => {
    setLoading(true)
    const newTimer = setTimeout(() => {
      func(...args)
      setLoading(false)
    }, delay)
    clearTimeout(timer.current)
    timer.current = newTimer
  }) as Func

  return { debouncedFunction, loading }
}
