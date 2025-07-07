import type { PostData } from '@customType/communityDetail'
import photo from '../assets/profile.png'
import { Link } from 'react-router'

export default function CommunityDetailHeader({
  postData,
  likeNum,
}: {
  postData: PostData
  likeNum: number
}) {
  return (
    <div className="flex flex-col gap-[24px] border-b-[1px] pb-[14px] border-[#cecece]">
      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[5px] items-center text-[#6201e0] w-full text-[20px] font-[700]">
          {postData?.category?.name ?? '카테고리 없음'}
        </div>
        <div className="flex justify-between w-full">
          <p className="font-[700] text-[23px]">{postData.title}</p>
          <div className="flex items-center justify-between w-[101px]">
            <img src={photo} alt="작성자" className="h-[48px] rounded-[50%]" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[16px] text-[16px] font-[500] text-[#9d9d9d]">
          <div>조회수 {postData.view_count}</div>
          <div>좋아요 {likeNum}</div>
          <div>
            {new Date(postData.updated_at).getTime() !==
            new Date(postData.created_at).getTime()
              ? `수정됨: ${new Date(postData.updated_at).toLocaleString()}`
              : new Date(postData.created_at).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center gap-[10px] text-[#707070] font-[500] text-[16px]">
          <Link
            to={`/CommunityList/CommunityEdit/${postData.id}`}
            className="text-[#6201e0]"
          >
            수정
          </Link>
          <div>|</div>
          <div>삭제</div>
        </div>
      </div>
    </div>
  )
}
