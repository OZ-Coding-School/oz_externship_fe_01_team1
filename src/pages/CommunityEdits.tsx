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
                (async () => {
                    try {
                        const res = await api.get(`/v1/community/posts/${id}`);
                        console.log("✅ 게시글 데이터:", res.data);
                        const raw = res.data;

                        let markdownWithImages = raw.content;

                        const imageMap = new Map<string, string>();
                        if (Array.isArray(raw.images)) {
                            for (const img of raw.images) {
                                // Assume img.image_url is already a data: base64 string
                                imageMap.set(img.image_name, img.image_url);
                            }

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
                            mainCat: (raw.category?.name?.toString() || '1'),
                            markdown: markdownWithImages
                        });
                    } catch (err) {
                        console.error("게시글 조회 실패:", err);
                        setError(true);
                    }
                })();
            }
        }, [id]);

        const handleUpdate = async (updatedData: {
            title: string;
            mainCat: string;
            markdown: string;
        }) => {
            if (!id) return;

            try {
                const imageRegex = /!\[(.*?)\]\((blob:[^)]+)\)/g;
                const matches = [...updatedData.markdown.matchAll(imageRegex)];

                const selectedCat = mainCategories.find(cat => cat.value === updatedData.mainCat);
                if (!selectedCat) {
                    alert("올바른 카테고리를 찾을 수 없습니다.");
                    return;
                }

                let contentWithBase64 = updatedData.markdown;

                for (let i = 0; i < matches.length; i++) {
                    const fullMatch = matches[i][0];
                    const altText = matches[i][1];
                    const blobUrl = matches[i][2];

                    const res = await fetch(blobUrl);
                    const blob = await res.blob();

                    const base64 = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            if (typeof reader.result === "string") {
                                resolve(reader.result);
                            } else {
                                reject("Failed to convert to base64");
                            }
                        };
                        reader.onerror = reject;
                        reader.readAsDataURL(blob);
                    });

                    const base64Syntax = `![${altText}](${base64})`;
                    contentWithBase64 = contentWithBase64.replace(fullMatch, base64Syntax);
                }

                const formData = new FormData();
                formData.append("title", updatedData.title);
                formData.append("category", selectedCat.id.toString());
                formData.append("content", contentWithBase64);

                await api.patch(`/v1/community/posts/${id}/update/`, formData);
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
