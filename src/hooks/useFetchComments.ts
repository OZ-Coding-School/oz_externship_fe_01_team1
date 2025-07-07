import { useState, useRef, type Dispatch, type SetStateAction } from 'react'
import { commentsMockData } from '@components/commnunityDetail/mockData'
import type { commentData } from '@customType/communityDetail'

const loadingTime = 1000

export const useFetchComments = (
  setComments: Dispatch<SetStateAction<commentData[]>>
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)
  const isFetchingRef = useRef(false)

  const fetchComments = () => {
    if (isLoading || !hasNext || isFetchingRef.current) return

    setIsLoading(true)
    isFetchingRef.current = true

    setTimeout(() => {
      setComments((prev) => {
        const currentLength = prev.length
        const nextBatch = commentsMockData.slice(
          currentLength,
          currentLength + 10
        )

        setHasNext(
          nextBatch.length === 10 &&
            currentLength + nextBatch.length < commentsMockData.length
        )

        return [...prev, ...nextBatch]
      })

      setIsLoading(false)
      isFetchingRef.current = false
    }, loadingTime)
  }

  return { fetchComments, hasNext, setHasNext, isLoading }
}
