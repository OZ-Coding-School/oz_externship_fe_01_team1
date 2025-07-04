interface PostData {
  id: number
  category: { id: number; name: string }
  author_id: number
  title: string
  content: string
  view_count: number
  is_visible: boolean
  is_notice: boolean
  attachments: { id: number; file_url: string; file_name: string }[]
  images: [
    {
      id: number
      image_url: string
      image_name: string
      image_type: string
    },
  ]
  created_at: string
  updated_at: string
}

import {
  useRef,
  useState,
  useEffect,
  type SetStateAction,
  useCallback,
} from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import photo from '../assets/profile.png'
import Comment from '../components/commnunityDetail/Comment'
import { AiOutlineLike } from 'react-icons/ai'
import { GoLink } from 'react-icons/go'
import { LuArrowUpDown } from 'react-icons/lu'
import CommentLoading from '../components/commnunityDetail/CommentLoading'
import CommentTextArea from '../components/commnunityDetail/CommentTextArea'
import { useSortComments } from '../hooks'
import { URLCopy } from '@lib/index'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { commentsMockData } from '@components/commnunityDetail/mockData'

export default function CommunityDetail() {
  const { id } = useParams()
  const textareaRef = useRef(null)
  const [postData, setPostData] = useState<PostData | null>(null)
  const [isLike, setIsLike] = useState(false)
  const [likeNum, setLikeNum] = useState(2)

  const [isLoading, setIsLoading] = useState(false)
  const [hasNext, setHasNext] = useState(true)

  const {
    comments,
    setComments,
    sortDropdownOpen,
    selectedSort,
    setSortDropdownOpen,
    setSelectedSort,
  } = useSortComments('최신순')

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/community/posts/` + id)
      .then((res) => setPostData(res.data))
      .catch((err) => console.error('게시글 조회 실패:', err))
  }, [id])

  // 불러오기 함수
  const fetchComments = () => {
    if (isLoading || !hasNext) return

    setIsLoading(true)

    setTimeout(() => {
      const currentLength = comments.length
      const nextBatch = commentsMockData.slice(
        currentLength,
        currentLength + 10
      )

      setComments((prev) => [...prev, ...nextBatch])
      setHasNext(
        nextBatch.length === 10 &&
          currentLength + nextBatch.length < commentsMockData.length
      )

      setIsLoading(false)
    }, 2000) // debounce 역할도 겸함
  }

  useEffect(() => {
    setComments([])
    setHasNext(true)
    fetchComments()
  }, [selectedSort])

  const observerRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node) return

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isLoading && hasNext) {
            fetchComments()
          }
        },
        { threshold: 0.1 }
      )

      observer.observe(node)
    },
    [isLoading, hasNext]
  )

  const handleSort = (option: SetStateAction<string>) => {
    setSelectedSort(option)
    setSortDropdownOpen((prev) => !prev)
  }

  const handleClickLike = () => {
    setLikeNum((prev) => (isLike ? prev - 1 : prev + 1))
    setIsLike((prev) => !prev)
  }

  if (!postData) return <div className="text-center mt-36">로딩 중...</div>

  return (
    <div className="flex justify-center mt-[142px]">
      <div className="relative flex flex-col items-center w-[944px] gap-[100px]">
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex flex-col gap-[24px] border-b-[1px] pb-[14px] border-[#cecece]">
            <div className="flex flex-col gap-[24px]">
              <div className="flex gap-[5px] items-center text-[#6201e0] w-full text-[20px] font-[700]">
                <div>{postData.category.name}</div>
              </div>
              <div className="flex justify-between w-full">
                <p className="font-[700] text-[23px]">{postData.title}</p>
                <div className="flex items-center justify-between w-[101px]">
                  <img
                    src={photo}
                    alt="작성자"
                    className="h-[48px] rounded-[50%]"
                  />
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
          <div className="prose max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                img: ({ node, ...props }) => {
                  const src = props.src || ''
                  const match = src.match(/^image(\d+)/)
                  if (match) {
                    const index = parseInt(match[1], 10) - 1
                    const actualSrc = postData.images?.[index].image_url
                    if (actualSrc) {
                      return (
                        <img
                          {...props}
                          src={actualSrc}
                          alt={props.alt || 'image'}
                        />
                      )
                    } else {
                      return null
                    }
                  }
                  return <img {...props} alt={props.alt || 'image'} />
                },
              }}
            >
              {postData.content}
            </ReactMarkdown>
          </div>
        </div>
        <div className="flex flex-col gap-[24px] w-full">
          <div className="flex w-full justify-end gap-[12px] pb-[24px] border-b-[1px] border-[#cecece]">
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
          </div>
          <div className="flex w-full h-[120px] gap-[40px] p-[20px] border-[1px] rounded-[12px] border-[#cecece] focus-within:border-[#6202E0]">
            <CommentTextArea
              textareaRef={textareaRef}
              comments={Array.isArray(comments) ? comments : []}
            />
          </div>
          <div className="flex flex-col w-full gap-[20px]">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-[12px]">
                <IoChatbubbleOutline className="w-[18px] h-[18px]" />
                <div className="text-[#121212] text-[20px]">
                  {Array.isArray(comments)
                    ? `댓글 ${comments.length}개`
                    : '댓글 0개'}
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => setSortDropdownOpen((prev) => !prev)}
                  className="text-sm text-gray-700 hover:text-[#6202E0] flex items-center cursor-pointer"
                >
                  {selectedSort}
                  <LuArrowUpDown className="w-4 h-4 ml-2" />
                </button>
                {sortDropdownOpen && (
                  <div className="absolute top-[100%] right-0 mt-2 bg-white shadow-lg rounded-xl p-2 w-32 text-sm z-20">
                    {['최신순', '오래된 순'].map((option) => (
                      <div
                        key={option}
                        onClick={() => handleSort(option)}
                        className={`cursor-pointer px-3 py-2 rounded-md text-center transition ${selectedSort === option ? 'bg-purple-100 text-[#6202E0] font-bold' : 'text-gray-700 hover:bg-gray-100'}`}
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
            {hasNext && (
              <div
                ref={observerRef}
                className="flex items-center justify-center w-full h-[40px]"
              >
                {isLoading && <CommentLoading />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
