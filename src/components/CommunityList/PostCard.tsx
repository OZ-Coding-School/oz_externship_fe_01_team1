import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import type { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
  nocardborder?: boolean;
}

// ✅ "~초 전, ~분 전, ~시간 전, ~일 전" 형태의 상대 시간 포맷
function formatRelativeTime(timestamp: string): string {
  if (!timestamp) return '시간 없음';

  const postTime = new Date(timestamp);
  if (isNaN(postTime.getTime())) return '잘못된 시간';

  const now = new Date();
  const diff = Math.floor((now.getTime() - postTime.getTime()) / 1000); // 초 단위

  
  if (diff < 60) return `${diff}초 전`;
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;
  return `${Math.floor(diff / 86400)}일 전`;
}

export default function PostCard({ post, nocardborder }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked((prev) => !prev);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <Link to={`/CommunityList/CommunityDetail/${post.id}`}>
      <div
        className={`flex justify-between items-start p-4 rounded-md ${
          nocardborder ? '' : 'border border-white'
        } hover:bg-purple-50 transition-colors`}
      >
        {/* 왼쪽: 카테고리, 제목, 링크 */}
        <div className="flex flex-col justify-between flex-1 h-[154px]">
          <div className="flex flex-col gap-[20px]">
            <p className="text-sm text-gray-400">{post.category}</p>
            <h2 className="text-base font-semibold text-black">{post.title}</h2>
            <p className="text-sm text-gray-500 break-all">{post.link}</p>
          </div>

          {/* 좋아요, 댓글, 조회수, 작성자 */}
          <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleLike}
            >
              <FaThumbsUp className={liked ? 'text-blue-500' : 'text-gray-400'} />
              좋아요 {likes}
            </span>
            <span>댓글 {post.comments}</span>
            <span>조회수 {post.views}</span>

            <div className="flex items-center gap-1 ml-auto">
              {post.authorAvatar && (
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="w-5 h-5 rounded-full"
                />
              )}
              <span className="text-black">{post.author}</span>
              <span className="text-gray-400 text-[11px] ml-1">
                {formatRelativeTime(post.time)}
              </span>
            </div>
          </div>
        </div>

        {/* 오른쪽: 썸네일 */}
        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="썸네일"
            className="w-[120px] h-[90px] rounded-md object-cover ml-4"
          />
        )}
      </div>
    </Link>
  );
}
