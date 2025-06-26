import React from "react";
import {imageResize} from "@utils/imageresize.ts";

export const handleImageDrop = (
    event: React.DragEvent<HTMLDivElement>,
    setMarkdown: React.Dispatch<React.SetStateAction<string>>
) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;

    if (file.size > imageResize) {
        alert('이미지는 3MB 이하만 업로드할 수 있습니다.');
        return;
    }

    const blobUrl = URL.createObjectURL(file);
    const markdownImage = `![이미지 설명](${blobUrl})`;
    setMarkdown(prev => `${prev}\n${markdownImage}`);
};