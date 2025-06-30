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
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="inline-flex items-center">
        <span className="text-[16px] font-[500] text-[#121212]">비밀번호</span>
        <span className="text-red-500 ml-[4px] text-[16px]">*</span>
        <span className="ml-[8px] text-[14px] font-[600] text-[#6201E0]">
          8~15자의 영문 대소문자, 숫자, 특수문자 포함
        </span>
      </div>

      <div className="flex flex-col">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className="placeholder:text-[14px] placeholder:font-[400] w-[480px]"
        />
        <Input
          type="password"
          value={confirmPw}
          onChange={(e) => setConfirmPw(e.target.value)}
          placeholder="비밀번호를 다시 입력해주세요"
          className="placeholder:text-[14px] placeholder:font-[400] w-[480px]"
        />
      </div>
    </div>
  );
}