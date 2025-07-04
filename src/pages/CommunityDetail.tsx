import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import photo from '../assets/profile.png'
import { AiOutlineLike } from 'react-icons/ai'
import { GoLink } from 'react-icons/go'
import { URLCopy } from '@utils/formatDate'
import { fetchCommunityDetail } from '../api/community'
import type { PostData } from '@customType/communityDetail'
import CommentsInfiniteScroll from '@components/commnunityDetail/CommentsInfiniteScroll'

export default function CommunityDetail() {
  const { id } = useParams()
  const [postData, setPostData] = useState<PostData | null>(null)
  const [isLike, setIsLike] = useState(false)
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
          <CommentsInfiniteScroll />
        </div>
      </div>
    </div>
  )
}
