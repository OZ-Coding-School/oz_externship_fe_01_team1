import type { Post } from '../types/post';

export const dummyPosts: Post[] = [
  {
    id: '1',
    createdAt: new Date().toISOString(),
    category: '프론트엔드',
    title: 'React로 나만의 블로그 만들기 스터디 모집',
    link: 'https://frontend.com/study1',
    likes: 21,
    comments: 4,
    views: 88,
    author: 'frontendDev',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: 'https://placehold.co/120x90',
    content: '프론트엔드 스터디원 구합니다! React, TypeScript 환영'
  },
  {
    id: '2',
    createdAt: new Date().toISOString(),
    category: '백엔드',
    title: 'Node.js 백엔드 개발자 모임',
    link: 'https://backend.com/group',
    likes: 13,
    comments: 2,
    views: 54,
    author: 'backendLee',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: 'Node.js, Express 관심 있는 분들 환영합니다!'
  },
  {
    id: '3',
    createdAt: new Date().toISOString(),
    category: '프로그래밍 언어',
    title: 'Python 입문 스터디',
    link: 'https://pythonstudy.com',
    likes: 30,
    comments: 7,
    views: 120,
    author: 'pyKim',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: '파이썬 기초부터 함께 공부해요!'
  },
  {
    id: '4',
    createdAt: new Date().toISOString(),
    category: '인프라',
    title: 'AWS 기초 세미나',
    link: 'https://infra.com/aws',
    likes: 8,
    comments: 1,
    views: 40,
    author: 'infraPark',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: 'AWS 인프라 기초 세미나 참가자 모집'
  },
  {
    id: '5',
    createdAt: new Date().toISOString(),
    category: 'Python',
    title: 'Python으로 데이터 분석 시작하기',
    link: 'https://python.com/data',
    likes: 17,
    comments: 3,
    views: 77,
    author: 'dataKim',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: '데이터 분석에 관심 있는 분들 함께해요!'
  },
  {
    id: '6',
    createdAt: new Date().toISOString(),
    category: 'React',
    title: 'React Hooks 완전 정복',
    link: 'https://react.com/hooks',
    likes: 25,
    comments: 5,
    views: 99,
    author: 'reactPark',
    authorAvatar: 'https://placehold.co/24x24',
    time: new Date().toISOString(),
    thumbnail: '',
    content: 'React Hooks에 대해 깊이 있게 공부합니다.'
  },
  // ... 필요시 게시글 추가
];

localStorage.removeItem('oz_dummy_posts');