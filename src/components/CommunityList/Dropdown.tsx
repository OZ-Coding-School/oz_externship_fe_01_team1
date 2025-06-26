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
  return (
    <div className="relative">
      <button
        className="w-28 min-w-[112px] max-w-[140px] px-4 py-2 rounded text-left bg-white flex items-center border-none whitespace-nowrap"
        style={{ border: 'none' }}
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="text-black">{selected}</span>
        <svg
          className="ml-2 w-3 h-3 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
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
