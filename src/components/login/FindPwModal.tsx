import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { TbLock } from 'react-icons/tb';
import { FaCheck } from "react-icons/fa6";

interface FindPwModalProps {
  onClose: () => void;
  onResetPwOpen: () => void;
}

const FindPwModal: React.FC<FindPwModalProps> = ({ onClose, onResetPwOpen }) => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [emailSent, setEmailSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [codeInputEnabled, setCodeInputEnabled] = useState(false);

  const handleSendCode = () => {
    if (!email.trim()) return;
    setEmailSent(true);
    setCodeInputEnabled(true);
    setTimeLeft(300); // 5분

    setTimeout(() => {
      setEmailSent(false);
    }, 5000);
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCodeInputEnabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (sec: number) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="fixed inset-0 bg-[rgba(18,18,18,0.6)] z-50 flex justify-center items-center">
      <div className="bg-white w-[396px] h-auto p-[24px] rounded-xl relative flex flex-col items-center">

        {/* ✅ 토스트 메시지 */}
        {emailSent && (
          <div className="absolute -top-[68px] left-1/2 -translate-x-1/2 w-auto max-w-[360px] h-[48px] bg-[#FAFAFA] border border-[#ECECEC] rounded flex items-center px-[16px] shadow z-50">
            <div className="w-[20px] h-[20px] bg-[#14C786] rounded-full flex items-center justify-center mr-[12px]">
              <FaCheck className="text-white text-[12px]" />
            </div>
            <p className="text-[14px] text-[#4d4d4d] whitespace-nowrap">
              전송 완료! 이메일을 확인해주세요.
            </p>
          </div>
        )}

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="cursor-pointer absolute top-[24px] right-[24px] text-[#9D9D9D]">
          <IoClose className="w-[20px] h-[20px]" />
        </button>

        {/* 헤더 아이콘 및 텍스트 */}
        <div className="mt-[14px] flex flex-col items-center mb-[40px]">
          <div className="w-[28px] h-[28px] rounded-full bg-[#E8D9FD] flex items-center justify-center mb-[8px]">
            <TbLock className="text-[#6201E0]" />
          </div>
          <h2 className="text-[20px] text-[#121212] font-bold">비밀번호 찾기</h2>
          <p className="text-[14px] text-[#121212] mt-[16px] text-center">
            이메일로 비밀번호 재설정 링크를 보내드려요.
          </p>
        </div>

        {/* 이메일 입력 */}
        <div className="mb-[40px]">
          <label className="text-[16px] text-[#121212]">
            이메일<span className="text-[#EC0037] ml-1">*</span>
          </label>

          <div className="flex gap-2 mt-[16px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="가입한 이메일을 입력해 주세요."
              className="w-[228px] h-[48px] border border-[#BDBDBD] rounded px-3 text-[14px] placeholder-[#BDBDBD] focus:outline-none"
            />
            <button
              onClick={handleSendCode}
              className="w-[112px] h-[48px] bg-[#ECECEC] border border-[#BDBDBD] text-[14px] text-[#4D4D4D] rounded cursor-pointer"
            >
              인증코드전송
            </button>
          </div>

          {/* 인증번호 입력 + 타이머 */}
          <div className="flex gap-2 mt-[12px] items-center">
            <div className="relative w-[228px]">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                disabled={!codeInputEnabled}
                placeholder={
                  codeInputEnabled
                    ? '인증번호를 입력해주세요'
                    : '인증번호 6자리를 입력해주세요'
                }
                className="w-full h-[48px] border border-[#BDBDBD] rounded px-3 text-[14px] placeholder-[#BDBDBD] focus:outline-none disabled:bg-[#F5F5F5] pr-[50px]"
              />
              {codeInputEnabled && (
                <span className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#EC0037] text-[14px] pointer-events-none">
                  {formatTime(timeLeft)}
                </span>
              )}
            </div>

            <button
              disabled={!codeInputEnabled}
              className="w-[112px] h-[48px] bg-[#ECECEC] border border-[#BDBDBD] text-[14px] text-[#4D4D4D] rounded cursor-pointer"
            >
              인증코드확인
            </button>
          </div>
        </div>

        {/* 비밀번호 찾기 버튼 */}
        <button
          className="w-[348px] h-[52px] bg-[#6201E0] text-white text-[16px] rounded cursor-pointer"
          onClick={() => {
            onClose();         // 현재 모달 닫기
            onResetPwOpen();   // ResetPwModal 열기 요청
          }}
        >
          비밀번호 찾기
        </button>
      </div>
    </div>
  );
};

export default FindPwModal;