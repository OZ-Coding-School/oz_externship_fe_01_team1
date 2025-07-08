import { useState } from 'react'
import { IoCheckmark } from 'react-icons/io5'

interface CourseSelectProps {
  selected: string
  onChange: (value: string) => void
}

const courseList = ['웹 개발 초격차 프론트엔드 부트캠프', '웹 개발 초격차 백엔드 부트캠프', 'IT 스타트업 실무형 사업 개발자(BD) 부트캠프', '스타트업 맞춤형 프로덕트 디자이너', 'IT스타트업 실무형 풀스택 웹 개발 부트캠프']

export default function CourseSelect({ selected, onChange }: CourseSelectProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="mb-4 relative w-full">
      <div
        className="border border-[#BDBDBD] h-[48px] px-4 rounded flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="text-[14px] text-[#bdbdbd]">
          {selected || '수강중인 과정을 선택해 주세요.'}
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
          {courseList.map((course) => (
            <div
              key={course}
              onClick={() => {
                onChange(course)
                setIsOpen(false)
              }}
              className={`px-4 py-2 text-[14px] flex justify-between items-center cursor-pointer
                ${selected === course ? 'text-[#6201E0] font-semibold bg-purple-50' : 'text-[#121212]'}
                hover:bg-purple-100 hover:text-[#6201E0]`}
            >
              <span>{course}</span>
              {selected === course && <IoCheckmark size={16} />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}