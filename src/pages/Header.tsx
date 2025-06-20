import { useRef } from 'react';

export default function Header({ editor }: { editor: any }) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const insertImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            const src = reader.result;
            if (typeof src === 'string') {
                editor.chain().focus().setImage({ src }).run();
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div>
        <div className="flex justify-between items-center pb-3 w-full pr-6">
            <div className="text-xl font-bold">oz. 오즈코딩스쿨</div>
            <div className="flex items-center gap-2 text-sm text-gray-600">

                <select className="border rounded px-2 py-1"><option>기본서체</option></select>
                <select className="border rounded px-2 py-1"><option>16</option></select>
                <button onClick={() => editor.chain().focus().toggleBold().run()} className="font-bold">B</button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className="italic">I</button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className="underline">U</button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className="line-through">S</button>
                <button
                    onClick={() => {
                        const url = window.prompt('링크 URL을 입력하세요');
                        if (url) {
                            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                        }
                    }}
                >🔗</button>
                <button onClick={() => fileInputRef.current?.click()}>🖼️</button>
                <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) insertImage(file);
                    }}
                />
                <button onClick={() => editor.chain().focus().toggleBulletList().run()}>•</button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>=</button>
                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>≡</button>
                <button onClick={() => editor.chain().focus().setHardBreak().run()}>↵</button>
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>좌</button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>중</button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>우</button>
                <button onClick={() => editor.chain().focus().setTextAlign('justify').run()}>양</button>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-sm">김태산</span>
                <img src="axios" alt="profile" className="w-7 h-7 rounded-full" />
            </div>
        </div>

        </div>
    );
}