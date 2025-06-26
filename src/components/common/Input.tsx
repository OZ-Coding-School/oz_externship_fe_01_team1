/**
 * 공통 Input 컴포넌트
 *
 * - 기본적으로 w-full, h-[48px] 사이즈
 * - label과 오류 상태 표시 지원
 * - className으로 커스터마이징 가능
 * - fullWidth={false}를 주면 w-full 제거 가능
 * - noMarginBottom={true}로 기본 하단 여백(mb-[16px]) 제거 가능
 *
 * 사용 예시:
 * <Input placeholder="이메일 입력" fullWidth={false} noMarginBottom className="w-[228px]" />
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // label 텍스트 출력 여부
  error?: boolean; // 오류 상태일 경우 border 색상 변경
  fullWidth?: boolean; // 기본값 true, false면 w-full 제거
  className?: string; // 사용자 정의 스타일
  noMarginBottom?: boolean; // 기본 하단 여백 제거용
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = true,
  className = '',
  noMarginBottom = false,
  ...props
}) => {
  return (
    <div className={`${fullWidth ? 'w-full' : ''} ${noMarginBottom ? '' : 'mb-[16px]'}`}>
      {label && (
        <label className="text-[16px] text-[#121212] block mb-[8px]">
          {label}
          {props.required && <span className="text-[#EC0037] ml-1">*</span>}
        </label>
      )}
      <input
        {...props}
        className={`h-[48px] rounded px-3 text-[14px] placeholder-[#BDBDBD] focus:outline-none
          ${error ? 'border border-[#EC0037]' : 'border border-[#BDBDBD]'}
          ${fullWidth ? 'w-full' : ''} ${className}`}
      />
    </div>
  );
};

export default Input;