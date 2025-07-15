import type { DetailData } from '@customType/communityDetail'
import photo from '../assets/profile_default.png'
import { Link } from 'react-router'
import { formatRelativeTime } from '@utils/formatRelativeTime'
import CommonModal from '@components/common/Modal'
import { Button } from '@components/common'
import { useState } from 'react'

export default function CommunityDetailHeader({
  likeNum,
  detailData,
  handleDeletePost,
}: {
  likeNum: number
  detailData: DetailData
  handleDeletePost: () => Promise<void>
}) {
  const [isModal, setIsModal] = useState(false)

  return (
    <div className="flex flex-col gap-[24px] border-b-[1px] pb-[14px] border-[#cecece]">
      <div className="flex flex-col gap-[24px]">
        <div className="flex gap-[5px] items-center text-[#6201e0] w-full text-[20px] font-[700]">
          {detailData?.category?.name ?? '카테고리 없음'}
        </div>
        <div className="flex justify-between w-full">
          <p className="font-[700] text-[23px]">{detailData.title}</p>
          <div className="flex items-center justify-between w-[101px]">
            <img
              src={detailData?.author?.profile_image_url || photo}
              alt="작성자"
              className="h-[48px] rounded-[50%]"
              onError={(e) => {
                e.currentTarget.src = photo // 기본 이미지로 대체
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[16px] text-[16px] font-[500] text-[#9d9d9d]">
          <div>조회수 {detailData.view_count}</div>
          <div>좋아요 {likeNum}</div>
          <div>
            {new Date(detailData.updated_at).getTime() !==
            new Date(detailData.created_at).getTime()
              ? formatRelativeTime(detailData.updated_at)
              : formatRelativeTime(detailData.created_at)}
          </div>
        </div>
        <div className="flex items-center gap-[10px] text-[#707070] font-[500] text-[16px]">
          <Link
            to={`/CommunityList/CommunityEdit/${detailData.id}`}
            className="text-[#6201e0]"
          >
            수정
          </Link>
          <div>|</div>
          <button onClick={() => setIsModal(true)} className="cursor-pointer">
            삭제
          </button>
          {
            <CommonModal
              isOpen={isModal}
              onClose={() => setIsModal(false)}
              position="center-bg"
              title="삭제 시 되돌릴 수 없으며, 작성된 댓글도 함께 삭제됩니다"
            >
              <Button
                fullWidth={false}
                className="flex justify-center items-center px-[24px] py-[18px] bg-[#efe6fc] text-[16px] text-[#4e01b3] font-[600] rounded-[100px] h-[43px] w-[76px]"
                onClick={() => setIsModal(false)}
              >
                취소
              </Button>
              <Button
                fullWidth={false}
                className="flex justify-center items-center px-[24px] py-[18px] bg-[#6201e0] text-[16px] text-[#fafafa] font-[600] rounded-[100px] h-[43px] w-[76px]"
                onClick={() => {
                  handleDeletePost()
                  setIsModal(false)
                }}
              >
                확인
              </Button>
            </CommonModal>
          }
        </div>
      </div>
    </div>
  )
}
