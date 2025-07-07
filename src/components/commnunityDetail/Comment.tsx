import { useEffect, useRef, useState } from 'react'
import { formatDate } from '../../lib'
import type { commentData } from '../../types'
import CommonModal from '@components/common/Modal'
import { Button } from '@components/common'
import { commentsMockData } from './mockData'

export default function Comment({
  commentData: { id, name, date, content, imgUrl },
  handleCommentDel,
}: {
  commentData: commentData
  handleCommentDel: (id: number) => void
}) {
  const [isModal, setIsModal] = useState(false)
  const commentDate = formatDate(date)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const regex = /@([\wㄱ-ㅎㅏ-ㅣ가-힣]{1,})/g
      const replaced = content.replace(regex, (match) => {
        const names = commentsMockData.map((comment) => `@${comment.name}`)
        if (names.includes(match)) {
          return `<span class="font-semibold text-red-400 bg-gray-300 rounded-md p-0.5">${match}</span>`
        }
        return match
      })
      contentRef.current.innerHTML = replaced
    }
  }, [content])

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
          {
            <CommonModal
              isOpen={isModal}
              onClose={() => setIsModal(false)}
              position="center"
              title="댓글을 삭제하시겠습니까?"
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
                  handleCommentDel(id)
                  setIsModal(false)
                }}
              >
                확인
              </Button>
            </CommonModal>
          }
        </div>
        <div ref={contentRef} className="text-[#000000] text-[16px] font-[400]">
          {content}
        </div>
      </div>
    </div>
  )
}
