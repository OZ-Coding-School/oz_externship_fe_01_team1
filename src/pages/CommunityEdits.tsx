<<<<
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
=======
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import CommunityPostAndEditForm from '@components/CommunityPostAndEdit/CommunityPostAndEditForm.tsx'

const convertBase64ToBlobUrl = (base64: string): string => {
  const byteString = atob(base64.split(',')[1])
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0]
  const ab = new ArrayBuffer(byteString.length)
  const ia = new Uint8Array(ab)
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([ab], { type: mimeString })
  return URL.createObjectURL(blob)
}

const convertBlobUrlToBase64 = async (url: string): Promise<string> => {
  const res = await fetch(url)
  const blob = await res.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      if (typeof reader.result === 'string') resolve(reader.result)
      else reject('변환 실패')
    }
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export default function CommunityEdits() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [postData, setPostData] = useState<{
    title: string
    mainCat: string
    markdown: string
  } | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (id) {
      axios
        .get(`/api/v1/community/posts/${id}`)
        .then((res) => {
          console.log('✅ 게시글 데이터:', res.data)
          const raw = res.data
          const mainCat = raw.category?.name || ''

          let markdownWithImages = raw.content

          if (Array.isArray(raw.images)) {
            raw.images.forEach(
              (img: { file_name: string; image_url: string }) => {
                const regex = new RegExp(
                  `!\\[.*?\\]\\(${img.file_name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`,
                  'g'
                )
                const blobUrl = convertBase64ToBlobUrl(img.image_url)
                markdownWithImages = markdownWithImages.replace(
                  regex,
                  `![이미지](${blobUrl})`
                )
              }
            )
          }

          setPostData({
            title: raw.title,
            mainCat,
            markdown: markdownWithImages,
          })
        })
        .catch((err) => {
          console.error('게시글 조회 실패:', err)
          setError(true)
        })
    }
  }, [id])

  const handleUpdate = async (updatedData: {
    title: string
    mainCat: string
    markdown: string
  }) => {
    if (!id) return

    try {
      const categoryName = `${updatedData.mainCat}`

      const imageRegex = /!\[.*?\]\((blob:[^)]+)\)/g
      let contentWithBase64 = updatedData.markdown
      const matches = [...updatedData.markdown.matchAll(imageRegex)]
      const images: { file_name: string; image_url: string }[] = []

      for (let i = 0; i < matches.length; i++) {
        const [fullMatch, blobUrl] = matches[i]
        const base64 = await convertBlobUrlToBase64(blobUrl)
        const imageName = `image${i + 1}.png`
        contentWithBase64 = contentWithBase64.replace(
          fullMatch,
          `![이미지](${imageName})`
        )
        images.push({ file_name: imageName, image_url: base64 })
      }

      const payload = {
        title: updatedData.title,
        content: contentWithBase64,
        category_id: 0,
        category_name: categoryName,
        attachments: [],
        images,
      }

      await axios.put(`/api/v1/community/posts/${id}`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      navigate(`/CommunityList/CommunityDetail/${id}`)
    } catch (error) {
      console.error('게시글 수정 실패:', error)
      alert('게시글 수정에 실패했습니다.')
    }
  }

  if (error) return <div>❌ 게시글을 불러오는 데 실패했습니다.</div>
  if (!postData) return <div>로딩 중...</div>

  return (
    <CommunityPostAndEditForm
      type="edit"
      onSubmit={(data) => handleUpdate(data)}
      initialData={postData}
    />
  )
}
