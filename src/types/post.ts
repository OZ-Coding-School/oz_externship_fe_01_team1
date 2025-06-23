export interface Post {
  id: string;
  category: string;
  title: string;
  link: string;
  likes: number;
  comments: number;
  views: number;
  author: string;
  authorAvatar: string;
  time: string; // ISO or "1시간 전" 등
  thumbnail?: string;
  content?:string
}
