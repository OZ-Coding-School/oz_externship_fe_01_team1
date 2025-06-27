import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type CategoryBarProps = {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
};

const CategoryBar: React.FC<CategoryBarProps> = ({ categories, selected, onSelect }) => (
  <div className="flex items-center">
    <button className="p-1 rounded-full hover:bg-gray-100">
      <FaChevronLeft className="w-5 h-5 text-gray-500" />
    </button>
    <div className="flex flex-wrap">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`flex items-center justify-center h-[42px] min-w-[81px] gap-[10px] px-[20px] py-0 rounded-md transition font-bold box-border mx-[4px]
            ${
              selected === category
                ? 'bg-purple-100 text-purple-700'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:text-purple-600'
            }`}
        >
          {category}
        </button>
      ))}
    </div>
    <button className="p-1 rounded-full hover:bg-gray-100">
      <FaChevronRight className="w-5 h-5 text-gray-500" />
    </button>
  </div>
);

export default CategoryBar;