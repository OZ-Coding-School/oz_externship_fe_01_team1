import ModalWrapper from '@components/common/ModalWrapper';
import ModalHeader from '@components/common/ModalHeader';
import CloseButton from '@components/common/CloseButton';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import { GoSync } from 'react-icons/go';
import { useState } from 'react';

interface Props {
  onVerified: () => void;
  onClose: () => void;
}

const RestoreUserForm = ({ onVerified, onClose }: Props) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  return (
    <ModalWrapper className="w-[396px] max-w-full relative">
    <CloseButton onClick={onClose} className="top-[24px]" />
    <div className="mb-[40px]">
      <ModalHeader
        icon={<GoSync size={16} />}
        title="계정 다시 사용하기"
        noMarginBottom 
      />
      <p className="mt-[10px] text-[14px] text-[#4d4d4d]">입력하신 이메일로 인증번호를 보내드릴게요.</p>
     </div>
      {/* 이메일 입력 + 인증코드 전송 버튼 */}
      <div className="flex flex-col gap-[8px]">
      <label className="text-[16px] text-[#121212] font-normal text-left block">
        이메일 <span className="text-[#EC0037]">*</span>
      </label>
      <div className="flex gap-[8px]">
        <Input
          placeholder="가입한 이메일을 입력해 주세요."
          value={email}
          fullWidth={false}
          noMarginBottom={false}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 w-[201px]"
        />
        <Button
          type="button"
          fullWidth={false}
          className="w-[140px] h-[48px] text-[#1E1E1E] bg-[#F5F5F5] border border-[#CECECE] cursor-pointer"
        >
          인증코드전송
        </Button>
      </div>
    </div>

      {/* 인증번호 입력 + 인증확인 버튼 */}
      <div className="flex gap-[8px] mb-[24px]">
        <Input
          placeholder="인증번호 6자리를 입력해주세요"
          value={code}
          fullWidth={false}
          onChange={(e) => setCode(e.target.value)}
          className="flex-1 w-[201px]"
          maxLength={6}
        />
        <Button 
          type="button" 
          fullWidth={false}
          className="w-[140px] text-[#1E1E1E] bg-[#F5F5F5] border border-[#CECECE] cursor-pointer">
          인증코드확인
        </Button>
      </div>

      {/* 확인 버튼 */}
      <Button
        type="button"
        className="w-full h-[48px] bg-[#6201E0] text-white rounded cursor-pointer"
        onClick={onVerified}
      >
        확인
      </Button>
    </ModalWrapper>
  );
};

export default RestoreUserForm;