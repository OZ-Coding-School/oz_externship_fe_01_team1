import { useState } from 'react';
import { ModalWrapper } from '@components/common';
import CloseButton from '@components/common/CloseButton';
import Button from '@components/common/Button';
import { IoCheckmark } from 'react-icons/io5';

interface WithdrawalModalProps {
  onClose: () => void;
}

const reasonList = [
  '원하는 종류의 강의가 없어서',
  '타 부트캠프에 더 양질의 컨텐츠가 있어서',
  '사이트내 UX/UI가 불편해서',
  '부트캠프를 수강완료해서',
  '기타(직접입력)',
];

const WithdrawalModal = ({ onClose }: WithdrawalModalProps) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [feedback, setFeedback] = useState('');

  const isSubmitDisabled = !selectedReason || !feedback;

  return (
    <ModalWrapper width="w-[646px]">
      <CloseButton onClick={onClose} className="top-[24px]" />
      <div className="mt-[58px]">
        <p className="font-bold text-[20px] text-[#121212] mb-[40px]">
          오즈코딩스쿨을 탈퇴하시는 이유는 무엇인가요?
        </p>
        <p className="font-normal text-[16px] text-[#bdbdbd] mb-[40px]">
          계정을 삭제하시면 회원님의 모든 콘텐츠와 활동 기록, 수강 기간 / 포인트 / 쿠폰 내역이 사라지며 환불되지 않습니다. 
          삭제된 정보는 복구할 수 없습니다.
        </p>
      </div>

      {/* 드롭다운 내부 구현 */}
      <div className="mb-[40px] relative w-[288px] self-start">
        <div
          className="border border-[#BDBDBD] h-[48px] px-4 rounded flex items-center justify-between cursor-pointer"
          onClick={() => setIsDropdownOpen((prev) => !prev)}
        >
          <span className={`text-[14px] ${selectedReason ? 'text-[#121212]' : 'text-[#bdbdbd]'}`}>
            {selectedReason || '해당되는 항목을 선택해 주세요.'}
          </span>
          <svg
            className={`w-[16px] h-[16px] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {isDropdownOpen && (
          <div className="absolute z-10 bg-white border border-[#BDBDBD] rounded mt-1 w-full shadow-md">
            {reasonList.map((reason) => {
              const isSelected = selectedReason === reason;
              return (
                <div
                  key={reason}
                  onClick={() => {
                    setSelectedReason(reason);
                    setIsDropdownOpen(false);
                    setFeedback('');
                  }}
                  className={`py-2 px-[12px] text-[14px] ml-[5px] mt-[5px] w-[278px] h-[48px] flex justify-between 
                    items-center rounded-[3px] cursor-pointer
                    ${isSelected ? 'text-[#6201E0] font-semibold' : 'text-[#121212]'}
                    hover:bg-[#efe6fc]`}
                >
                  <span>{reason}</span>
                  {isSelected && <IoCheckmark size={16} />}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 의견 입력창 */}
      {selectedReason && (
        <div className="w-full">
          <p className="text-[16px] text-[#121212] mb-[20px] leading-[20px]">
            서비스를 이용하시면서 불편했던 점이나 보완할 수 있는 방안을 알려주시면,
            서비스 개선에 적극적으로 반영하겠습니다. 감사합니다!
          </p>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="소중한 의견을 반영해 더 좋은 서비스를 위해 노력하겠습니다."
            className="w-[598px] h-[134px] bg-[#fafafa] border border-[#bdbdbd] rounded px-4 py-3 
            mb-6 text-[16px] resize-none placeholder:text-[#bdbdbd]"
          />
        </div>
      )}
    {/* 탈퇴 버튼 - 옵션 선택 시에만 표시 */}
    {selectedReason && (
    <Button
        fullWidth={false}
        disabled={isSubmitDisabled}
        className={`w-[148px] mt-2 ${
        isSubmitDisabled
            ? 'bg-[#E0E0E0] text-[#A0A0A0] cursor-not-allowed'
            : 'bg-[#efe6fc] border border-[#6201E0] font-semibold text-[#6201E0] cursor-pointer'
        }`}
    >
        회원 탈퇴하기
    </Button>
    )}
    </ModalWrapper>
  );
};

export default WithdrawalModal;