"use client"

import { useEffect, useState } from "react"

/**
 * SSR-safe media query hook. Returns false on the server and during the first
 * client paint, then updates once mounted to avoid hydration mismatches.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    const onChange = () => setMatches(mql.matches)
    onChange()
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [query])

  return matches
}

/** True once the component has mounted on the client. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted
}
