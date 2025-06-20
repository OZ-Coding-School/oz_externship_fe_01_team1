import {useState} from 'react';
import MDEditor from '@uiw/react-md-editor';

export default function CommunityPost() {
  const [markdown, setMarkdown] = useState('');


  return (
      <div>
        <div className="max-w-5xl mx-auto bg-white  border-b-[1px] border-gray-200 mt-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">커뮤니티 게시글 작성</h1>
        </div>
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl border border-gray-200 mt-10">
          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>

              <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
                <option>대분류</option>
              </select>
            </div>
            <div>

              <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
                <option>중분류</option>
              </select>
            </div>
            <div>
              <select
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300">
                <option>소분류</option>
              </select>
            </div>
          </div>
          <div className="border border-purple-300 bg-purple-50 rounded-md px-4 py-3 shadow-sm">
            <input
                type="text"
                placeholder="제목을 입력해 주세요"
                className="w-full bg-transparent focus:outline-none text-gray-900"
            />
          </div>
        </div>


        <div className="max-w-5xl mx-auto bg-white   rounded-xl border border-gray-200 mt-10">
          <div className="bg-white rotate-md" data-color-mode="light">
            <MDEditor
                value={markdown}
                onChange={(val = '') => setMarkdown(val)}
                height={400}
                preview="live"
                style={{backgroundColor: 'white', color: 'black'}}
                previewOptions={{className: 'bg-white', style: {color: 'black'}}}
            />
          </div>
          <div className="mt-6 text-right">
            <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-md shadow-sm transition">
              완료
            </button>
          </div>

        </div>

      </div>
  )
      ;
}