import axios from 'axios';
import CommunityPostAndEditForm from "@components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";
import {useNavigate} from "react-router";
import {
    mainCategories,
} from "../components/CommunityPostAndEdit/data/categoryOptions.ts";

export default function CommunityPost() {
    const navigate = useNavigate();

    // blob URL을 base64로 변환하는 유틸 함수 추가
    const convertBlobToBase64 = async (blobUrl: string): Promise<string> => {
        const res = await fetch(blobUrl);
        const blob = await res.blob();
        return await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === 'string') resolve(reader.result);
                else reject('변환 실패');
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    const handleSubmit = async (data: {
        title: string;
        mainCat: string;
        markdown: string;
    }) => {
        try {
            const selectedDetail = mainCategories.find(cat => cat.value === data.mainCat);
            if (!selectedDetail) {
                alert('카테고리 정보를 찾을 수 없습니다.');
                return;
            }

            const imageRegex = /!\[.*?\]\((blob:.*?)\)/g;
            const matches = [...data.markdown.matchAll(imageRegex)];
            const base64Images: { file_name: string; image_url: string }[] = [];
            let contentWithPlaceholders = data.markdown;

            for (let i = 0; i < matches.length; i++) {
                const [fullMatch, blobUrl] = matches[i];
                const base64 = await convertBlobToBase64(blobUrl);
                const imageName = `image${i + 1}.png`;
                base64Images.push({ file_name: imageName, image_url: base64 });
                contentWithPlaceholders = contentWithPlaceholders.replace(fullMatch, `![이미지](${imageName})`);
            }

            const formData = {
                category_id: selectedDetail.id,
                category_name: data.mainCat,
                title: data.title,
                content: contentWithPlaceholders,
                attachments: [
                    {
                        file_url: "https://example.com/file.pdf",
                        file_name: "example.pdf"
                    }
                ],
                images: base64Images,
            };

            const response = await axios.post('http://localhost:3000/api/v1/community/posts/', formData, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const postId = response.data.id;
            navigate(`/CommunityList/CommunityDetail/${postId}`);
            console.log('✅ 저장된 게시글:', response.data);
        } catch (error) {
            console.error('게시글 저장 실패:', error);
            alert('게시글 저장에 실패했습니다.');
        }
    };

    return <CommunityPostAndEditForm type="create" onSubmit={handleSubmit}/>;
}