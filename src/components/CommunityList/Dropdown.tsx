// components/Dropdown.tsx
import React from 'react';
import { FaChevronDown } from 'react-icons/fa';

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

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center text-sm text-black hover:opacity-70"
      >
        <span className="font-medium">{selected}</span>
        <FaChevronDown className="ml-1 w-3 h-3" />
      </button>
      {open && (
        <div
          className={`absolute top-8 left-0 z-10 bg-white rounded-xl shadow-md p-2 ${widthClass} text-center`}
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
