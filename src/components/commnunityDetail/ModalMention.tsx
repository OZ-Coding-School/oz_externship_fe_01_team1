import type { commentData } from '../../types'
import { useTextarea } from '../../store/mentionStore'

interface ModalMentionProps {
  setShowSuggestions: React.Dispatch<React.SetStateAction<boolean>>
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  filteredUsers: commentData[]
}

export default function ModalMention({
  setShowSuggestions,
  textareaRef,
  filteredUsers,
}: ModalMentionProps) {
  const { text, setText } = useTextarea()

  const handleSelect = (userName: string) => {
    if (!textareaRef.current) return
    const cursorPos = textareaRef.current.selectionStart
    const beforeCursor = text.slice(0, cursorPos)
    const afterCursor = text.slice(cursorPos)

    const replaced = beforeCursor.replace(/@([\w가-힣]{1,})$/, `@${userName} `)
    const newText = replaced + afterCursor

    setText(newText)
    setShowSuggestions(false)
  }
  return (
    <ul className="absolute left-2 bottom-[110px] rounded-[12px] p-[12px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] z-10 w-[280px] max-h-[140px] overflow-auto">
      {filteredUsers.map((user) => (
        <div
          key={user.id}
          className="flex gap-[12px] items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => handleSelect(user.name)}
        >
          <img
            src={user.imgUrl}
            alt=""
            className="w-[20px] h-[20px] rounded-[50%] "
          />
          <div>{user.name}</div>
        </div>
      ))}
    </ul>
  )
}
