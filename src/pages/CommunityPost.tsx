import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostFormHeader from "../components/CommunityPostAndEdit/PostFormHeader.tsx";
import Content from "../components/CommunityPostAndEdit/Content.tsx";
import SubmitButton from "../components/CommunityPostAndEdit/SubmitButton.tsx";


export default function CommunityPost() {
    const [title, setTitle] = useState('');
    const [mainCat, setMainCat] = useState('');
    const [subCat, setSubCat] = useState('');
    const [detailCat, setDetailCat] = useState('');
    const [markdown, setMarkdown] = useState('');
    const navigate = useNavigate();

    const isFormValid = title && mainCat && subCat && detailCat && markdown;

    const handleSubmit = () => {
        if (!isFormValid) return;
        const postData = {
            title,
            mainCat,
            subCat,
            detailCat,
            markdown,
            createdAt: new Date().toISOString(),
        };

        // 로컬 스토리지에 저장 (임시 키: communityPost)
        localStorage.setItem('communityPost', JSON.stringify(postData));


        navigate('/CommunityList/CommunityDetail');
    };

    return (
        <>
            <PostFormHeader
                title={title}
                setTitle={setTitle}
                mainCat={mainCat}
                setMainCat={setMainCat}
                subCat={subCat}
                setSubCat={setSubCat}
                detailCat={detailCat}
                setDetailCat={setDetailCat}
            />
            <Content markdown={markdown} setMarkdown={setMarkdown} />
            <SubmitButton text="등록하기" onClick={handleSubmit} disabled={!isFormValid} />
        </>
    );
}