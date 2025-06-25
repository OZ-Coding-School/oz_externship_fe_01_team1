import { useRef } from 'react';
import { dummyPosts } from '../mocks/dummyposts';
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
  const dummyPostsRef = useRef<Post[]>(getOrCreateDummyPosts());
  return dummyPostsRef.current;
}