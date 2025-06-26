/**
 * 공통 Button 컴포넌트
 * 
 * 기본 사이즈: h-[48px], text-[14px], w-full 적용
 * 너비 조절 필요 시 fullWidth={false} + className으로 직접 width 지정
 * 외부에서 스타일을 완전히 커스터마이징 가능 (색상, 둥근 모서리 등)
 * 
 * 사용 예시:
 * <Button
 *   fullWidth={false}
 *   className="w-[112px] bg-[#6201E0] text-white"
 * >
 *   확인
 * </Button>
 */

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean; // 기본값 true, false면 w-full 제거됨
  className?: string;  // 외부에서 커스텀 스타일 적용 가능
}

const Button: React.FC<ButtonProps> = ({ fullWidth = true, className = '', children, ...props }) => {
  return (
    <button
      {...props}
      className={`h-[48px] rounded text-[14px] flex items-center justify-center cursor-pointer
        ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;