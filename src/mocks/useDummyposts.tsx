import type { Post } from '../types/post';

export const dummyPosts: Post[] = [
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
    time: new Date().toISOString(),
    thumbnail: 'https://placehold.co/120x90'
  },
  {
    id: '2',
    category: 'oz.음악',
    title: '공부할 때 듣기 좋은 플레이리스트 공유합니다.',
    link: 'https://example.com/playlist',
    likes: 5,
    comments: 1,
    views: 100,
    author: '이서윤',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: '공부 집중용 음악 모음 공유해요!'
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
    time: new Date().toISOString(),
    thumbnail: '',
    content: '공부 집중용 음악 모음 공유해요!'
  },
  {
    id: '4',
    category: 'oz.음악',
    title: '공부할 때 듣기 좋은 플레이리스트 공유합니다.',
    link: 'https://example.com/playlist',
    likes: 5,
    comments: 1,
    views: 100,
    author: '이서윤',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: '공부 집중용 음악 모음 공유해요!'
  },
  {
    id: '5',
    category: 'oz.음악',
    title: '공부할 때 듣기 좋은 플레이리스트 공유합니다.',
    link: 'https://example.com/playlist',
    likes: 5,
    comments: 1,
    views: 100,
    author: '이서윤',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: '공부 집중용 음악 모음 공유해요!'
  },
  {
    id: '6',
    category: 'oz.음악',
    title: '공부할 때 듣기 좋은 플레이리스트 공유합니다.',
    link: 'https://example.com/playlist',
    likes: 5,
    comments: 1,
    views: 100,
    author: '이서윤',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: '공부 집중용 음악 모음 공유해요!'
  },
  // ... 필요시 게시글 추가
];