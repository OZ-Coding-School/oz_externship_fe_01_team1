import { useState, type Dispatch, type SetStateAction } from 'react'
import { useSortComments } from './useSortComments'
import { commentsMockData } from '@components/commnunityDetail/mockData'
import type { commentData } from '@customType/communityDetail'

const loadingTime = 1000

export const useFetchComments = (
  comments: commentData[],
  setComments: Dispatch<SetStateAction<commentData[]>>
) => {
  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  const fetchComments = () => {
    if (isLoading || !hasNext) return

    setIsLoading(true)

    setTimeout(() => {
      const currentLength = comments.length
      const nextBatch = commentsMockData.slice(
        currentLength,
        currentLength + 10
      )

      setComments((prev) => [...prev, ...nextBatch])
      setHasNext(
        nextBatch.length === 10 &&
          currentLength + nextBatch.length < commentsMockData.length
      )

      setIsLoading(false)
    }, loadingTime) // debounce 역할도 겸함
  }

  return { fetchComments, hasNext, setHasNext, isLoading }
}
