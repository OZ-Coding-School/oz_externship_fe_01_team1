import { useState } from 'react';
import Input from '@components/common/Input';
import Button from '@components/common/Button';


const ChangePwForm = () => {
    const [newPw, setNewPw] = useState('');
    const [confirmPw, setConfirmPw] = useState('');
  
    const isPwValid = newPw.length >= 8;
    const isPwMatch = newPw === confirmPw;
  
    const isFormValid = isPwValid && isPwMatch;
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (!isFormValid) return;
      // TODO: API 연결 등 로직
    };
  
    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
        {/* 새 비밀번호 */}
        <div className="flex items-center gap-[20px]">
          <label className="w-[120px] text-[16px] text-[#121212] leading-[48px]">
            새 비밀번호
          </label>
          <Input
            type="password"
            placeholder="새 비밀번호를 입력해주세요."
            value={newPw}
            onChange={(e) => setNewPw(e.target.value)}
            error={newPw.length > 0 && !isPwValid}
            success={isPwValid}
            focusBorderColor="focus:border-[#6201E0]"
            fullWidth={false}
            noMarginBottom
            className="w-[533px]"
          />
      </div>
  
        {/* 비밀번호 확인 */}
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
            focusBorderColor="focus:border-[#6201E0]"
            fullWidth={false}
            noMarginBottom
            className="w-[533px]"
          />
      </div>
  
        {/* 버튼 */}
        <div className="flex justify-end mt-[10px]">
          <Button
            type="submit"
            fullWidth={false}
            className={`w-[120px] ${
              isFormValid
                ? 'bg-[#6201E0] text-white'
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