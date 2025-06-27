// components/Dropdown.tsx
import React from 'react';

interface DropdownProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  widthClass?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selected,
  onSelect,
  widthClass = 'w-28',
}) => {
  const [open, setOpen] = React.useState(false);
  // 검색유형 텍스트를 선택된 값으로 표시
  // selected가 없으면 '검색 유형' 기본값
  const displayText = selected || '검색 유형';

  return (
    <div className="relative">
      <button
        className="
          w-[118px] h-[42px] flex flex-row justify-center items-center gap-[10px]
          px-2 py-3 mx-[7px] my-0 rounded text-left bg-white border-none whitespace-nowrap
        "
        style={{ border: 'none' }}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="text-black mr-1">{displayText}</span>
        {/* 첨부한 SVG 아이콘 적용 */}
        <span className="flex items-center">
          <svg
            width="13.5"
            height="7.8"
            viewBox="0 0 13.5059 7.81348"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1"
            style={{ display: 'inline' }}
          >
            <path
              d="M12.75 0.75L6.75 6.75L0.75 0.75"
              stroke="#707070"
              strokeOpacity="1"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>
      {open && (
        <div
          className={`absolute top-8 left-0 z-10 bg-white rounded-xl shadow-md p-2 ${widthClass} text-center border-none`}
          style={{ border: 'none', minWidth: '80px', maxWidth: '120px', width: '80px' }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => {
                onSelect(option);
                setOpen(false);
              }}
              className={`py-1 rounded-md cursor-pointer transition px-2
                ${
                  selected === option
                    ? 'bg-purple-100 text-purple-600 font-bold'
                    : 'text-gray-700 hover:bg-[#ECECEC] hover:text-[#4D4D4D]'
                }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
