/**
 * 공통 모달 헤더 컴포넌트
 *
 * 아이콘 + 타이틀 + 선택적 설명 텍스트 출력
 * 중앙 정렬된 레이아웃 (모든 모달에서 상단에 사용)
 *
 * 사용 예시:
 * <ModalHeader
 *   icon={<GoPerson />}
 *   title="아이디 찾기"
 *   description="입력하신 정보와 일치하는 아이디입니다."
 * />
 */


import React from 'react';

interface ModalHeaderProps {
  icon: React.ReactNode; // 상단 아이콘 (React Element)
  title: string; // 제목 텍스트
  description?: string; // 선택 설명 텍스트 (없으면 생략)
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ icon, title, description }) => {
  return (
    <div className="mt-[14px] flex flex-col items-center mb-[40px]">
      <div className="w-[28px] h-[28px] bg-[#E8D9FD] rounded-full flex items-center justify-center mb-[8px]">
        {icon}
      </div>
      <h2 className="text-[20px] font-bold text-[#121212]">{title}</h2>
      {description && (
        <p className="text-[14px] text-[#121212] mt-[16px] text-center">{description}</p>
      )}
    </div>
  );
};

export default ModalHeader;