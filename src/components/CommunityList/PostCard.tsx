// src/components/PostCard.tsx
import React from 'react';
import type { Post } from '../../types/post';
import { Link } from 'react-router-dom';

interface PostCardProps {
  post: Post;
}

// 멘션 하이라이트 유틸 함수
function highlightMentions(text: string) {
  const mentionRegex = /(@\w+)/g;
  return text.split(mentionRegex).map((part, idx) => {
    if (mentionRegex.test(part)) {
      return (
        <span key={idx} className="text-purple-500 font-semibold">
          {part}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link to={`/posts/${post.id}`} className="block px-6 py-5 hover:bg-[#f7f2ff] transition">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-full">
          <span className="text-xs text-gray-400">{post.category}</span>

          <p className="text-sm font-medium text-black break-all">
            {highlightMentions(post.title)}
          </p>

          <a
            href={post.link}
            className="text-xs text-gray-500 break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {post.link}
          </a>

          <div className="flex gap-4 text-xs text-gray-500 mt-2">
            <span>👍 좋아요 {post.likes}</span>
            <span>💬 댓글 {post.comments}</span>
            <span>👁️ 조회수 {post.views}</span>
          </div>
        </div>

        {post.thumbnail && (
          <img
            src={post.thumbnail}
            alt="썸네일"
            className="w-24 h-20 object-cover rounded ml-4 shrink-0"
          />
        )}
      </div>

      <div className="flex items-center gap-2 text-xs text-gray-500 mt-4">
        <img
          src={post.authorAvatar || 'https://placehold.co/24x24'}
          alt="author"
          className="w-6 h-6 rounded-full"
        />
        <span className="font-medium text-black">{post.author}</span>
        <span>{post.time}</span>
      </div>
    </Link>
  );
}