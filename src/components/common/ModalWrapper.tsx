/**
 * 공통 모달 Wrapper 컴포넌트
 *
 * 모달 바깥 배경 어둡게 처리 (dim 처리)
 * 자식 요소 중앙 정렬 & 모달 레이아웃 적용
 * width 조절 가능 (기본값: w-[396px])
 *
 * 사용 예시:
 * <ModalWrapper width="w-[420px]">
 *   <ModalHeader ... />
 *   <FindIdForm ... />
 * </ModalWrapper>
 */


import React from 'react';

interface ModalWrapperProps {
  children: React.ReactNode; // 모달 내부 콘텐츠
  width?: string; // 모달 너비 (Tailwind 클래스로 전달)
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, width = 'w-[396px]' }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(18,18,18,0.6)] z-50 flex justify-center items-center">
      <div
        className={`bg-white ${width} rounded-xl p-[24px] relative flex flex-col items-center`}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;