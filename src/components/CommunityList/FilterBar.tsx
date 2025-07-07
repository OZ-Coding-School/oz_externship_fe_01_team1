import React, { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown';
import CategoryBar from './CategoryBar';
import SortDropdown from './SortDropdown';
import SearchBar from './SearchBar';
import WriteButton from './WriteButton';

// 검색바만 분리
const SearchBarSection: React.FC<{
  searchTypes: string[];
  searchType: string;
  setSearchType: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}> = ({ searchTypes, searchType, setSearchType, searchText, setSearchText }) => (
  <div className="flex items-center gap-2 w-full md:w-auto">
    <Dropdown
      options={searchTypes}
      selected={searchType}
      onSelect={setSearchType}
    />
    <SearchBar searchText={searchText} setSearchText={setSearchText} />
  </div>
);

// 글쓰기 버튼만 분리
const WriteButtonSection: React.FC = () => (
  <div className="flex justify-end w-full md:w-auto mt-2 md:mt-0">
    <WriteButton />
  </div>
);

const categories = ['전체','프론트엔드','백엔드','프로그래밍 언어','인프라','Python','React'];
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
        w-full max-w-[944px] h-auto flex flex-col gap-4 p-0
        flex-none order-0 self-stretch flex-grow-0 my-[32px]
        sticky top-0 z-30 bg-white
      "
      style={{
        boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
        minHeight: '120px', // 높이 고정(최소값), 필요시 조정
      }}
    >
      {/* 상단: 검색바 + 글쓰기 버튼 (반응형) */}
      <div className="flex flex-col md:flex-row justify-between items-stretch w-full gap-2">
        <SearchBarSection
          searchTypes={searchTypes}
          searchType={searchType}
          setSearchType={setSearchType}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <WriteButtonSection />
      </div>

      {/* 하단: 카테고리 + 정렬 */}
      <div className="flex flex-col md:flex-row justify-between items-center w-full pb-[12px] gap-2">
        <CategoryBar
          categories={categories}
          selected={selected}
          onSelect={onSelect}
          // CategoryBar 내부 버튼에 cursor-pointer가 적용되어야 함
        />
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
