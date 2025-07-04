import React from "react";
import {imageResize} from "@utils/imageresize.ts";

export const handleImageDrop = (
    event: React.DragEvent<HTMLDivElement>,
    setMarkdown: React.Dispatch<React.SetStateAction<string>>,
    maxSizeBytes: number = imageResize
) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    if (file.size > maxSizeBytes) {
        alert(`이미지는 ${Math.floor(maxSizeBytes / 1024 / 1024)}MB 이하만 업로드할 수 있습니다.`);
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const base64Image = e.target?.result;
        if (typeof base64Image === 'string') {
            const markdownImage = `![이미지 설명](${base64Image})`;
            setMarkdown(prev => `${prev}\n${markdownImage}`);
        }
    };
    reader.readAsDataURL(file);
};