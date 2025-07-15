import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import type { DetailData } from '@customType/communityDetail'
import CommentsInfiniteScroll from '@components/commnunityDetail/CommentsInfiniteScroll'
import MarkdownEdit from '@components/commnunityDetail/MarkdownEdit'
import LikeAndCopyButton from '@components/commnunityDetail/LikeAndCopyButton'
import CommunityDetailHeader from './CommunityDetailHeader'
import api from '../api/mainApi'

export default function CommunityDetail() {
  const { id } = useParams()
  const [likeNum, setLikeNum] = useState(2)
  const [detailData, setDetailData] = useState<DetailData | null>(null)

  useEffect(() => {
    const fetchDetail = async () => {
      const res = await api.get<DetailData>(`/v1/community/posts/${id}`)
      setDetailData(res.data)
    }
    fetchDetail()
  }, [id])
  if (!detailData) return <div className="text-center mt-36">로딩 중...</div>

  return (
    <div className="flex justify-center mt-[142px]">
      <div className="relative flex flex-col items-center w-[944px] gap-[100px]">
        <div className="flex flex-col gap-[24px] w-full">
          <CommunityDetailHeader likeNum={likeNum} detailData={detailData} />
          <MarkdownEdit detailData={detailData} />
        </div>
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex w-full justify-end gap-[12px] pb-[24px] border-b-[1px] border-[#cecece]">
            <LikeAndCopyButton likeNum={likeNum} setLikeNum={setLikeNum} />
          </div>
          <CommentsInfiniteScroll
            fetchCommentsData={detailData.comments ?? []}
          />
        </div>
      </div>
    </div>
  )
}
