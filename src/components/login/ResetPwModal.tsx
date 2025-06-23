import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { TbLock } from 'react-icons/tb';
import { FaCheck } from 'react-icons/fa6';

const ResetPwModal = ({ onClose }: { onClose: () => void }) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showSuccessOnly, setShowSuccessOnly] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleConfirm = () => {
    if (!password || password !== passwordCheck) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    setShowSuccessOnly(true);

    setTimeout(() => {
      setShowSuccessOnly(false);
      onClose(); // 로그인 이동 처리
    }, 10000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(18,18,18,0.6)] flex items-center justify-center">
      {/* ✅ 성공 팝업만 보여야 할 때 */}
      {showSuccessOnly ? (
        <div className="bg-white w-[396px] rounded-xl shadow text-center flex justify-center items-center">
        <div className="flex flex-col items-center py-[24px]">
            <div className="w-[24px] h-[24px] bg-[#14C786] rounded-full flex items-center justify-center mb-[16px]">
            <FaCheck className="text-white text-[16px]" />
            </div>
            <p className="text-[20px] font-bold text-[#121212] mb-[16px]">비밀번호 변경 완료!</p>
            <p className="text-[16px] text-[#4D4D4D] text-center">잠시 후 로그인 페이지로 이동합니다.</p>
        </div>
        </div>
      ) : (
        // ❗ 모달 본문 UI
        <div className="bg-white w-[396px] p-[24px] rounded-xl relative">
          <button
            onClick={onClose}
            className="cursor-pointer absolute top-[24px] right-[24px] text-[#9D9D9D]"
          >
            <IoClose className="w-[20px] h-[20px]" />
          </button>

          <div className="mt-[34px] flex flex-col items-center mb-[40px]">
            <div className="w-[28px] h-[28px] rounded-full bg-[#E8D9FD] flex items-center justify-center mb-[8px]">
              <TbLock className="text-[#6201E0]" />
            </div>
            <h2 className="text-[20px] text-[#121212] font-bold">비밀번호 재설정</h2>
            <p className="text-[14px] text-[#4D4D4D] mt-[12px] text-center">
              신규 비밀번호를 입력해주세요.
            </p>
          </div>

          <div className="mb-[24px]">
            <label className="text-[16px] text-[#121212] font-medium">
              새 비밀번호 <span className="text-[#EC0037]">*</span>
              <span className="text-[#6201E0] text-[14px] ml-[8px] whitespace-nowrap">
                6~15자의 영문 대소문자, 숫자, 특수문자 포함
              </span>
            </label>

            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full h-[48px] rounded px-3 mt-[12px] text-[14px] placeholder-[#BDBDBD] focus:outline-none ${
                passwordError ? 'border border-[#EC0037]' : 'border border-[#BDBDBD]'
              }`}
            />

            <input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
              className={`w-full h-[48px] rounded px-3 mt-[12px] text-[14px] placeholder-[#BDBDBD] focus:outline-none ${
                passwordError ? 'border border-[#EC0037]' : 'border border-[#BDBDBD]'
              }`}
            />

            {passwordError && (
              <p className="text-[#EC0037] text-[14px] mt-[8px]">*비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <button
            className="w-[348px] h-[52px] bg-[#6201E0] text-white text-[16px] rounded cursor-pointer"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default ResetPwModal;