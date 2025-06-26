/**
 * 공통 성공 팝업 UI 컴포넌트
 *
 * 녹색 체크 아이콘 + 타이틀 + 메시지 표시
 * 로그인 성공 / 비밀번호 변경 완료 등 성공 메시지에 사용
 *
 * 사용 예시:
 * <SuccessPopup
 *   title="비밀번호 변경 완료!"
 *   message="변경된 비밀번호로 다시 로그인해주세요."
 * />
 */



import { FaCheck } from 'react-icons/fa6';

interface SuccessPopupProps {
  title: string; // 타이틀 (굵은 텍스트)
  message: string; // 메시지 내용
}

const SuccessPopup = ({ title, message }: SuccessPopupProps) => {
  return (
    <div className="bg-white w-[396px] rounded-xl shadow text-center flex justify-center items-center">
      <div className="flex flex-col items-center py-[24px]">
        <div className="w-[24px] h-[24px] bg-[#14C786] rounded-full flex items-center justify-center mb-[16px]">
          <FaCheck className="text-white text-[16px]" />
        </div>
        <p className="text-[20px] font-bold text-[#121212] mb-[16px]">{title}</p>
        <p className="text-[16px] text-[#4D4D4D] text-center">{message}</p>
      </div>
    </div>
  );
};

export default SuccessPopup;