// 비밀번호 찾기 폼 컴포넌트
// 이메일 인증 기반 비밀번호 찾기 기능 제공
// 인증코드 전송 시 타이머 작동 및 입력 필드 활성화
// 인증코드 타이머가 만료되면 자동 비활성화
// 이메일 전송 성공 시 Toast 메시지로 안내
// 타이머/폼 상태 관리는 모두 useState로 내부 처리하며,
// 상위 컴포넌트에서는 모달 열고 닫기만 제어

// 주의사항:
// - 타이머는 useCountdown 커스텀 훅 사용
// - 이메일 전송 이후 버튼 상태 및 입력값 관련 로직은 UI 우선 고려
// - 인증코드 확인 로직은 구현되어 있지 않으며, 백엔드 연동 시 추가 필요

import React, { useState } from 'react';
import CloseButton from '@components/common/CloseButton';
import { TbLock } from 'react-icons/tb';
import useCountdown from '@hooks/useCountdown';
import { formatTime } from '@utils/formatTime';
import Toast from '@components/common/Toast';
import Input from '@components/common/Input';
import Button from '@components/common/Button';
import ModalHeader from '@components/common/ModalHeader';

interface FindPwFormProps {
  onClose: () => void;
  onResetPwOpen: () => void;
}

const FindPwForm: React.FC<FindPwFormProps> = ({ onClose, onResetPwOpen }) => {
  // 이메일, 인증코드 입력 상태
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  // 인증코드 관련 상태
  const [emailSent, setEmailSent] = useState(false);  // Toast 표시용
  const [codeInputEnabled, setCodeInputEnabled] = useState(false); // 인증코드 입력 가능 여부
  const [isTimerVisible, setIsTimerVisible] = useState(false); // 타이머 UI 표시 여부

  // 타이머 훅
  const { timeLeft, start } = useCountdown({
    duration: 300,
    onExpire: () => {
      setCodeInputEnabled(false);
      setIsTimerVisible(false);
    }
  });
  
  // 인증코드 전송 버튼 클릭 시
  const handleSendCode = () => {
    if (!email.trim()) return;
    setEmailSent(true); // Toast 표시
    setCodeInputEnabled(true); // 인증코드 입력 가능
    setIsTimerVisible(true);
    start(); // 타이머 시작

    setTimeout(() => {
      setEmailSent(false); // Toast 자동 숨김
    }, 5000);
  };

  return (
    <div className="bg-white w-[396px] rounded-xl p-[24px] relative flex flex-col items-center">
      {/* 전송 완료 토스트 메시지 */}
      {emailSent && <Toast message="전송 완료! 이메일을 확인해주세요." />}
      
      {/* 모달 닫기 버튼 */}
      <CloseButton onClick={onClose} className = "top-[10px]"/>

      {/* 헤더 (아이콘, 제목, 설명) */}
      <ModalHeader
        icon={<TbLock className="text-[#6201E0]" />}
        title="비밀번호 찾기"
        description="이메일로 비밀번호 재설정 링크를 보내드려요."
      />

      {/* 이메일 입력 영역 */}
      <div className="w-full mb-[2px]">
        <label className="text-[16px] text-[#121212] mb-[8px] block">
          이메일<span className="text-[#EC0037] ml-1">*</span>
        </label>
        <div className="flex items-center">

          {/* 이메일 인풋 */}
          <div className="relative" style={{ width: '228px', height: '48px' }}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="가입한 이메일을 입력해 주세요."
            fullWidth={false}
            noMarginBottom
            className="w-[228px] h-[48px] px-3 rounded border border-[#BDBDBD] text-[14px] 
            placeholder-[#BDBDBD] focus:outline-none"
          />
          </div>

          {/* 인증코드 전송 버튼 */}
          <div style={{ width: '112px', height: '48px' }} className="ml-[8px]">
            <Button
              onClick={handleSendCode}
              fullWidth
              className="h-full bg-[#ECECEC] border border-[#BDBDBD] text-[#4D4D4D] text-[16px] rounded"
            >
              인증코드전송
            </Button>
          </div>
        </div>
      </div>

      {/* 인증코드 입력 영역 */}
      <div className="w-full mb-[32px] mt-[16px]">
        <div className="flex items-center">
          <div className="relative w-[228px] h-[48px]">
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={
                codeInputEnabled
                  ? '인증번호를 입력해주세요'
                  : '인증번호 6자리를 입력해주세요'
              }
              disabled={!codeInputEnabled}
              className="pr-[64px]"
              noMarginBottom
            />

            {/* 타이머 표시 */}
            {codeInputEnabled && isTimerVisible && (
              <span className="absolute right-[16px] top-1/2 -translate-y-1/2 text-[#EC0037] 
              text-[14px] leading-none">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>

          {/* 인증코드 확인 버튼 */}
          <div style={{ width: '112px', height: '48px' }} className="ml-[8px]">
            <Button
              disabled={!codeInputEnabled}
              fullWidth
              className="h-full text-[16px] bg-[#ECECEC] border border-[#BDBDBD] text-[#4D4D4D] rounded"
            >
              인증코드확인
            </Button>
          </div>
        </div>
      </div>

      {/* 제출 버튼 */}
      <Button
        onClick={() => {
          onClose(); // 모달 닫기
          onResetPwOpen(); // 비밀번호 재설정 모달 열기
        }}
        className="h-[52px] bg-[#6201E0] text-white text-[16px] rounded"
      >
        비밀번호 찾기
      </Button>
    </div>
  );
};

export default FindPwForm;