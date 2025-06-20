import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { useEffect, useState } from 'react';

export function useEditorWithPreview() {
    const [htmlContent, setHtmlContent] = useState('');
    const editor = useEditor({
        editable: true,
        extensions: [
            StarterKit,
            Bold,
            Italic,
            Underline,
            Strike,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Link.configure({ openOnClick: false }),
            Image,
            HorizontalRule,
            BulletList,
            OrderedList,
            ListItem,
        ],
        content: '',
    });

    useEffect(() => {
        if (!editor) return;

        const updateHandler = () => {
            setHtmlContent(editor.getHTML());
        };

        updateHandler();
        editor.on('update', updateHandler);

        return () => {
            editor.off('update', updateHandler);
        };
    }, [editor]);

    return { editor, htmlContent };
}