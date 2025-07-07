import  {useState, useEffect} from "react";
import PostFormHeader from "./PostFormHeader.tsx";
import Content from "./Content.tsx";
import SubmitButton from "./SubmitButton.tsx";

interface Props {
    type: 'create' | 'edit';
    initialData?: {
        title: string;
        mainCat: string;
        markdown: string;
    };
    onSubmit: (data: {
        title: string;
        mainCat: string;
        markdown: string;
    }) => void;
}

export default function CommunityPostAndEditForm({type, onSubmit, initialData}: Props) {
    const [title, setTitle] = useState(() => initialData?.title || '');
    const [mainCat, setMainCat] = useState(() => initialData?.mainCat || '');
    const [markdown, setMarkdown] = useState(() => initialData?.markdown || '');

    useEffect(() => {
        if (type === 'edit' && initialData) {
            setTitle(initialData.title);
            setMainCat(initialData.mainCat);
            setMarkdown(initialData.markdown);
        }
    }, [initialData, type]);

    const isFormValid =
        (title || '').trim() &&
        (mainCat || '').trim() &&
        (markdown || '').trim();

    return (
        <>
            <PostFormHeader
                title={title}
                setTitle={setTitle}
                mainCat={mainCat}
                setMainCat={setMainCat}
            />
            <Content markdown={markdown} setMarkdown={setMarkdown}/>
            <SubmitButton
                text={type === 'edit' ? '완료' : '등록하기'}
                disabled={!isFormValid}
                onClick={() =>
                    isFormValid &&
                    onSubmit({title, mainCat, markdown})
                }
            />
        </>
    );
}