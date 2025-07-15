import { useState, useEffect } from 'react'
import PostCard from '../components/CommunityList/PostCard'
import FilterBar from '../components/CommunityList/FilterBar'
import Pagination from '../components/CommunityList/Pagination'
// import { filterPosts } from '../utils/filterPosts'
import api from '../api/mainApi'
import type { CommunityListResponse } from '@customType/communityList'

function CommunityListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        w-[944px] 
        mx-auto
        pt-[80px]
        px-0
        rounded-none
        opacity-100
      "
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
    </div>
  )
}

export default function PostList() {
  const [response, setResponse] = useState<CommunityListResponse | null>(null)
  const [loading, setLoading] = useState(true)
  // const [error, setError] = useState<string | null>(null)

  const [categoryFilter, setCategoryFilter] = useState('전체')
  // const [searchText] = useState('')
  const [page, setPage] = useState(1)

  // ✅ API 호출
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response: CommunityListResponse = await api.get(
          `api/v1/community/posts/list?page=${page}&size=10`
        )
        console.log('response', response)
        setResponse(response)
      } catch (err) {
        console.error('fetchPosts 에러:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [page])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!response) return
  return (
    <div className="flex items-center justify-center min-h-screen">
      <CommunityListLayout>
        <h2 className="mb-6 text-2xl font-semibold">커뮤니티</h2>
        {/* 필터 바 */}
        <FilterBar
          selected={categoryFilter}
          onSelect={(category) => {
            setCategoryFilter(category)
          }}
        />
        {/* 경계선 */}
        <hr className="my-3 border-t border-gray-300" />
        {/* 게시글 목록 */}
        <div className="space-y-6">
          {response.data.results.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {response.data.count > 0 && !loading && (
          <Pagination
            page={page}
            totalPages={Math.floor(response.data.count / 10)}
            onPageChange={setPage}
          />
        )}
      </CommunityListLayout>
    </div>
  )
}
