import React from 'react';
import { LuArrowUpDown } from 'react-icons/lu';

type SortDropdownProps = {
  sortOptions: string[];
  selectedSort: string;
  setSortDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sortDropdownOpen: boolean;
  handleSortClick: (option: string) => void;
  sortRef: React.RefObject<HTMLDivElement | null>; // <- 타입 수정
};

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortOptions,
  selectedSort,
  setSortDropdownOpen,
  sortDropdownOpen,
  handleSortClick,
  sortRef,
}) => (
  <div className="relative" ref={sortRef}>
    <button
      onClick={() => setSortDropdownOpen((prev) => !prev)}
      className="text-sm text-gray-700 hover:text-purple-600 flex items-center"
    >
      {selectedSort}
      <LuArrowUpDown className="ml-2 w-4 h-4" />
    </button>

    {sortDropdownOpen && (
      <div className="absolute top-[100%] right-0 mt-2 bg-white shadow-lg rounded-xl p-2 w-32 text-sm z-20">
        {sortOptions.map((option) => (
          <div
            key={option}
            onClick={() => handleSortClick(option)}
            className={`cursor-pointer px-3 py-2 rounded-md text-center transition
              ${
                selectedSort === option
                  ? 'bg-purple-100 text-purple-600 font-bold'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
          >
            {option}
          </div>
        ))}
      </div>
    )}
  </div>
);

export default SortDropdown;