import { IoCheckmark } from 'react-icons/io5'

interface CourseSelectProps {
  selected: string
  onChange: (value: string) => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

const courseList = [
  '웹 개발 초격차 프론트엔드 부트캠프',
  '웹 개발 초격차 백엔드 부트캠프',
  'IT 스타트업 실무형 사업 개발자(BD) 부트캠프',
  '스타트업 맞춤형 프로덕트 디자이너',
  'IT스타트업 실무형 풀스택 웹 개발 부트캠프'
]

export default function CourseSelect({ selected, onChange, isOpen, onOpen, onClose }: CourseSelectProps) {
  return (
    <div className="mb-4 relative w-full">
      <div
        className="border border-[#BDBDBD] h-[48px] px-4 rounded flex items-center justify-between cursor-pointer"
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        <span className={`text-[14px] ${selected ? 'text-[#121212]' : 'text-[#bdbdbd]'}`}>
          {selected || '수강중인 과정을 선택해 주세요.'}
        </span>
        <svg
          className={`w-[16px] h-[16px] transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute z-10 bg-white border border-[#BDBDBD] rounded mt-1 w-full shadow-md">
          {courseList.map((course) => {
            const isSelected = selected === course
            return (
              <div
                key={course}
                onClick={() => {
                  onChange(course)
                  onClose()
                }}
                className={`py-2 px-[12px] text-[14px] ml-[12px] mt-[5px] w-[324px] h-[48px] flex justify-between 
                  items-center rounded-[3px] cursor-pointer
                  ${isSelected ? 'text-[#6201E0] font-semibold' : 'text-[#121212]'}
                  hover:bg-[#efe6fc]`}
              >
                <span>{course}</span>
                {isSelected && <IoCheckmark size={16} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}