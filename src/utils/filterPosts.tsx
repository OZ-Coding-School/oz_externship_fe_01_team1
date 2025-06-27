import type { Post } from '../types';

export function filterPosts(posts: Post[], category: string, searchText: string) {
  return posts
    .filter(post => category === '전체' || post.category === category)
    .filter(post => post.title.includes(searchText));
}