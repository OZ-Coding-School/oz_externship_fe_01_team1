import { useState } from 'react'
import ModalMention from './ModalMention'
import type { commentData } from '../../types'
import { getRegExp } from 'korean-regexp'
import { useTextarea } from '../../store/mentionStore'

interface CommentTextAreaProops {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  comments: commentData[]
}

export default function CommentTextArea({
  textareaRef,
  comments,
}: CommentTextAreaProops) {
  const { text, setText } = useTextarea()
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredUsers, setFilteredUsers] = useState<[] | commentData[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setText(value)

    // 커서 위치 기준으로 마지막 단어 추출
    const cursorPos = e.target.selectionStart
    const sliced = value.slice(0, cursorPos)
    const match = sliced.match(/@([\w가-힣ㄱ-ㅎㅏ-ㅣ]{1,})$/) // @다음 문자 추출

    if (match) {
      const query = match[1]
      const reg = getRegExp(query)

      const result = comments.filter((comment) => comment.name.match(reg))
      setFilteredUsers(result)
      //멘션검색 시 있을 경우 모달창 열고 없으면 닫기
      if (result.length !== 0) {
        setShowSuggestions(true)
      } else {
        setShowSuggestions(false)
      }
    } else {
      setShowSuggestions(false)
    }
  }
  return (
    <>
      <div className="relative">
        <textarea
          ref={textareaRef}
          className="w-[784px] placeholder:text-[#bdbdbd] resize-none outline-none"
          placeholder="개인정보를 공유 및 요청하거나, 명예 회손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있습니다."
          value={text}
          onChange={handleChange}
        ></textarea>
        {showSuggestions && (
          <ModalMention
            setShowSuggestions={setShowSuggestions}
            textareaRef={textareaRef}
            filteredUsers={filteredUsers}
          />
        )}
      </div>
      <div className="flex self-end">
        <button
          className={`w-[80px] h-[40px] ${text.trim() ? 'bg-[#efe6fc] text-[#6202E0]' : 'bg-[#ececec] text-[#4d4d4d]'} rounded-[100px]`}
        >
          등록
        </button>
      </div>
    </>
  )
}
