import { useState } from 'react'
import { formatDate } from '../../lib'
import type { commentData } from '../../types'
import ModalCommentDel from './ModalCommentDel'

export default function Comment({
  commentData: { name, date, content, imgUrl },
}: {
  commentData: commentData
}) {
  const [isModal, setIsModal] = useState(false)
  const commentDate = formatDate(date)
  return (
    <div className="flex gap-[17px] w-full relative">
      <img src={imgUrl} className="w-[48px] h-[48px] rounded-[50%] " />
      <div className="flex flex-col gap-[20px] pb-[38px] border-b-[1px] border-[#cecece] w-full">
        <div className="flex items-center gap-[8px]">
          <div className="text-[#4d4d4d] text-[16px] font-[600]">{name}</div>
          <div className="text-[#9d9d9d] text-[12px] font-[500]">
            {commentDate}
          </div>
          <div
            className="text-[#6201e0] text-[16px] cursor-pointer"
            onClick={() => setIsModal(true)}
          >
            삭제
          </div>
        </div>
        <div className="text-[#000000] text-[16px] font-[400]">{content}</div>
      </div>
      {isModal && <ModalCommentDel setIsModal={setIsModal} />}
    </div>
  )
}

