// hooks/useIntersectionObserver.ts
import { useCallback } from 'react'

interface UseIntersectionObserverProps {
  isLoading: boolean
  hasNext: boolean
  onIntersect: () => void
  threshold?: number
}

export function useIntersectionObserver({
  isLoading,
  hasNext,
  onIntersect,
  threshold = 0.1,
}: UseIntersectionObserverProps) {
  const observerRef = useCallback(
    (node: HTMLElement | null) => {
      if (!node) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading && hasNext) {
            onIntersect()
          }
        },
        { threshold }
      )

      observer.observe(node)
    },
    [isLoading, hasNext, onIntersect, threshold]
  )

  return observerRef
}
