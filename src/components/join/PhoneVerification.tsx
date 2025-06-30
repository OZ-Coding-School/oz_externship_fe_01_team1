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
            className="min-w-0 grow w-[108px]"
          />
          <span className="text-[14px] text-[#bdbdbd] mb-[14px]">-</span>
          <Input
            value={phone2}
            onChange={(e) => setPhone2(e.target.value)}
            placeholder="1234"
            fullWidth={false}
            className="min-w-0 grow w-[108px]"
          />
          <span className="text-[14px] text-[#bdbdbd] mb-[14px]">-</span>
          <Input
            value={phone3}
            onChange={(e) => setPhone3(e.target.value)}
            placeholder="5678"
            fullWidth={false}
            className="min-w-0 grow w-[108px]"
          />
        </div>
        <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
          인증번호전송
        </Button>
      </div>
      <div className="flex gap-[12px]">
        <Input
          placeholder="인증번호 6자리를 입력해주세요"
          className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[356px]"
          fullWidth={false}
        />
        <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
          인증번호확인
        </Button>
      </div>
    </div>
  );
}