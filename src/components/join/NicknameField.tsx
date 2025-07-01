import { Input, Button } from '@components/common';

interface NicknameFieldProps {
  nickname: string;
  setNickname: (value: string) => void;
}

export default function NicknameField({ nickname, setNickname }: NicknameFieldProps) {
  const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
  const isValidNickname = nicknameRegex.test(nickname);

  return (
    <div className="flex flex-col mb-[44px]">
      <label className="text-[16px] text-[#121212] mb-[12px]">
        닉네임<span className="text-[#EC0037] ml-1">*</span>
      </label>

      <div className="flex">
        <Input
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해주세요"
          error={nickname.length > 0 && !isValidNickname}
          success={nickname.length > 0 && isValidNickname}
          fullWidth={false}
          focusBorderColor="focus:border-[#6201E0]"
          noMarginBottom
          className="
            flex-1 w-[356px] 
            placeholder:text-[14px] 
            placeholder:font-[400]
            mr-[12px]"
        />
        <Button
          fullWidth={false}
          disabled={!nickname}
          className={`
            w-[112px] text-[16px] border font-semibold
            ${
              nickname
                ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
                : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'
            }
          `}
        >
          중복확인
        </Button>
      </div>

      <div className="min-h-[20px] mt-[8px] pl-[2px]">
        {nickname && !isValidNickname && (
          <p className="text-[#EC0037] text-[12px] mb-[8px]">* 이미 사용 중인 닉네임입니다.</p>
        )}
        {nickname && isValidNickname && (
          <p className="text-[#00C27C] text-[12px]">* 사용 가능한 닉네임입니다.</p>
        )}
      </div>
    </div>
  );
}