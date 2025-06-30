import { Input, Button } from '@components/common';

interface EmailVerificationProps {
  email: string;
  setEmail: (value: string) => void;
}

export default function EmailVerification({ email, setEmail }: EmailVerificationProps) {
  return (
    <div className="flex flex-col">
      <div className="flex gap-[16px] items-center">
        <label className="text-[16px] font-[500] mb-[12px]">
          이메일<span className="text-red-500 ml-1">*</span>
        </label>
        <div className="text-[14px] font-[600] text-[#6201E0]  mb-[12px]">
          로그인 시 아이디로 사용합니다.
        </div>
      </div>
      <div className="flex gap-[12px]">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일(example@gmail.com)"
          className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[346px]"
          fullWidth={false}
        />
        <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
          인증번호전송
        </Button>
      </div>
      <div className="flex gap-[12px]">
        <Input
          placeholder="인증번호 6자리를 입력해주세요"
          className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[346px]"
          fullWidth={false}
        />
        <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
          인증번호확인
        </Button>
      </div>
    </div>
  );
}