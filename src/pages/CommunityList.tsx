import { useState } from 'react';
import PostCard from '../components/CommunityList/PostCard';
import FilterBar from '../components/CommunityList/FilterBar';
import Pagination from '../components/CommunityList/Pagination';
import { useDummyPosts } from '../utils/useDummyPosts';
import { filterPosts } from '../utils/filterPosts';

export default function PostList() {
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [searchText] = useState('');
  const [page, setPage] = useState(1);

  const dummyPosts = useDummyPosts();
  const postsPerPage = 5;

  // 필터링
  const filteredPosts = filterPosts(dummyPosts, categoryFilter, searchText);

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
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </div>
  );
}
