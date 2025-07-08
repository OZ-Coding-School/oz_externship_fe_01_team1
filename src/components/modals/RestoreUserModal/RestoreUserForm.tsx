import ModalHeader from '@components/common/ModalHeader';
import CloseButton from '@components/common/CloseButton';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import Toast from '@components/common/Toast';
import { GrPowerReset } from "react-icons/gr";
import { useState } from 'react';
import useCountdown from '@hooks/useCountdown';
import { formatTime } from '@utils/formatTime';

interface Props {

  onClose: () => void;
  onVerified: () => void;
}

const RestoreUserForm = ({ onVerified, onClose }: Props) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [codeInputVisible, setCodeInputVisible] = useState(false);

  const { timeLeft, start } = useCountdown({
    duration: 300,
    onExpire: () => setCodeInputVisible(false),
  });

  const handleSendCode = () => {
    if (!email.trim()) return;
    setShowToast(true);
    setCodeInputVisible(true);
    start();
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div>
      {showToast && <Toast message="전송 완료! 이메일을 확인해주세요." 
      classname="mt-[20px]"/>}
      <CloseButton onClick={onClose} className="top-[24px]" />
      <div className="mb-[40px]">
        <ModalHeader
          icon={<GrPowerReset size={16} />}
          title="계정 다시 사용하기"
          noMarginBottom
        />
        <p className="mt-[10px] text-[14px] text-[#4d4d4d] text-center">
          입력하신 이메일로 인증번호를 보내드릴게요.
        </p>
      </div>

      {/* 이메일 입력 */}
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
            className="flex-1 w-[228px]"
          />
          <Button
            type="button"
            fullWidth={false}
            onClick={handleSendCode}
            className="w-[112px] h-[48px] text-[#1E1E1E] bg-[#F5F5F5] border border-[#CECECE] cursor-pointer"
          >
            인증코드전송
          </Button>
        </div>
      </div>

      {/* 인증번호 입력 */}
      <div className="flex gap-[8px] mb-[24px]">
        <div className="relative w-[228px]">
          <Input
            placeholder={
              codeInputVisible
                ? '인증번호를 입력해주세요'
                : '인증번호 6자리를 입력해주세요'
            }
            value={code}
            fullWidth={false}
            onChange={(e) => setCode(e.target.value)}
            className="w-full pr-[60px]"
            maxLength={6}
          />
          {codeInputVisible && (
            <span className="absolute right-[12px] top-[24px] -translate-y-1/2 text-[#EC0037] text-[12px]">
              {formatTime(timeLeft)}
            </span>
          )}
        </div>
        <Button
          type="button"
          fullWidth={false}
          className="w-[112px] text-[#1E1E1E] bg-[#F5F5F5] border border-[#CECECE] cursor-pointer"
        >
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
    </div>
  );
};

export default RestoreUserForm;