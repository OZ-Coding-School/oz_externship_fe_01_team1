import React from 'react';
import { Link } from 'react-router-dom'; // 주의: react-router-dom 사용
import type { Post } from '../types/post';
import PostCard from '../components/CommunityList/PostCard';

const dummyPosts: Post[] = [
  {
    id: '1',
    category: '예시 카테고리',
    title: '러닝 메이트 함께해요.',
    link: 'https://www.codeit.kr/costudy/join/684e26b75155062e46211e77',
    likes: 2,
    comments: 2,
    views: 60,
    author: '김태산',
    authorAvatar: 'https://placehold.co/24x24',
    time: '1시간 전',
    thumbnail: 'https://placehold.co/120x90',
    content: ''
  },
  {
    id: '2',
    category: '프로젝트 모집',
    title: '같이 사이드 프로젝트 하실 분!',
    link: 'https://www.example.com/project',
    likes: 10,
    comments: 5,
    views: 123,
    author: '홍길동',
    authorAvatar: '',
    time: '3시간 전',
    thumbnail: '',
    content: ''
  },
];

export default function CommunityList() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-[30px] font-bold mb-6">커뮤니티 목록 페이지</h1>

      {/* 내부 페이지 링크 */}
      <div className="flex gap-4 mb-6 text-blue-600 underline">
        <Link to="/CommunityList/CommunityDetail">커뮤니티 상세페이지 이동</Link>
        <Link to="/CommunityList/CommunityPost">글작성 페이지 이동</Link>
        <Link to="/CommunityList/CommunityEdit">글수정 페이지 이동</Link>
      </div>

      {/* 게시글 리스트 */}
      <div className="space-y-4">
        {dummyPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-8 space-x-2 text-sm text-gray-500">
        <button>&lt;&lt;</button>
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`px-2 py-1 rounded ${page === 1 ? 'text-purple-600 font-bold' : ''}`}
          >
            {page}
          </button>
        ))}
        <button>&gt;&gt;</button>
      </div>
    </div>
  );
}
