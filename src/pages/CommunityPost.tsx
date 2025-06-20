import { useState, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function CommunityPost() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [markdown, setMarkdown] = useState('');


  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 shadow-md rounded-md mt-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">커뮤니티 게시글 작성</h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>

          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
            <option>대분류</option>
          </select>
        </div>
        <div>

          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
            <option>중분류</option>
          </select>
        </div>
        <div>
          <select className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
            <option>소분류</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="text-sm font-semibold text-gray-800 mb-2 block">제목</label>
        <input
          type="text"
          placeholder="제목을 입력해 주세요"
          className="w-full px-4 py-3 mb-6 border rounded bg-purple-100 border-gray-300 focus:outline-none focus:ring focus:border-blue-300"
        />
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-semibold text-gray-700">🛠 에디터 도구</span>
          <button
            type="button"
            onClick={triggerFileInput}
            className="px-3 py-1 border rounded text-sm bg-gray-100 hover:bg-gray-200"
          >
            🖼 이미지 업로드
          </button>
        </div>

        <div data-color-mode="light">
          <MDEditor
            value={markdown}
            onChange={(val = '') => setMarkdown(val)}
            height={400}
            preview="live"
            style={{ backgroundColor: 'white', color: 'black' }}
            previewOptions={{ className: 'bg-white', style: { color: 'black' } }}
          />
        </div>
        <div className="mt-6 text-right">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2 rounded">
            등록하기
          </button>
        </div>
      </div>
    </div>
  );
}