import { Input } from '@components/common';

interface BirthFieldProps {
  birth: string;
  setBirth: (value: string) => void;
}

export default function BirthField({ birth, setBirth }: BirthFieldProps) {
  const isValidBirth = birth.length === 8;

  return (
    <div className="flex flex-col">
      <label className="text-[16px] text-[#121212] mb-[20px]">
        생년월일<span className="text-[#EC0037] ml-1">*</span>
      </label>
      <Input
        type="number"
        value={birth}
        onChange={(e) => {
          const onlyNumbers = e.target.value.replace(/[^0-9]/g, '');
          const limited = onlyNumbers.slice(0, 8);
          setBirth(limited);
        }}
        noMarginBottom
        focusBorderColor="focus:border-[#6201E0]"
        placeholder="8자리 입력해주세요 (ex.20001004)"
        success={birth.length > 0 && isValidBirth}
        error={birth.length > 0 && !isValidBirth}
        className="placeholder:font-[400] placeholder:text-[14px]"
      />
    </div>
  );
}