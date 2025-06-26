import { useState, useEffect } from 'react'
import { commentsMockData } from '../components/commnunityDetail/mockData'
import type { commentData } from '../types'

export const useSortComments = (initialOption: string) => {
  const [comments, setComments] = useState<commentData[]>(commentsMockData)
  const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false)
  const [selectedSort, setSelectedSort] = useState<string>(initialOption)

  useEffect(() => {
    const sorted = [...commentsMockData].sort((a, b) => {
      const timeA = new Date(a.date).getTime()
      const timeB = new Date(b.date).getTime()

      return selectedSort === '최신순' ? timeB - timeA : timeA - timeB
    })
    setComments(sorted)
  }, [selectedSort])

  return {
    comments,
    sortDropdownOpen,
    selectedSort,
    setSortDropdownOpen,
    setSelectedSort,
  }
}
