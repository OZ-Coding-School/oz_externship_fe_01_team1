import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface PostData {
  title: string;
  mainCat: string;
  subCat: string;
  detailCat: string;
  markdown: string;
  createdAt: string;
}

export default function CommunityDetail() {
  const [post, setPost] = useState<PostData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('communityPost');
    if (saved) {
      const parsed: PostData = JSON.parse(saved);
      setPost(parsed);
    }
  }, []);

  if (!post) return <div className="text-center py-20">게시글을 불러오는 중입니다...</div>;

  return (
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

        <p className="text-sm text-gray-500 mb-2">
          {post.mainCat} / {post.subCat} / {post.detailCat}
        </p>
        <p className="text-xs text-gray-400 mb-6">작성일: {new Date(post.createdAt).toLocaleString()}</p>

        <hr className="mb-6" />

        <div className="prose max-w-none text-gray-800">
          <ReactMarkdown>{post.markdown}</ReactMarkdown>
        </div>
      </div>
  );
}