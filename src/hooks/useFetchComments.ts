import { useState, useRef, type Dispatch, type SetStateAction } from 'react'
import type { CommentsData } from '@customType/communityDetail'

const loadingTime = 1000

export const useFetchComments = (
  setComments: Dispatch<SetStateAction<CommentsData[]>>,
  fetchCommentsData: CommentsData[]
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
        const nextBatch = fetchCommentsData.slice(
          currentLength,
          currentLength + 10
        )

        setHasNext(
          nextBatch.length === 10 &&
            currentLength + nextBatch.length < fetchCommentsData.length
        )

        return [...prev, ...nextBatch]
      })

      setIsLoading(false)
      isFetchingRef.current = false
    }, loadingTime)
  }

  return { fetchComments, hasNext, setHasNext, isLoading }
}
