import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void; // ✅ 함수형 업데이트 제거
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      {/* 처음으로 */}
      <button
        className={`p-1 rounded ${
          page === 1 ? 'text-gray-400 cursor-default' : 'text-black hover:text-purple-600'
        }`}
        disabled={page === 1}
        onClick={() => setPage(1)}
        aria-label="처음으로"
      >
        <ChevronsLeft size={16} />
      </button>

      {/* 이전 페이지 */}
      <button
        className={`p-1 rounded ${
          page === 1 ? 'text-gray-400 cursor-default' : 'text-black hover:text-purple-600'
        }`}
        disabled={page === 1}
        onClick={() => setPage(Math.max(1, page - 1))} // ✅ 함수형 대신 직접 계산
        aria-label="이전 페이지"
      >
        <ChevronLeft size={16} />
      </button>

      {/* 페이지 번호 */}
      {[...Array(totalPages)].map((_, i) => {
        const pageNumber = i + 1;
        const isCurrent = page === pageNumber;
        return (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            disabled={isCurrent}
            className={`w-8 h-8 text-sm rounded-md transition ${
              isCurrent
                ? 'bg-[#6201E0] text-white font-semibold cursor-default'
                : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700 cursor-pointer'
            }`}
            aria-current={isCurrent ? 'page' : undefined}
            aria-label={`페이지 ${pageNumber}`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* 다음 페이지 */}
      <button
        className={`p-1 rounded ${
          page === totalPages
            ? 'text-gray-400 cursor-default'
            : 'text-black hover:text-purple-600'
        }`}
        disabled={page === totalPages}
        onClick={() => setPage(Math.min(totalPages, page + 1))} // ✅ 함수형 대신 직접 계산
        aria-label="다음 페이지"
      >
        <ChevronRight size={16} />
      </button>

      {/* 마지막으로 */}
      <button
        className={`p-1 rounded ${
          page === totalPages
            ? 'text-gray-400 cursor-default'
            : 'text-black hover:text-purple-600'
        }`}
        disabled={page === totalPages}
        onClick={() => setPage(totalPages)}
        aria-label="마지막으로"
      >
        <ChevronsRight size={16} />
      </button>
    </div>
  );
}
