import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CommunityPostAndEditForm from "@components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";

const convertBase64ToBlobUrl = (base64: string): string => {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return URL.createObjectURL(blob);
};

const convertBlobUrlToBase64 = async (url: string): Promise<string> => {
    const res = await fetch(url);
    const blob = await res.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') resolve(reader.result);
            else reject('변환 실패');
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
};

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
            axios.get(`http://localhost:3000/api/v1/community/posts/${id}`)
                .then(res => {
                    console.log("✅ 게시글 데이터:", res.data);
                    const raw = res.data;
                    const mainCat = raw.category?.name || '';

                    let markdownWithImages = raw.content;

                    if (Array.isArray(raw.images)) {
                        raw.images.forEach((img: { file_name: string; image_url: string }) => {
                            const regex = new RegExp(`!\\[.*?\\]\\(${img.file_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
                            const blobUrl = convertBase64ToBlobUrl(img.image_url);
                            markdownWithImages = markdownWithImages.replace(regex, `![이미지](${blobUrl})`);
                        });
                    }

                    setPostData({
                        title: raw.title,
                        mainCat,
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
            const categoryName = `${updatedData.mainCat}`

            const imageRegex = /!\[.*?\]\((blob:[^)]+)\)/g;
            let contentWithBase64 = updatedData.markdown;
            const matches = [...updatedData.markdown.matchAll(imageRegex)];
            const images: { file_name: string; image_url: string }[] = [];

            for (let i = 0; i < matches.length; i++) {
                const [fullMatch, blobUrl] = matches[i];
                const base64 = await convertBlobUrlToBase64(blobUrl);
                const imageName = `image${i + 1}.png`;
                contentWithBase64 = contentWithBase64.replace(fullMatch, `![이미지](${imageName})`);
                images.push({ file_name: imageName, image_url: base64 });
            }

            const payload = {
                title: updatedData.title,
                content: contentWithBase64,
                category_id: 0,
                category_name: categoryName,
                attachments: [],
                images
            };

            await axios.put(`http://localhost:3000/api/v1/community/posts/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

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