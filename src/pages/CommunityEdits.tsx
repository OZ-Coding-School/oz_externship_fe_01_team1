import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CommunityPostAndEditForm from "@components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";
import { mainCategories } from "@components/CommunityPostAndEdit/data/categoryOptions";
import api from "../api/mainApi.ts";


export default function CommunityEdits() {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [postData, setPostData] = useState<{
        title: string;
        mainCat: string;
        markdown: string;
    } | null>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            api.get(`/api/v1/community/posts/${id}`)
                .then(async (res) => {
                    console.log("✅ 게시글 데이터:", res.data);
                    const raw = res.data;

                    let markdownWithImages = raw.content;

                    // Skip replacement if content already contains base64 images to prevent lag
                    if (/!\[.*?\]\(data:image\/.*?;base64,/.test(markdownWithImages)) {
                        setPostData({
                            title: raw.title,
                            mainCat: (raw.category?.id?.toString() || '1'),
                            markdown: markdownWithImages,
                        });
                        return;
                    }

                    const imageMap = new Map<string, string>();
                    if (Array.isArray(raw.images)) {
                        raw.images.forEach((img: { file_name: string; image_url: string; image_name: string }) => {
                            imageMap.set(img.image_name, img.image_url);
                        });

                        markdownWithImages = markdownWithImages.replace(/!\[(.*?)\]\((.*?)\)/g, (match: string, alt: string, filename: string) => {
                            const url = imageMap.get(filename);
                            if (url) {
                                return `![${alt}](${url})`;
                            }
                            return match;
                        });
                    }

                    setPostData({
                        title: raw.title,
                        mainCat: (raw.category?.id?.toString() || '1'),
                        markdown: markdownWithImages
                    });
                })
                .catch(err => {
                    console.error("게시글 조회 실패:", err);
                    setError(true);
                });
        }
    }, [id]);

    const handleUpdate = async (updatedData: {
        title: string;
        mainCat: string;
        markdown: string;
    }) => {
        if (!id) return;

        try {
            const imageRegex = /!\[.*?\]\((blob:[^)]+)\)/g;
            let contentWithPlaceholders = updatedData.markdown;
            const matches = [...updatedData.markdown.matchAll(imageRegex)];
            const imageMap: { [fullMatch: string]: string } = {};

            const formData = new FormData();
            const selectedCat = mainCategories.find(cat => cat.value === updatedData.mainCat);
            if (!selectedCat) {
                alert('올바른 카테고리를 찾을 수 없습니다.');
                return;
            }

            formData.append('title', updatedData.title);
            formData.append('category', selectedCat.id.toString());

            for (let i = 0; i < matches.length; i++) {
                const [fullMatch, blobUrl] = matches[i];
                const res = await fetch(blobUrl);
                const blob = await res.blob();
                const fileName = `image${i + 1}.png`;
                imageMap[fullMatch] = fileName;
                formData.append('images', new File([blob], fileName, { type: blob.type }));
            }

            Object.entries(imageMap).forEach(([markdownSyntax, fileName]) => {
                contentWithPlaceholders = contentWithPlaceholders.split(markdownSyntax).join(`![이미지](${fileName})`);
            });

            formData.append('content', contentWithPlaceholders);

            await api.patch(`/api/v1/community/posts/${id}/update/`, formData);
            navigate(`/CommunityList/CommunityDetail/${id}`);
        } catch (error) {
            console.error("게시글 수정 실패:", error);
            alert("게시글 수정에 실패했습니다.");
        }
    };

    if (error) return <div>❌ 게시글을 불러오는 데 실패했습니다.</div>;
    if (!postData) return <div>로딩 중...</div>;

    return (
        <CommunityPostAndEditForm
            type="edit"
            onSubmit={(data) => handleUpdate(data)}
            initialData={postData}
        />
    );
}