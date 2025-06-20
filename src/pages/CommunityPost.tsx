// Insert.tsx
import {useState} from 'react';
import {useEditorWithPreview} from '../hooks/useEditorWithPreview';
import Header from '../pages/Header';
import EditorPreview from '../pages/EditorPreview';
import {EditorContent} from '@tiptap/react';

export default function CommunityPost() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('프론트엔드');
  const {editor, htmlContent} = useEditorWithPreview();

  if (!editor) return <div className="p-4 text-gray-500">에디터 로딩 중...</div>;

  return (
      <>
        <div className="bg-white py-4 px-6 border-b shadow-sm">
          <Header editor={editor} />
        </div>
        <div className="px-6 py-8 font-sans bg-white min-h-screen max-w-6xl mx-auto space-y-6">

          <div>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border rounded px-3 py-2"
            >
              <option value="프론트엔드">프론트엔드</option>
              <option value="백엔드">백엔드</option>
              <option value="풀스택">풀스택</option>
            </select>
          </div>

          <input
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-2xl font-bold border-b py-2 outline-none"
          />

          <div className="grid grid-cols-2 gap-6 mt-4 border rounded min-h-[400px]">
            <div className="p-4" onClick={() => editor?.commands.focus()}>
              <EditorContent
                  editor={editor}
                  className="prose prose-sm max-w-none w-full min-h-[400px] outline-none tiptap"
              />
            </div>
            <EditorPreview html={htmlContent}/>
          </div>

          <div className="w-full flex justify-end pr-6 mt-8">
            <button className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700">
              완료
            </button>
          </div>
        </div>
      </>
  );
}