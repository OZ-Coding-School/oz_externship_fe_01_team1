import CommunityPostAndEditForm from "@components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx";
import {useNavigate} from "react-router";
import {
    mainCategories,
} from "../components/CommunityPostAndEdit/data/categoryOptions.ts";
import api from "../api/mainApi.ts";

export default function CommunityPost() {
    const navigate = useNavigate();

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
            let contentWithPlaceholders = data.markdown;

            const formData = new FormData();
            formData.append('category_id', selectedDetail.id.toString());
            formData.append('title', data.title);
            formData.append('content', contentWithPlaceholders);
            formData.append('is_visible', 'true');
            formData.append('is_notice', 'true');

            for (let i = 0; i < matches.length; i++) {
                const [fullMatch, blobUrl] = matches[i];
                const res = await fetch(blobUrl);
                const blob = await res.blob();
                const file = new File([blob], `image${i + 1}.png`, {type: blob.type});
                formData.append('images', file);
                contentWithPlaceholders = contentWithPlaceholders.replace(fullMatch, `![이미지](image${i + 1}.png)`);
            }

            formData.set('content', contentWithPlaceholders); // update after placeholder replacements

            const response = await api.post('/api/v1/community/posts/create/', formData);
            console.log('📦 서버 응답 전체:', response.data.post_id);

            // ID가 없다면 강제 목록 재요청
            let id = response.data.post_id || response.data.id;

            if (!id) {
                const listRes = await api.get(`/api/v1/community/posts/${1}`)
                const lastPost = listRes.data?.[0]; // 최신 게시글이 가장 앞에 있다고 가정
                id = lastPost?.id;
            }

            if (!id) {
                alert('게시글 ID를 찾을 수 없습니다. 목록으로 이동합니다.');
                navigate('/CommunityList');
            } else {
                navigate(`/CommunityList/CommunityDetail/${id}`);
            }
        } catch (error) {
            console.error('게시글 저장 실패:', error);
            alert('게시글 저장에 실패했습니다.');
        }
    };

    return <CommunityPostAndEditForm type="create" onSubmit={handleSubmit}/>;
}