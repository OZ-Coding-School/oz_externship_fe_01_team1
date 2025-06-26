/**
 * 공통 토스트 메시지 컴포넌트
 *
 * 상단 중앙에 짧은 알림 메시지 출력
 * 인증메일 전송 성공 등 간단한 피드백 용도
 *
 * 사용 예시:
 * <Toast message="인증 메일이 전송되었습니다." />
 */

import React from 'react';
import { FaCheck } from 'react-icons/fa6';

interface ToastProps {
  message: string; // 토스트에 표시할 텍스트
}

const Toast: React.FC<ToastProps> = ({ message }) => {
  return (
    <div className="fixed top-[160px] left-1/2 -translate-x-1/2 w-auto max-w-[360px] h-[48px] bg-[#FAFAFA] 
        border border-[#ECECEC] rounded flex items-center px-[16px] shadow z-[9999]">
      <div className="w-[20px] h-[20px] bg-[#14C786] rounded-full flex items-center justify-center mr-[12px]">
        <FaCheck className="text-white text-[12px]" />
      </div>
      <p className="text-[14px] text-[#4d4d4d] whitespace-nowrap">{message}</p>
    </div>
  );
};

export default Toast;