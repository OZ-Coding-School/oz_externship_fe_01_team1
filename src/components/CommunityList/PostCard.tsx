import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import type { Post } from '../../types/post';

interface PostCardProps {
  post: Post;
  nocardborder?: boolean;
}

export default function PostCard({ post, nocardborder }: PostCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link to={`/CommunityList/CommunityDetail/${post.id}`}>
      <div
        className={`flex justify-between items-start p-4 rounded-md ${
          nocardborder ? '' : 'border border-white'
        } hover:bg-purple-50 transition-colors`}
      >
        {/* ✅ 왼쪽: 텍스트 영역 (카테고리+제목+링크+메타) */}
        <div className="flex flex-col justify-between flex-1 h-[154px]">
          {/* 카테고리, 제목, 링크 묶음 */}
          <div className="flex flex-col gap-[20px]">
            <p className="text-sm text-gray-400">{post.category}</p>
            <h2 className="text-base font-semibold text-black">{post.title}</h2>
            <p className="text-sm text-gray-500 break-all">{post.link}</p>
          </div>

          {/* 좋아요/댓글/조회수 + 작성자 */}
          <div className="flex flex-wrap items-center gap-1 text-xs text-gray-500">
            <span
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                setLiked((prev) => !prev);
              }}
            >
              <FaThumbsUp />
              좋아요 {post.likes + (liked ? 1 : 0)}
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
              <span className="text-gray-400 text-[11px] ml-1">{post.time}</span>
            </div>
          </div>
        </div>

        {/* ✅ 오른쪽: 썸네일 이미지 */}
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
