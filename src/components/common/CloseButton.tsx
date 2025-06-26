// 공통 닫기 버튼 컴포넌트
// 위치 조정이 필요한 경우 className을 통해 top, right 등의 Tailwind 클래스를 덮어쓸 수 있음
// 기본 스타일은 absolute + right-[24px] + top 지정 필요
// 사용 시 명확한 top 위치는 className으로 넘겨줘야 함 (예: "top-[8px]")
// ex) <CloseButton onClick={...} className="top-[8px]" />

import { IoClose } from 'react-icons/io5';

interface CloseButtonProps {
  onClick: () => void;
  className?: string; // 위치 조정용 클래스
}

const CloseButton = ({ onClick, className = '' }: CloseButtonProps) => (
  <button
    onClick={onClick}
    className={`cursor-pointer text-[#9D9D9D] absolute right-[24px] z-10 ${className}`}
    aria-label="닫기"
  >
    <IoClose className="w-[20px] h-[20px]" />
  </button>
);

export default CloseButton;