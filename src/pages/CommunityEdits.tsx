import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostFormHeader from "../components/CommunityPostAndEdit/PostFormHeader.tsx";
import Content from "../components/CommunityPostAndEdit/Content.tsx";
import SubmitButton from "../components/CommunityPostAndEdit/SubmitButton.tsx";

export default function CommunityEditsPage() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [mainCat, setMainCat] = useState('');
    const [subCat, setSubCat] = useState('');
    const [detailCat, setDetailCat] = useState('');
    const [markdown, setMarkdown] = useState('');

    const isFormValid = title && mainCat && subCat && detailCat && markdown;



    const handleSubmit = () => {
        if (!isFormValid ) return;
        navigate(`/CommunityList/CommunityDetail`);
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
            <SubmitButton text=" 완료" onClick={handleSubmit} disabled={!isFormValid} />
        </>
    );
}