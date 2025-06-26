// 비밀번호 재설정 입력 폼 컴포넌트
// 사용자에게 새 비밀번호와 확인값을 입력받고, 유효성 검사 결과를 UI에 표시함
// 부모 컴포넌트에서 상태를 관리하며 props로 전달됨

//주의 사항
// 비밀번호 유효성 체크는 외부에서 수행하며, 에러 메시지만 표시함
// 패스워드 입력 UI에 스타일 커스터마이징을 적용했으며, 공통 Input 컴포넌트를 사용함

import { TbLock } from 'react-icons/tb';
import { Input, Button } from '@components/common';

interface ResetPwFormProps {
  password: string; // 새 비밀번호 입력값
  passwordCheck: string; // 새 비밀번호 확인 입력값
  passwordError: boolean; // 두 비밀번호가 불일치할 경우 true 
  onChangePassword: (value: string) => void; // 비밀번호 변경 핸들러
  onChangePasswordCheck: (value: string) => void; // 비밀번호 확인 변경 핸들러
  onConfirm: () => void; // 확인 버튼 클릭 시 처리 로직
}

const ResetPwForm = ({
  password,
  passwordCheck,
  passwordError,
  onChangePassword,
  onChangePasswordCheck,
  onConfirm,
}: ResetPwFormProps) => {
  return (
    <div className="bg-white w-[396px] p-[24px] rounded-xl relative">

      {/* 헤더 영역 */}
      <div className="mt-[34px] flex flex-col items-center mb-[40px]">
        <div className="w-[28px] h-[28px] rounded-full bg-[#E8D9FD] flex items-center justify-center mb-[8px]">
          <TbLock className="text-[#6201E0]" />
        </div>
        <h2 className="text-[20px] text-[#121212] font-bold">비밀번호 재설정</h2>
        <p className="text-[14px] text-[#4D4D4D] mt-[12px] text-center">
          신규 비밀번호를 입력해주세요.
        </p>
      </div>

      {/* 비밀번호 입력 영역 */}
      <div className="mb-[40px]">
        <label className="text-[16px] text-[#121212] font-medium">
          새 비밀번호 <span className="text-[#EC0037]">*</span>
          <span className="text-[#6201E0] text-[14px] ml-[8px] whitespace-nowrap">
            6~15자의 영문 대소문자, 숫자, 특수문자 포함
          </span>
        </label>

        {/* 새 비밀번호 */}
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          fullWidth={false}
          noMarginBottom
          className={`w-full h-[48px] rounded px-3 mt-[20px] text-[14px] placeholder-[#BDBDBD] 
            focus:outline-none ${
              passwordError ? 'border border-[#EC0037]' : 'border border-[#BDBDBD]'
            }`}
        />

        {/* 비밀번호 확인 */}
        <Input
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          value={passwordCheck}
          onChange={(e) => onChangePasswordCheck(e.target.value)}
          fullWidth={false}
          noMarginBottom
          className={`w-full h-[48px] rounded px-3 mt-[16px] text-[14px] placeholder-[#BDBDBD] 
            focus:outline-none ${
              passwordError ? 'border border-[#EC0037]' : 'border border-[#BDBDBD]'
            }`}
        />

        {/* 에러 메시지 */}
        {passwordError && (
          <p className="text-[#EC0037] text-[14px] mt-[8px]">*비밀번호가 일치하지 않습니다.</p>
        )}
      </div>
      
      {/* 제출 버튼 */}
      <Button
        fullWidth={false}
        className="w-[348px] h-[52px] bg-[#6201E0] text-white text-[16px] rounded cursor-pointer"
        onClick={onConfirm}
      >
        확인
      </Button>
    </div>
  );
};

export default ResetPwForm;