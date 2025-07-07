import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchCommunityDetail } from '../api/community'
import type { PostData } from '@customType/communityDetail'
import CommentsInfiniteScroll from '@components/commnunityDetail/CommentsInfiniteScroll'
import MarkdownEdit from '@components/commnunityDetail/MarkdownEdit'
import LikeAndCopyButton from '@components/commnunityDetail/LikeAndCopyButton'
import CommunityDetailHeader from './CommunityDetailHeader'

export default function CommunityDetail() {
  const { id } = useParams()
  const [postData, setPostData] = useState<PostData | null>(null)
  const [likeNum, setLikeNum] = useState(2)

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        const res = await fetchCommunityDetail(id)
        setPostData(res)
      }
    }
    fetchPost()
  }, [id])

  if (!postData) return <div className="text-center mt-36">로딩 중...</div>

  return (
    <div className="flex justify-center mt-[142px]">
      <div className="relative flex flex-col items-center w-[944px] gap-[100px]">
        <div className="flex flex-col gap-[24px] w-full">
          {postData ? (
            <CommunityDetailHeader postData={postData} likeNum={likeNum} />
          ) : (
            <div>로딩 중...</div>
          )}
          <MarkdownEdit postData={postData} />
        </div>
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex w-full justify-end gap-[12px] pb-[24px] border-b-[1px] border-[#cecece]">
            <LikeAndCopyButton likeNum={likeNum} setLikeNum={setLikeNum} />
          </div>
          <CommentsInfiniteScroll />
        </div>
      </div>
    </div>
  )
}
