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
  time: string; 
  thumbnail?: string;
  content?:string
}
