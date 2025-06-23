import React, { useState } from 'react';
import { GoPerson } from "react-icons/go";
import { IoClose } from "react-icons/io5";

interface FindIdModalProps {
  onClose: () => void;
}

const FindIdModal: React.FC<FindIdModalProps> = ({ onClose }) => {
  const [showError, setShowError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleFindId = () => {
    if (name.trim() === '' || phone.trim() === '') {
      setShowError(true);
      setIsSuccess(false);
    } else {
      setIsSuccess(true);
      setShowError(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(18,18,18,0.6)] z-50 flex justify-center items-center">
      <div className="bg-white w-[396px] h-auto p-[24px] rounded-xl relative">
        
        {/* 닫기 버튼은 공통 */}
        <button
          onClick={onClose}
          className="cursor-pointer mb-[10px] absolute top-[24px] right-[24px]"
        >
          <IoClose className="text-[#9D9D9D] w-[20px] h-[20px]" />
        </button>
  
        {isSuccess ? (
          // ✅ 성공 화면만 보여줌
          <div className="mt-[34px] flex flex-col items-center mb-[24px]">
          <div className="w-[28px] h-[28px] rounded-full bg-[#D0B3F6] flex items-center justify-center mb-[8px]">
            <GoPerson className="text-[#6201E0] text-l" />
          </div>
          <h2 className="text-center text-[20px] text-[#121212] font-bold">아이디 찾기</h2>
            <p className="text-[14px] text-[#121212] text-center mb-[32px]">
              입력하신 정보와 일치하는 아이디입니다.
            </p>
  
            <div className="w-[348px] h-[93px] bg-[#ECECEC] border border-[#BDBDBD] rounded 
             flex justify-center items-center 
             mb-[24px] text-[#121212] font-semibold text-[16px]">
            ozcoding@g****.com   {/* [TODO] 실제 API 응답으로 받은 이메일을 마스킹해서 표시 */}
            </div>
  
            <div className="flex gap-[12px] w-[348px]">
              <button className="w-[168px] h-[48px] border border-[#6201E0] text-[#6201E0] rounded">
                로그인
              </button>
              <button className="w-[168px] h-[48px] bg-[#6201E0] text-white rounded">
                비밀번호 찾기
              </button>
            </div>
          </div>
        ) : (
          // ❌ 기본 입력폼 + 에러 메시지
          <>
            {/* 아이콘 + 타이틀 */}
            <div className="mt-[34px] flex flex-col items-center mb-[24px]">
              <div className="w-[28px] h-[28px] rounded-full bg-[#D0B3F6] flex items-center justify-center mb-[8px]">
                <GoPerson className="text-[#6201E0] text-l" />
              </div>
              <h2 className="text-center text-[20px] text-[#121212] font-bold">아이디 찾기</h2>
              {showError && (
                <p className="text-[14px] text-[#EC0037] mt-[16px] text-center leading-[18px]">
                  입력한 이름과 휴대폰 번호로 등록된<br />이메일이 존재하지 않습니다.
                </p>
              )}
            </div>
  
            {/* 이름 입력 */}
            <div className="mb-[32px]">
              <label className="text-[16px] text-[#121212]">
                이름<span className="text-[#EC0037] ml-1">*</span>
              </label>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-[348px] h-[48px] border border-[#BDBDBD] rounded px-3 mt-[20px] text-[14px] placeholder-[#BDBDBD] focus:outline-none"
              />
            </div>
  
            {/* 휴대전화 입력 */}
            <div>
              <label className="text-[16px] text-[#121212] mb-[16px]">
                휴대전화<span className="text-[#EC0037] ml-1">*</span>
              </label>
              <div className="flex gap-2 mt-[16px]">
                <input
                  type="text"
                  placeholder="숫자만 입력해주세요"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-[228px] h-[48px] flex-1 border border-[#BDBDBD] rounded px-3 text-[14px] placeholder-[#BDBDBD] focus:outline-none"
                />
                <button className="w-[112px] h-[48px] bg-[#ECECEC] border border-[#BDBDBD] text-[16px] text-[#303030] rounded cursor-pointer">
                  인증번호 전송
                </button>
              </div>
            </div>
  
            {/* 인증번호 입력 */}
            <div>
              <div className="flex gap-2 mt-[16px]">
                <input
                  type="text"
                  placeholder="인증번호 6자리를 입력해주세요"
                  className="w-[228px] h-[48px] flex-1 border border-[#D9D9D9] rounded px-3 text-[14px] placeholder-[#BDBDBD] focus:outline-none"
                />
                <button className="w-[112px] h-[48px] bg-[#ECECEC] border border-[#BDBDBD] text-[16px] text-[#303030] rounded cursor-pointer">
                  인증번호 확인
                </button>
              </div>
            </div>
  
            {/* 아이디 찾기 버튼 */}
            <button
              className="w-[348px] h-[52px] bg-[#6201E0] text-white text-[16px] rounded cursor-pointer mt-[40px]"
              onClick={handleFindId}
            >
              아이디 찾기
            </button>
          </>
        )}
      </div>
      </div>
  );
};

export default FindIdModal;