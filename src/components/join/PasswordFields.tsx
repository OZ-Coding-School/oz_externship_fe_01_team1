import { Input } from '@components/common';

interface PasswordFieldsProps {
  password: string;
  confirmPw: string;
  setPassword: (value: string) => void;
  setConfirmPw: (value: string) => void;
}

export default function PasswordFields({
  password,
  confirmPw,
  setPassword,
  setConfirmPw,
}: PasswordFieldsProps) {

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,15}$/;
  const isPasswordValid = passwordRegex.test(password);
  const isConfirmFilled = confirmPw.length > 0;
  const isSame = password === confirmPw;
  
  const showError = isConfirmFilled && !isSame;
  const showSuccess = isConfirmFilled && isSame;

  return (
    <div className="flex flex-col">
      <div className="inline-flex items-center mb-[20px]">
        <span className="text-[16px] font-[500] text-[#121212]">비밀번호</span>
        <span className="text-red-500 ml-[4px] text-[16px]">*</span>
        <span className="ml-[8px] text-[14px] font-[600] text-[#6201E0]">
          6~15자의 영문, 숫자, 특수문자 포함
        </span>
      </div>

      <div className="flex flex-col gap-[12px]">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          success={isPasswordValid}
          error={password.length > 0 && !isPasswordValid}
          noMarginBottom
          focusBorderColor="focus:border-[#6201E0]"
          className="placeholder:text-[14px] placeholder:font-[400] w-[480px]"
        />
        <Input
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          placeholder="비밀번호를 다시 입력해주세요"
          success={showSuccess}
          error={showError}
          noMarginBottom
          focusBorderColor="focus:border-[#6201E0]"
          className="placeholder:text-[14px] placeholder:font-[400] w-[480px]"
        />
      </div>

      {(showSuccess || showError) && (
        <div className="pl-[2px] mt-[8px] min-h-[20px]">
          {showError && (
            <p className="text-[#EC0037] text-[12px]">* 비밀번호가 일치하지 않습니다.</p>
          )}
          {showSuccess && (
            <p className="text-[#00C27C] text-[12px]">* 비밀번호가 일치합니다.</p>
          )}
        </div>
      )}
    </div>
  );
}