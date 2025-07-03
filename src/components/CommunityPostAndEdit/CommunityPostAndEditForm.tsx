import  {useState, useEffect} from "react";
import PostFormHeader from "./PostFormHeader.tsx";
import Content from "./Content.tsx";
import SubmitButton from "./SubmitButton.tsx";

interface Props {
    type: 'create' | 'edit';
    initialData?: {
        title: string;
        mainCat: string;
        subCat: string;
        detailCat: string;
        markdown: string;
    };
    onSubmit: (data: {
        title: string;
        mainCat: string;
        subCat: string;
        detailCat: string;
        markdown: string;
    }) => void;
}

export default function CommunityPostAndEditForm({type, onSubmit, initialData}: Props) {
    const [title, setTitle] = useState(() => initialData?.title || '');
    const [mainCat, setMainCat] = useState(() => initialData?.mainCat || '');
    const [subCat, setSubCat] = useState(() => initialData?.subCat || '');
    const [detailCat, setDetailCat] = useState(() => initialData?.detailCat || '');
    const [markdown, setMarkdown] = useState(() => initialData?.markdown || '');

    useEffect(() => {
        if (type === 'edit' && initialData) {
            setTitle(initialData.title);
            setMainCat(initialData.mainCat);
            setSubCat(initialData.subCat);
            setDetailCat(initialData.detailCat);
            setMarkdown(initialData.markdown);
        }
    }, [initialData, type]);

    const isFormValid =
        (title || '').trim() &&
        (mainCat || '').trim() &&
        (subCat || '').trim() &&
        (detailCat || '').trim() &&
        (markdown || '').trim();

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
            <Content markdown={markdown} setMarkdown={setMarkdown}/>
            <SubmitButton
                text={type === 'edit' ? '완료' : '등록하기'}
                disabled={!isFormValid}
                onClick={() =>
                    isFormValid &&
                    onSubmit({title, mainCat, subCat, detailCat, markdown})
                }
            />
        </>
    );
}