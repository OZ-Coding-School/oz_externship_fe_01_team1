/**
 * 공통 Input 컴포넌트
 *
 * 기본 스타일
 * - 기본 사이즈: w-full, h-[48px]
 * - placeholder 색상: #BDBDBD
 * - 기본 테두리 색상: #BDBDBD
 * - 라벨 출력 가능 (`label` prop)
 *
 * 유효성 상태 스타일링
 * - `error={true}` → 테두리 색상: 빨간색 (#EC0037)
 * - `success={true}` → 테두리 색상: 초록색 (#00C27C)
 * - 둘 다 없을 경우 기본 회색 테두리 유지
 * ※ error, success는 동시에 true가 되지 않도록 상위 컴포넌트에서 제어해야 함
 *
 * 포커스 스타일 제어
 * - `focusBorderColor="focus:border-[#6201E0]"` 형식으로 전달하면
 *   포커스 시 테두리 색상 커스터마이징 가능
 * - 단, error 또는 success 상태일 때는 focus 스타일 무시됨
 *
 * 레이아웃 커스터마이징
 * - `fullWidth={false}` → w-full 제거
 * - `noMarginBottom={true}` → 하단 여백(mb-[16px]) 제거
 * - `className`으로 스타일 추가 가능
 *
 * 사용 예시:
 * <Input
 *   placeholder="이메일 입력"
 *   error={isInvalid}
 *   success={isValid}
 *   focusBorderColor="focus:border-[#6201E0]"
 * />
 */

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string; // label 텍스트 출력 여부
  error?: boolean; // 오류 상태일 경우 border 색상 변경
  success?: boolean; // 성공 상태일 경우 border 색상 변경
  fullWidth?: boolean; // 기본값 true, false면 w-full 제거
  className?: string; // 사용자 정의 스타일
  noMarginBottom?: boolean; // 기본 하단 여백 제거용
  focusBorderColor?: string; // focus border 스타일 외부 제어용
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  success,
  fullWidth = true,
  className = '',
  noMarginBottom = false,
  focusBorderColor,
  ...props
}) => {
  const baseBorder = 'border';
  const borderColor = error
    ? 'border-[#EC0037]'
    : success
    ? 'border-[#00C27C]'
    : 'border-[#BDBDBD]';

  const focusRing = !error && !success ? focusBorderColor ?? '' : '';

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
          ${baseBorder} ${borderColor} ${focusRing}
          ${fullWidth ? 'w-full' : ''} ${className}`}
      />
    </div>
  );
};

export default Input;
