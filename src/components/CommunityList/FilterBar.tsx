import React, { useState, useRef, useEffect } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaPen,
} from 'react-icons/fa';
import { LuArrowUpDown } from 'react-icons/lu';
import Dropdown from './Dropdown'; // 상대경로는 프로젝트 구조에 따라 수정

type FilterBarProps = {
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
};

const categories = ['전체', '인기글', 'oz.영화', 'oz.음악', '카테고리1', '카테고리2'];
const searchTypes = ['제목', '키워드', '작성자'];
const sortOptions = ['조회순', '좋아요 순', '댓글 순', '최신순', '오래된 순'];

const FilterBar: React.FC<FilterBarProps> = ({ selected, onSelect }) => {
  const [searchType, setSearchType] = useState<string>('검색 유형');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('최신순');
  const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
  const [, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 바깥쪽 클릭 시 드롭다운 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  // 정렬 드롭다운 바깥쪽 클릭 닫기
  const sortRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleSortClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortDropdownOpen(false);
      }
    }
    if (sortDropdownOpen) {
      document.addEventListener('mousedown', handleSortClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleSortClickOutside);
    };
  }, [sortDropdownOpen]);

  const handleSortClick = (option: string) => {
    if (selectedSort === option) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSelectedSort(option);
      setSortDirection('desc');
    }
    setSortDropdownOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-10">
      {/* 상단: 검색바 + 글쓰기 버튼 */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-4">
          {/* 드롭다운 컴포넌트 사용 */}
          <Dropdown
            options={searchTypes}
            selected={searchType}
            onSelect={setSearchType}
          />

          {/* 검색창 */}
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-[300px] md:w-[420px] px-[10px] py-[10px] rounded-[1000px] bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
          />
        </div>

        {/* 글쓰기 버튼 */}
        <button className="flex items-center gap-2 px-4 py-2 border border-purple-600 text-purple-600 rounded-md text-sm hover:bg-purple-50 transition">
          <FaPen className="w-4 h-4" />
          글쓰기
        </button>
      </div>

      {/* 하단: 카테고리 + 정렬 */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-2">
          <button className="p-1 rounded-full hover:bg-gray-100">
            <FaChevronLeft className="w-5 h-5 text-gray-500" />
          </button>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onSelect(category)}
                className={`px-4 py-2 text-sm rounded-md transition font-bold
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

        {/* 정렬 드롭다운 */}
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
      </div>
    </div>
  );
};

export default FilterBar;
