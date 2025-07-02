import { Input } from '@components/common';

interface NameFieldProps {
  name: string;
  setName: (value: string) => void;
}

export default function NameField({ name, setName }: NameFieldProps) {
  const isValidName = name.length >= 2;

  return (
    <div className="flex flex-col">
      <label className="text-[16px] text-[#121212]  mb-[20px]">
        이름<span className="text-[#EC0037] ml-1">*</span>
      </label>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="이름을 입력해주세요"
        noMarginBottom
        focusBorderColor="focus:border-[#6201E0]"
        success={name.length > 0 && isValidName}
        error={name.length > 0 && !isValidName}
        className="placeholder:font-[400] placeholder:text-[14px]"
      />
    </div>
  );
}