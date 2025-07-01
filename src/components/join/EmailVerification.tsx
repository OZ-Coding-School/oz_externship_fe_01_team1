import { useState, useMemo } from 'react';
import { Input, Button } from '@components/common';

interface EmailVerificationProps {
  email: string;
  setEmail: (value: string) => void;
}

export default function EmailVerification({ email, setEmail }: EmailVerificationProps) {
  const [authCode, setAuthCode] = useState('');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = useMemo(() => email.length > 0 && emailRegex.test(email), [email]);
  const showError = email.length > 0 && !isValidEmail;
  const showSuccess = email.length > 0 && isValidEmail;

  const isAuthCodeSuccess = authCode.length === 6;
  const isAuthCodeError = authCode.length > 0 && authCode.length < 6; 

  return (
    <div className="flex flex-col mb-[44px]">
      <div className="flex gap-[16px] items-center mb-[12px]">
        <label className="text-[16px] font-[500]">
          이메일<span className="text-red-500 ml-1">*</span>
        </label>
        <div className="text-[14px] font-[600] text-[#6201E0]">
          로그인 시 아이디로 사용합니다.
        </div>
      </div>

      <div className="flex gap-[12px]">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일(example@gmail.com)"
          error={showError}
          success={showSuccess}
          noMarginBottom
          focusBorderColor="focus:border-[#6201E0]"
          className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[346px]"
          fullWidth={false}
        />
        <Button
          fullWidth={false}
          disabled={!email}
          className={`
            w-[112px] text-[16px] border font-semibold
            ${
              email
                ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
                : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'
            }
          `}
        >
          인증번호전송
        </Button>
      </div>

      {(showError || showSuccess) && (
        <div className="pl-[2px] mt-[8px] min-h-[20px]">
          {showError && (
            <p className="text-[#EC0037] text-[12px]">* 이미 가입된 이메일입니다.</p>
          )}
          {showSuccess && (
            <p className="text-[#00C27C] text-[12px]">* 사용 가능한 이메일입니다.</p>
          )}
        </div>
      )}

      <div className="flex gap-[12px] mt-[12px]">
        <Input
        value={authCode}
        onChange={(e) => setAuthCode(e.target.value)}
        placeholder="인증번호 6자리를 입력해주세요"
        error={isAuthCodeError}
        success={isAuthCodeSuccess}
        focusBorderColor="focus:border-[#6201E0]"
        className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[346px]"
        fullWidth={false}
        noMarginBottom
        />
        <Button
          fullWidth={false}
          disabled={authCode.length < 6}
          className={`
            w-[112px] text-[16px] border font-semibold
            ${
              authCode.length >= 6
                ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
                : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'
            }
          `}
        >
          인증번호확인
        </Button>
      </div>
    </div>
  );
}