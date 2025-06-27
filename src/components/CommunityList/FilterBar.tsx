import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import CategoryBar from './CategoryBar';
import SortDropdown from './SortDropdown';
import SearchBar from './SearchBar';
import WriteButton from './WriteButton';

const categories = ['전체', '인기글', 'oz.영화', 'oz.음악', '카테고리1', '카테고리2'];
const searchTypes = ['제목', '키워드', '작성자'];
const sortOptions = ['조회순', '좋아요 순', '댓글 순', '최신순', '오래된 순'];

type FilterBarProps = {
  selected: string;
  onSelect: React.Dispatch<React.SetStateAction<string>>;
};

const FilterBar: React.FC<FilterBarProps> = ({ selected, onSelect }) => {
  const [searchType, setSearchType] = useState<string>('검색 유형');
  const [searchText, setSearchText] = useState<string>('');
  const [selectedSort, setSelectedSort] = useState<string>('최신순');
  const [sortDropdownOpen, setSortDropdownOpen] = useState<boolean>(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

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
    setSelectedSort(option);
    setSortDropdownOpen(false);
  };

  return (
    <div
      className="
        w-[944px] h-[103px] flex flex-col justify-start items-start gap-8 p-0
        flex-none order-0 self-stretch flex-grow-0 my-[52px]
      "
    >
      {/* 상단: 검색바 + 글쓰기 버튼 */}
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center" style={{ gap: '16px' }}>
          <Dropdown
            options={searchTypes}
            selected={searchType}
            onSelect={setSearchType}
          />
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
        </div>
        <WriteButton />
      </div>

      {/* 하단: 카테고리 + 정렬 */}
      <div className="flex justify-between items-center w-full pb-[12px]">
        <CategoryBar categories={categories} selected={selected} onSelect={onSelect} />
        <SortDropdown
          sortOptions={sortOptions}
          selectedSort={selectedSort}
          setSortDropdownOpen={setSortDropdownOpen}
          sortDropdownOpen={sortDropdownOpen}
          handleSortClick={handleSortClick}
          sortRef={sortRef}
        />
      </div>
    </div>
  );
};

export default FilterBar;
