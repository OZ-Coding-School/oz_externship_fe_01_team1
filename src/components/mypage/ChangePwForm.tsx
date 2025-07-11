import { useState } from 'react';
import { GoEye, GoEyeClosed } from "react-icons/go";
import Input from '@components/common/Input';
import Button from '@components/common/Button';

const ChangePwForm = () => {
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isPwFocused, setIsPwFocused] = useState(false);

  const isPwValid = newPw.length >= 8;
  const isPwMatch = newPw === confirmPw;
  const isFormValid = isPwValid && isPwMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: API 연결 등
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
      {/* 새 비밀번호 */}
      <div>
        <div className="flex items-center gap-[20px]">
          <label className="w-[120px] text-[16px] text-[#121212] leading-[48px]">
            새 비밀번호
          </label>
          <div className="relative w-[533px]">
            <Input
              type={showPw ? 'text' : 'password'}
              placeholder="새 비밀번호를 입력해주세요."
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
              onFocus={() => setIsPwFocused(true)}
              onBlur={() => setIsPwFocused(false)}
              error={newPw.length > 0 && !isPwValid}
              success={isPwValid}
              focusBorderColor="focus:border-[#121212]"
              fullWidth={false}
              noMarginBottom
              className="w-[533px] pr-[44px]"
            />
            {isPwValid && (
              <button
                type="button"
                onClick={() => setShowPw((prev) => !prev)}
                className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#4D4D4D] focus:outline-none"
              >
                {showPw ? <GoEye size={18} /> : <GoEyeClosed size={18} />}
              </button>
            )}
          </div>
        </div>
        {/* 유효성 메시지 */}
        {isPwFocused && (
          <p className="text-[12px] text-[#9d9d9d] mt-[8px] ml-[130px]">
            * 6~15자의 영문 대/소문자, 숫자 및 특수문자 조합
          </p>
        )}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <div className="flex items-center gap-[20px]">
          <label className="w-[120px] text-[16px] text-[#121212] leading-[48px]">
            새 비밀번호 확인
          </label>
          <Input
            type="password"
            placeholder="새 비밀번호를 한 번 더 입력해주세요."
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            error={confirmPw.length > 0 && !isPwMatch}
            success={isPwMatch && confirmPw.length > 0}
            focusBorderColor="focus:border-[#121212]"
            fullWidth={false}
            noMarginBottom
            className="w-[533px]"
          />
        </div>
        {/* 유효성 메시지 */}
        {isPwMatch && confirmPw.length > 0 && (
          <p className="text-[12px] text-[#00C27C] mt-[8px] ml-[130px]">
            * 비밀번호가 일치합니다.
          </p>
        )}
        {!isPwMatch && confirmPw.length > 0 && (
          <p className="text-[12px] text-[#EC0037] mt-[8px] ml-[130px]">
            * 비밀번호가 일치하지 않습니다.
          </p>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex justify-end mt-[10px]">
      <Button
        type="submit"
        fullWidth={false}
        className={`w-[120px] text-white rounded cursor-pointer ${
          isFormValid
            ? 'bg-[#6201E0] hover:bg-[#4e01b3] active:bg-[#3b0186]'
            : 'bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed'
        }`}
        disabled={!isFormValid}
      >
        변경하기
      </Button>
      </div>
    </form>
  );
};

export default ChangePwForm;