import { useState, useEffect } from 'react';
import PostCard from '../components/CommunityList/PostCard';
import FilterBar from '../components/CommunityList/FilterBar';
import Pagination from '../components/CommunityList/Pagination';
import { filterPosts } from '../utils/filterPosts';
import api from '../api/mainApi';

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
  );
}

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [searchText] = useState('');
  const [page, setPage] = useState(1);
  const postsPerPage = 5;

  // ✅ API 호출
 useEffect(() => {
  const fetchPosts = async () => {
    try {
      const response = await api.get(`api/v1/community/posts/list`)
      setPosts(response.data.results); // API 응답에서 데이터 추출
console.log('Fetched posts:', response); // 디버깅용 로그
      // 1. HTTP 상태 확인
      //if (!response.ok) {
        //const errorText = await response.text(); // HTML일 수 있음
        //console.error('서버 오류 응답:', errorText);
        //throw new Error('데이터를 불러오지 못했습니다.');
      //}

      // 2. Content-Type이 JSON인지 확인
      // const contentType = response.headers.get('Content-Type');
      // if (!contentType || !contentType.includes('application/json')) {
      //   const errorText = await response.text(); // HTML 페이지일 가능성
      //   console.error('예상치 못한 응답 형식:', errorText);
      //   throw new Error('JSON이 아닌 응답을 받았습니다.');
      // }

      // 3. JSON 파싱
      //setPosts(response.results);
      
    } catch (err: any) {
      console.error('fetchPosts 에러:', err);
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, []);

  // 필터링
  const filteredPosts = filterPosts(posts, categoryFilter, searchText);
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));

  // 현재 페이지에 보여줄 게시글
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const postsToShow = filteredPosts.slice(startIndex, endIndex);

  // 페이지가 totalPages 보다 크면 맞춰서 보정
  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [filteredPosts, page, totalPages]);

  // 상세페이지 이동 시 스크롤 Top:0 적용
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <CommunityListLayout>
        <h2 className="text-2xl font-semibold mb-6">커뮤니티</h2>

        {/* 필터 바 */}
        <FilterBar
          selected={categoryFilter}
          onSelect={(category) => {
            setCategoryFilter(category);
            // setPage(1); // 필터 변경 시 페이지 초기화하려면 사용
          }}
        />

        {/* 경계선 */}
        <hr className="border-t border-gray-300 my-3" />

        {/* 게시글 목록 */}
        <div className="space-y-6">
          {loading ? (
            <p className="text-center text-gray-500">로딩 중...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : postsToShow.length > 0 ? (
            postsToShow.map((post) => <PostCard key={post.id} post={post} />)
          ) : (
            <p className="text-center text-gray-500">못 찾겠다 꾀꼬리~</p>
          )}
        </div>

        {/* 페이지네이션 */}
        {totalPages > 0 && !loading && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
      </CommunityListLayout>
    </div>
  );
}
