import type { CommentsData } from '@customType/communityDetail'
import { useState, useEffect } from 'react'

export const useSortComments = (initialOption: string) => {
  const [comments, setComments] = useState<CommentsData[]>([])
  const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false)
  const [selectedSort, setSelectedSort] = useState<string>(initialOption)

  useEffect(() => {
    const sorted = [...comments].sort((a, b) => {
      const timeA = new Date(a.created_at).getTime()
      const timeB = new Date(b.created_at).getTime()

      return selectedSort === '최신순' ? timeB - timeA : timeA - timeB
    })
    setComments(sorted)
  }, [selectedSort])

  return {
    comments,
    setComments,
    sortDropdownOpen,
    selectedSort,
    setSortDropdownOpen,
    setSelectedSort,
  }
}
