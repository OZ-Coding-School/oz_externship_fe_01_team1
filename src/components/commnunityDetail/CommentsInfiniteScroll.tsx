import Comment from './Comment'
import CommentLoading from './CommentLoading'
import { useIntersectionObserver } from '@hooks/useIntersectionObserver'
import { LuArrowUpDown } from 'react-icons/lu'
import { IoChatbubbleOutline } from 'react-icons/io5'
import { useSortComments } from '@hooks/useSortComments'
import { useEffect, useRef, type SetStateAction } from 'react'
import { useFetchComments } from '@hooks/useFetchComments'
import CommentTextArea from './CommentTextArea'
import type { CommentsData } from '@customType/communityDetail'

export default function CommentsInfiniteScroll({
  fetchCommentsData,
}: {
  fetchCommentsData: CommentsData[]
}) {
  const textareaRef = useRef(null)

  const {
    comments,
    setComments,
    sortDropdownOpen,
    selectedSort,
    setSortDropdownOpen,
    setSelectedSort,
  } = useSortComments('최신순')

  useEffect(() => {
    setComments([])
    setHasNext(true)
    fetchComments()
  }, [selectedSort])

  const { fetchComments, hasNext, setHasNext, isLoading } = useFetchComments(
    setComments,
    fetchCommentsData
  )

  const observerRef = useIntersectionObserver({
    isLoading,
    hasNext,
    onIntersect: fetchComments,
  })

  const handleSort = (option: SetStateAction<string>) => {
    setSelectedSort(option)
    setSortDropdownOpen((prev) => !prev)
  }

  const handleCommentDel = (id: number) => {
    const delComments = comments.filter((comment) => comment.id !== id)
    setComments(delComments)
  }

  return (
    <>
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
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              handleCommentDel={handleCommentDel}
            />
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
    </>
  )
}
