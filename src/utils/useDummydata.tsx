import { useEffect, useState } from 'react';
import { dummyPosts } from '../mocks/postMockData'; // 실제 더미 데이터 경로에 맞게 수정
import type { Post } from '../types/post';

const STORAGE_KEY = 'oz_dummy_posts';

function getOrCreatePosts(): Post[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      // createdAt 또는 time을 Date 객체로 변환
      return JSON.parse(saved).map((post: Post) => ({
        ...post,
        time: post.time ? post.time : new Date().toISOString(),
      }));
    } catch {
      // 파싱 실패 시 새로 생성
    }
  }
  // time 필드가 없으면 지금 시간으로 생성
  const postsWithTime = dummyPosts.map((post: Post) => ({
    ...post,
    time: post.time ? post.time : new Date().toISOString(),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(postsWithTime));
  return postsWithTime;
}

export function useDummyPosts() {
  const [posts, setPosts] = useState<Post[]>(getOrCreatePosts());

  // 다른 탭에서 localStorage가 변경될 때 동기화
  useEffect(() => {
    const handleStorage = () => {
      setPosts(getOrCreatePosts());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // 게시글 추가/삭제/수정 시 호출
  const updatePosts = (newPosts: Post[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  return { posts, updatePosts };
}


