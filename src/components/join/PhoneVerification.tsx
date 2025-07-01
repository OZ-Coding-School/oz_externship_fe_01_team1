import { useState } from 'react';
import { Input, Button } from '@components/common';

interface PhoneVerificationProps {
  phone1: string;
  phone2: string;
  phone3: string;
  setPhone1: (value: string) => void;
  setPhone2: (value: string) => void;
  setPhone3: (value: string) => void;
}

export default function PhoneVerification({
  phone1,
  phone2,
  phone3,
  setPhone1,
  setPhone2,
  setPhone3,
}: PhoneVerificationProps) {
  const [code, setCode] = useState('');
  const isPhoneSuccess = phone1.length >= 3 && phone2.length >= 3 && phone3.length >= 3;
  const isPhoneError =
    phone1.length > 0 || phone2.length > 0 || phone3.length > 0
      ? !isPhoneSuccess
      : false;
  const isCodeEntered = code.length > 0;
  const isCodeValid = code.length === 6;
  

  return (
    <div className="flex flex-col">
      <label className="text-[16px] font-[500] mb-[12px]">
        휴대전화<span className="text-red-500 ml-1">*</span>
      </label>

      <div className="flex w-full gap-[20px]">
        <div className="flex grow min-w-0 gap-[5px] items-center">
          <Input
            value={phone1}
            onChange={(e) => setPhone1(e.target.value)}
            placeholder="010"
            fullWidth={false}
            noMarginBottom
            focusBorderColor="focus:border-[#6201E0]"
            success={isPhoneSuccess}
            error={isPhoneError}
            className="min-w-0 grow w-[108px]"
          />
          <span className="text-[14px] text-[#bdbdbd] mb-[14px]">-</span>
          <Input
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            placeholder="1234"
            fullWidth={false}
            noMarginBottom
            focusBorderColor="focus:border-[#6201E0]"
            success={isPhoneSuccess}
            error={isPhoneError}
            className="min-w-0 grow w-[108px]"
          />
          <span className="text-[14px] text-[#bdbdbd] mb-[14px]">-</span>
          <Input
            value={phone3}
            onChange={(e) => setPhone3(e.target.value)}
            placeholder="5678"
            noMarginBottom
            fullWidth={false}
            focusBorderColor="focus:border-[#6201E0]"
            success={isPhoneSuccess}
            error={isPhoneError}
            className="min-w-0 grow w-[108px]"
          />
        </div>
        {/* 인증번호전송 버튼 */}
        <Button
          fullWidth={false}
          disabled={!isPhoneSuccess}
          className={`
            w-[112px] text-[16px] border font-semibold mt-[8px]
            ${isPhoneSuccess
              ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
              : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'}
          `}
        >
          인증번호전송
        </Button>
      </div>

      {/* ✅ 유효성 메시지는 Button 바깥에서! */}
      {(isPhoneError || isPhoneSuccess) && (
        <div className="pl-[2px] mt-[5px] min-h-[20px]">
          {isPhoneError && (
            <p className="text-[#EC0037] text-[12px]">* 이미 가입에 사용된 휴대전화 번호입니다.</p>
          )}
          {isPhoneSuccess && (
            <p className="text-[#00C27C] text-[12px]">* 사용 가능한 휴대전화 번호입니다.</p>
          )}
        </div>
      )}

      {/* 인증번호 입력 */}
      <div className="flex gap-[12px] mt-[12px]">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="인증번호 6자리를 입력해주세요"
          className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[356px]"
          focusBorderColor="focus:border-[#6201E0]"
          error={isCodeEntered && !isCodeValid}
          success={isCodeEntered && isCodeValid}
          fullWidth={false}
        />
        <Button
          fullWidth={false}
          disabled={!isCodeEntered}
          className={`
            w-[112px] text-[16px] border font-semibold
            ${isCodeEntered
              ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
              : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'}
          `}
        >
          인증번호확인
        </Button>
      </div>
    </div>
  );
}
