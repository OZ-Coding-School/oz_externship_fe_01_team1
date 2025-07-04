import { ModalWrapper, ModalHeader, Button } from "@components/common";
import { CiFaceMeh } from "react-icons/ci";
import CloseButton from "@components/common/CloseButton";

interface Props {
    onNext: () => void; // "계정 다시 사용하기" 클릭 시 처리
    onClose: () => void; // 닫기 버튼
  }
  
  const RestoreUserInfoModal = ({ onNext, onClose }: Props) => {
    return (
      <ModalWrapper className="w-[396px] max-w-full h-[278px]">
        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose} className="top-[24px]"/>

        <ModalHeader
          icon={<CiFaceMeh className="text-[#6201E0]"/>} 
          title="해당 계정은 탈퇴된 상태예요"
          onClose={onClose}
          noMarginBottom 
          className="mt-[10px]"
          />

        <div className="flex flex-col items-center mt-[16px]">
          {/* 본문 텍스트 */}
          <p className="text-[14px] text-[#4D4D4D] text-center leading-[1.6]">
            2025년 6월 20일 이후, 계정 정보는 완전히 삭제돼요. <br />
            계정을 다시 사용하려면 아래 버튼을 눌러 복구를 진행해주세요.
          </p>
  
          {/* 버튼 */}
          <Button
            onClick={onNext}
            className="w-full h-[48px] bg-[#6201E0] text-white rounded mt-[40px]"
          >
            계정 다시 사용하기
          </Button>
        </div>
      </ModalWrapper>
    );
  };
  
  export default RestoreUserInfoModal;
