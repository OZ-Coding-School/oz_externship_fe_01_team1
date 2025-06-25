import { useEffect, useState } from 'react';
import { dummyPosts } from '../mocks/useDummyposts';
import type { Post } from '../types/post';

const DUMMY_POSTS_KEY = 'oz_dummy_posts';

function getOrCreateDummyPosts(): Post[] {
  const saved = localStorage.getItem(DUMMY_POSTS_KEY);
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      // 파싱 실패 시 새로 생성
    }
  }
  localStorage.setItem(DUMMY_POSTS_KEY, JSON.stringify(dummyPosts));
  return dummyPosts;
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
    localStorage.setItem(DUMMY_POSTS_KEY, JSON.stringify(newPosts));
    setPosts(newPosts);
  };

  return { posts, updatePosts };
}

useDummyPosts();

