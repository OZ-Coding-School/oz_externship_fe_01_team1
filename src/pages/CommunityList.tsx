import { useState } from 'react';
import PostCard from '../components/CommunityList/PostCard';
import type { Post } from '../types/post';
import FilterBar from '../components/CommunityList/FilterBar';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const dummyPosts: Post[] = [
  {
    id: '1',
    category: 'oz.영화',
    title: '🎬 영화 같이 볼 사람 구해요!',
    link: 'https://moviegroup.com/room1',
    likes: 34,
    comments: 10,
    views: 150,
    author: 'movieFan',
    authorAvatar: 'https://placehold.co/24x24',
    time: '1시간 전',
    thumbnail: 'https://placehold.co/120x90'
  },
  {
    id: '3',
    category: 'oz.음악',
    title: '공부할 때 듣기 좋은 플레이리스트 공유합니다.',
    link: 'https://example.com/playlist',
    likes: 5,
    comments: 1,
    views: 100,
    author: '이서윤',
    authorAvatar: 'https://placehold.co/24x24',
    time: '30분 전',
    thumbnail: '',
    content: '공부 집중용 음악 모음 공유해요!'
  },
  // ... 필요시 게시글 추가
];

export default function PostList() {
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [searchText] = useState('');
  const [page, setPage] = useState(1);

  const postsPerPage = 5;

  // 필터링
  const filteredPosts = dummyPosts
    .filter(post => categoryFilter === '전체' || post.category === categoryFilter)
    .filter(post => post.title.includes(searchText));

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

  // 현재 페이지에 보여줄 게시글
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  // 페이지가 totalPages 보다 크면 맞춰서 보정 (예: 필터 변경 시)
  if (page > totalPages) {
    setPage(totalPages);
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-semibold mb-6">커뮤니티</h2>

      {/* 필터 바 */}
      <FilterBar
        selected={categoryFilter}
        onSelect={(category) => {
          setCategoryFilter(category);
          // 페이지 유지하려면 setPage(1) 주석 처리
          // setPage(1);
        }}
      />

      <div className="mb-7" />

      <hr className="border-t border-gray-300 mb-6" />

      {/* 게시글 목록 */}
      <div className="space-y-6">
        {postsToShow.length > 0 ? (
          postsToShow.map(post => <PostCard key={post.id} post={post} />)
        ) : (
          <p className="text-center text-gray-500">게시물이 없습니다.</p>
        )}
      </div>

      {/* 페이지네이션 */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-2 mt-10">
          {/* 처음으로 */}
          <button
            className={`p-1 rounded ${page === 1 ? 'text-gray-400 cursor-default' : 'text-black hover:text-purple-600'}`}
            disabled={page === 1}
            onClick={() => setPage(1)}
            aria-label="처음으로"
          >
            <ChevronsLeft size={16} />
          </button>

          {/* 이전 페이지 */}
          <button
            className={`p-1 rounded ${page === 1 ? 'text-gray-400 cursor-default' : 'text-black hover:text-purple-600'}`}
            disabled={page === 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            aria-label="이전 페이지"
          >
            <ChevronLeft size={16} />
          </button>

          {/* 페이지 번호 */}
          {[...Array(totalPages)].map((_, i) => {
            const pageNumber = i + 1;
            const isCurrent = page === pageNumber;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                disabled={isCurrent}
                className={`w-8 h-8 text-sm rounded-md transition ${
                  isCurrent
                    ? 'bg-[#6201E0] text-white font-semibold cursor-default'
                    : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700 cursor-pointer'
                }`}
                aria-current={isCurrent ? 'page' : undefined}
                aria-label={`페이지 ${pageNumber}`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* 다음 페이지 */}
          <button
            className={`p-1 rounded ${page === totalPages ? 'text-gray-400 cursor-default' : 'text-black hover:text-purple-600'}`}
            disabled={page === totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            aria-label="다음 페이지"
          >
            <ChevronRight size={16} />
          </button>

          {/* 마지막으로 */}
          <button
            className={`p-1 rounded ${page === totalPages ? 'text-gray-400 cursor-default' : 'text-black hover:text-purple-600'}`}
            disabled={page === totalPages}
            onClick={() => setPage(totalPages)}
            aria-label="마지막으로"
          >
            <ChevronsRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
