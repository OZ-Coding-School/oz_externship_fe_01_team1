import { useState } from 'react'
import photo from '../assets/profile.png'
import Comment from '../components/comnunityDetail/Comment'
import { AiOutlineLike } from 'react-icons/ai'
import { GoLink } from 'react-icons/go'
import { LuArrowUpDown } from 'react-icons/lu'
import { SlArrowRight } from 'react-icons/sl'
import CommentLoading from '../components/comnunityDetail/CommentLoading'

const comments = [
  {
    id: 1,
    name: '김철수',
    date: '2025-06-23T10:30:00.000Z',
    content: '좋은 글 감사합니다!',
    imgUrl: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: '이영희',
    date: '2025-06-22T14:15:00.000Z',
    content: '많은 도움이 되었어요 :)',
    imgUrl: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: '박민수',
    date: '2025-06-21T09:45:00.000Z',
    content: '질문이 있는데 답변 부탁드려요.',
    imgUrl: 'https://i.pravatar.cc/150?img=3',
  },
]

export default function CommunityDetail() {
  //드랍다운 메뉴
  const sortOptions = ['조회순', '좋아요 순', '댓글 순', '최신순', '오래된 순']

  //드랍다운 선택 상태 (초기값: 최신순)
  const [selectedSort, setSelectedSort] = useState<string>('최신순')
  const [isLike, setIsLike] = useState(false)
  const [likeNum, setLikeNum] = useState(2)
  //드랍다운 창 열고 닫기 상태관리
  const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false)

  const [commentText, setCommentText] = useState('')

  //드랍다운 메뉴 클릭 시 선택 및 창닫기
  const handleSortClick = (option: string) => {
    setSelectedSort(option)
    setSortDropdownOpen(false)
  }

  const hadleClickLike = () => {
    if (!isLike) {
      setLikeNum((prev) => prev + 1)
    } else {
      setLikeNum((prev) => prev - 1)
    }
    setIsLike((prev) => !prev)
  }
  return (
    <div className="absolute left-1/2 top-[254px] transform -translate-x-1/2">
      <div className="flex flex-col items-center w-[944px] h-[1165px] gap-[100px]">
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[24px] border-b-[1px] pb-[14px] border-[#cecece]">
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-[5px] items-center text-[#6201e0] w-full text-[20px] font-[700]">
                <div>프론트엔드</div>
                <SlArrowRight className="w-[12px]" />
                <div>프로그래밍 언어</div>
                <SlArrowRight className="w-[12px]" />
                <div>Python</div>
              </div>
              <div className="flex justify-between w-full ">
                <p className="font-[700] text-[23px]">러닝 메이트 함께해요.</p>
                <div className="flex items-center justify-between w-[101px]">
                  <img src={photo} alt="" className="h-[48px] rounded-[50%]" />
                  <div>김태산</div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-[16px] text-[16px] font-[500] text-[#9d9d9d] ">
                <div>조회수 60</div>
                <div>좋아요 2</div>
                <div>15시간 전</div>
              </div>
              <div className="flex items-center gap-[10px] text-[#707070] font-[500] text-[16px]">
                <div className="text-[#6201e0]">수정</div>
                <div>|</div>
                <div>삭제</div>
              </div>
            </div>
          </div>
          <div>
            https://www.codeit.kr/costudy/join/684e26b75155062e46211e77
            함께열공해요
          </div>
          <div>함께 열공해요</div>
        </div>
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex w-full justify-end gap-[12px] pb-[24px] border-b-[1px] border-[#cecece]">
            <button
              className="flex gap-[4px] items-center text-[#707070] border-[1px] border-[#cecece] py-[10px] px-[16px] rounded-[1000px] w-[62px] h-[38px] cursor-pointer"
              onClick={hadleClickLike}
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
            <button className="flex gap-[4px] items-center text-[#707070] border-[1px] border-[#cecece] py-[10px] px-[5px] rounded-[1000px] hover:bg-[#ececec] w-[82px] h-[38px] cursor-pointer">
              <GoLink className="h-[18px] w-[18px]" />
              <div className="text-[12px] font-[500]">공유하기</div>
            </button>
          </div>
          <div className="flex w-full h-[120px] gap-[40px] p-[20px] border-[1px] rounded-[12px] border-[#cecece] focus-within:border-[#6202E0]">
            <textarea
              className="w-[784px] placeholder:text-[#bdbdbd] resize-none outline-none"
              placeholder="개인정보를 공유 및 요청하거나, 명예 회손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            ></textarea>
            <div className="flex self-end">
              <button
                className={`w-[80px] h-[40px] ${commentText.trim() ? 'bg-[#efe6fc] text-[#6202E0]' : 'bg-[#ececec] text-[#4d4d4d]'} rounded-[100px]`}
              >
                등록
              </button>
            </div>
          </div>
          <div className="flex flex-col w-full gap-[20px]">
            <div className="flex justify-between items-center w-full">
              <div className="text-[#121212] text-[20px] font-[700]">
                {`댓글 ${comments.length}개`}
              </div>
              <div className="relative">
                <button
                  onClick={() => setSortDropdownOpen((prev) => !prev)}
                  className="text-sm text-gray-700 hover:text-[#6202E0] flex items-center"
                >
                  {selectedSort}
                  <LuArrowUpDown className="ml-2 w-4 h-4" />
                </button>

                {sortDropdownOpen && (
                  <div className="absolute top-[100%] right-0 mt-2 bg-white shadow-lg rounded-xl p-2 w-32 text-sm z-20">
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSortClick(option)}
                        className={`cursor-pointer px-3 py-2 rounded-md text-center transition
                    ${
                      selectedSort === option
                        ? 'bg-purple-100 text-[#6202E0] font-bold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-[17px] w-full">
              {comments.map((commentData) => (
                <Comment key={commentData.id} commentData={commentData} />
              ))}
            </div>
            <div className="flex justify-center items-center">
              <CommentLoading />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
