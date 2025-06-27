import { useEffect, useState } from 'react';
import { dummyPosts } from '../mocks/postMockData';
import type { Post } from '../types/post';

const DUMMY_POSTS_KEY = 'oz_dummy_posts';

function getOrCreateDummyPosts(): Post[] {
  // 개발 중에는 항상 최신 mock 데이터를 반영 (배포 전에는 주석 처리!)
  localStorage.removeItem(DUMMY_POSTS_KEY);

  const saved = localStorage.getItem(DUMMY_POSTS_KEY);
  if (saved) {
    try {
      // 날짜(Date)는 문자열로 저장되어 있으므로, 객체로 변환
      const parsed = JSON.parse(saved).map((post: Post) => ({
        ...post,
        createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
      }));
      return parsed;
    } catch {
      // 파싱 실패 시 새로 생성
    }
  }
  // dummyPosts의 createdAt도 Date 객체로 변환
  const postsWithDate = dummyPosts.map((post: Post) => ({
    ...post,
    createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
  }));
  localStorage.setItem(DUMMY_POSTS_KEY, JSON.stringify(postsWithDate));
  return postsWithDate;
}

export function useDummyPosts() {
  const [posts, setPosts] = useState<Post[]>(getOrCreateDummyPosts());

  // 다른 탭에서 localStorage가 변경될 때 동기화
  useEffect(() => {
    const handleStorage = () => {
      setPosts(getOrCreateDummyPosts());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // 게시글 추가/삭제/수정 시 호출
  const updatePosts = (newPosts: Post[]) => {
    // createdAt이 Date 객체라면 문자열로 변환해서 저장
    const postsToSave = newPosts.map(post => ({
      ...post,
      createdAt: post.createdAt instanceof Date ? post.createdAt.toISOString() : post.createdAt,
    }));
    localStorage.setItem(DUMMY_POSTS_KEY, JSON.stringify(postsToSave));
    setPosts(newPosts);
  };

  return { posts, updatePosts };
}
// Post interface is now imported from '../types/post'


