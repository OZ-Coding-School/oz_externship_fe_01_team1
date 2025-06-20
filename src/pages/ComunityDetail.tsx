import { useState } from 'react'
import photo from '../assets/profile.png'
import Comment from '../components/comnunityDetail/Comment'

export default function CommunityDetail() {
  const [markdownText, setMarkdownText] = useState(`# Hello, Markdown!`)

  return (
    <div className="absolute left-1/2 top-[254px] transform -translate-x-1/2">
      <div className="flex flex-col items-center w-[944px] h-[1165px] gap-[100px]">
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-[24px] border-b-[1px] pb-[24px] border-[#cecece]">
            <div className="flex flex-col gap-[24px]">
              <div className="text-[#6201e0] w-full text-[20px] font-[700]">
                프론트엔드 &lt; 프로그래밍 언어 &lt; Python
              </div>
              <div className="flex justify-between w-full ">
                <p className="font-[700] text-[23px]">러닝 메이트 함께해요.</p>
                <p className="flex items-center justify-between w-[101px]">
                  <img src={photo} alt="" className="h-[48px] rounded-[50%]" />
                  <div>김태산</div>
                </p>
              </div>
            </div>
            <div className="flex w-full gap-[16px] text-[16px] font-[500] text-[#9d9d9d] ">
              <div>조회수 60</div>
              <div>좋아요 2</div>
              <div>15시간 전</div>
            </div>
          </div>
          <div className="flex border rounded-[20px] border-[#cecece] overflow-hidden">
            <textarea
              className="w-[472px] h-[573px] p-[40px] resize-none rounded-l-[20px] "
              value={markdownText}
              onChange={(e) => setMarkdownText(e.target.value)}
              placeholder="마크다운 문법을 입력하세요 (예: # 제목, **굵게**, - 목록 등)"
            ></textarea>
            <div className="w-[472px] h-[573px] bg-[#fafafb] p-[40px] resize-none ">
              {markdownText}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex w-full justify-end gap-[12px] pb-[24px] border-b-[1px] border-[#cecece]">
            <button className="text-[#707070] text-[12px] font-[500] border-[1px] border-[#cecece] py-[10px] px-[16px] rounded-[1000px] w-[62px] h-[38px]">
              👍 2
            </button>
            <button className="text-[#707070] text-[12px] font-[500] border-[1px] border-[#cecece] py-[10px] px-[16px] rounded-[1000px] hover:bg-[#ececec]">
              공유하기
            </button>
          </div>
          <div className="flex flex-col w-full gap-[20px]">
            <div className="flex justify-between items-center w-full">
              <div className="text-[#121212] text-[20px] font-[700]">
                댓글 2개
              </div>
              <div className="text-[#4d4d4d] text-[16px] font-[400]">
                최신순
              </div>
            </div>
            <div className="flex flex-col gap-[17px] w-full">
              <Comment />
              <Comment />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
