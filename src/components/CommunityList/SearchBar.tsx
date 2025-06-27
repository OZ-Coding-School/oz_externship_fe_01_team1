import React from 'react';
import { FaSearch } from 'react-icons/fa';

type SearchBarProps = {
  searchText: string;
  setSearchText: (text: string) => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ searchText, setSearchText }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="검색"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="w-[420px] h-[42px] px-[36px] py-[10px] rounded-[1000px] bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 text-sm"
    />
    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
  </div>
);

export default SearchBar;