import { useState } from 'react'

interface ClassSelectProps {
  selected: string
  onChange: (value: string) => void
}

const classList = ['1기', '2기', '3기', '4기', '5기', '6기', '7기', '8기', '9기', '10기', '11기', '12기']

export default function ClassSelect({ selected, onChange }: ClassSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 relative w-full">
      <div
        className="border border-[#BDBDBD] h-[48px] px-4 rounded flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-[14px] text-[#bdbdbd]">
          {selected || '기수를 선택하세요'}
        </span>
        <svg
          className={`w-[16px] h-[16px] transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute z-10 bg-white border border-[#BDBDBD] rounded mt-1 w-full shadow-md">
          {classList.map((cls) => (
            <div
              key={cls}
              onClick={() => {
                onChange(cls)
                setIsOpen(false)
              }}
              className="px-4 py-2 text-[14px] hover:bg-purple-100 hover:text-[#6201E0] cursor-pointer"
            >
              {cls}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}