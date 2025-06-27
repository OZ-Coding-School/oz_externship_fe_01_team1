import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaThumbsUp } from 'react-icons/fa';
import type { Post } from '../../types/post';
import { formatRelativeTime } from '../../utils/formatRelativeTime';

interface PostCardProps {
  post: Post;
  nocardborder?: boolean;
}

export default function PostCard({ post, nocardborder }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked((prev) => !prev);
    setLikes((prev: number) => (liked ? prev - 1 : prev + 1));
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
            className="w-[228px] h-[163px] min-w-[228px] min-h-[163px] max-w-[228px] max-h-[163px] rounded-md object-cover ml-4"
          />
        )}
      </div>
    </Link>
  );
}
