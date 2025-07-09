import { IoCheckmark } from 'react-icons/io5'

interface ClassSelectProps {
  selected: string
  onChange: (value: string) => void
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
  disabled?: boolean
}

const classList = [
  '1기', '2기', '3기', '4기', '5기', '6기',
  '7기', '8기', '9기', '10기', '11기', '12기'
]

export default function ClassSelect({
  selected,
  onChange,
  isOpen,
  onOpen,
  onClose,
  disabled = false,
}: ClassSelectProps) {
  const containerClassName = [
    'border border-[#BDBDBD] h-[48px] px-4 rounded flex items-center justify-between',
    disabled ? 'bg-[#F5F5F5] cursor-not-allowed' : 'cursor-pointer',
  ].join(' ')

  const getItemClassName = (isSelected: boolean) =>
    [
      'w-[309px] h-[48px] px-[12px] py-2 ml-[12px] mt-[5px]',
      'flex justify-between items-center text-[14px] cursor-pointer',
      isSelected ? 'text-[#6201E0] font-semibold' : 'text-[#121212]',
      'hover:bg-[#EFE6FC]',
    ].join(' ')

  return (
    <div className="mb-4 relative w-full">
      <div
        className={containerClassName}
        onClick={() => (isOpen ? onClose() : onOpen())}
      >
        <span className={`text-[14px] ${selected ? 'text-[#121212]' : 'text-[#BDBDBD]'}`}>
          {selected || '기수를 선택하세요'}
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

      {isOpen && !disabled && (
        <div className="absolute z-10 bg-white border border-[#BDBDBD] rounded mt-1 w-full shadow-md max-h-[200px] overflow-y-auto">
          {classList.map((cls) => {
            const isSelected = selected === cls
            return (
              <div
                key={cls}
                onClick={() => {
                  onChange(cls)
                  onClose()
                }}
                className={getItemClassName(isSelected)}
              >
                <span>{cls}</span>
                {isSelected && <IoCheckmark size={16} />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}