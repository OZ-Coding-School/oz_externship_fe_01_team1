import { URLCopy } from '@utils/formatDate'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { GoLink } from 'react-icons/go'

export default function LikeAndCopyButton({
  likeNum,
  setLikeNum,
}: {
  likeNum: number
  setLikeNum: Dispatch<SetStateAction<number>>
}) {
  const [isLike, setIsLike] = useState(false)

  const handleClickLike = () => {
    setLikeNum((prev) => (isLike ? prev - 1 : prev + 1))
    setIsLike((prev) => !prev)
  }
  return (
    <>
      <button
        className="flex gap-[4px] items-center text-[#707070] border-[1px] border-[#cecece] py-[10px] px-[16px] rounded-[1000px] w-[62px] h-[38px] cursor-pointer"
        onClick={handleClickLike}
      >
        <AiOutlineLike
          className={`h-[18px] w-[18px] ${isLike ? 'text-[#6201e0]' : 'text-[#707070]'}`}
        />
        <div
          className={`text-[12px] font-[500] ${isLike ? 'text-[#6201e0]' : 'text-[#707070]'}`}
        >
          {likeNum}
        </div>
      </button>
      <button
        className="flex gap-[4px] items-center text-[#707070] border-[1px] border-[#cecece] py-[10px] px-[5px] rounded-[1000px] hover:bg-[#ececec] w-[82px] h-[38px] cursor-pointer"
        onClick={async () => {
          const result = await URLCopy()
          alert(
            `${result ? '복사가 완료되었습니다.' : '복사가 실패하였습니다.'}`
          )
        }}
      >
        <GoLink className="h-[18px] w-[18px]" />
        <div className="text-[12px] font-[500]">공유하기</div>
      </button>
    </>
  )
}
