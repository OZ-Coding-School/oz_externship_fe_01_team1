// 아이디 찾기 입력 폼 컴포넌트
// 이름, 전화번호, 인증번호 입력 UI를 포함하며, 외부에서 상태 및 이벤트 핸들링을 제어함
// Input/Button은 공통 컴포넌트 사용 (디자인 통일 목적)
// 인증번호 입력/전송 버튼은 UI만 구현되어 있고 기능 연결은 추후 작업 필요

import { GoPerson } from "react-icons/go";
import { Input, Button } from "@components/common";


// 부모 컴포넌트에서 상태 제어 (입력값, 에러, 찾기 실행)
// - 인증번호 전송 및 확인은 UI만 구성되어 있고 기능은 아직 미구현 상태
// - 전체 폼은 모달 내부에서 사용되며, 스타일 및 배치는 디자인 시스템에 맞춤
interface FindIdFormProps {
  name: string;
  phone: string;
  showError: boolean;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onFindId: () => void;
}

const FindIdForm = ({
  name,
  phone,
  showError,
  onNameChange,
  onPhoneChange,
  onFindId,
}: FindIdFormProps) => {
  return (
    <>
    {/* 모달 상단 헤더 + 에러 메시지 영역 */}
      <div className="mt-[34px] flex flex-col items-center mb-[24px]">
        <div className="w-[28px] h-[28px] rounded-full bg-[#D0B3F6] flex items-center justify-center mb-[8px]">
          <GoPerson className="text-[#6201E0] w-[20px] h-[20px]" />
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
        <Input
          type="text"
          placeholder="이름을 입력해주세요"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          noMarginBottom
          className="w-[348px] h-[48px] border border-[#BDBDBD] rounded px-3 mt-[20px] text-[14px]"
        />
      </div>

      {/* 휴대전화 입력 + 인증번호 전송 버튼 */}
      {/* 주의: 인증번호 전송 기능은 구현되지 않음. UI만 구성된 상태 */}
      <div>
        <label className="text-[16px] text-[#121212] mb-[16px]">
          휴대전화<span className="text-[#EC0037] ml-1">*</span>
        </label>
        <div className="flex gap-2 mt-[16px]">
          <Input
            type="tel"
            placeholder="숫자만 입력해주세요"
            fullWidth={false}
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
            noMarginBottom
            className="w-[228px] h-[48px] border border-[#BDBDBD] rounded px-3 text-[14px]"
          />
          <Button
            fullWidth={false}
            className="w-[112px] h-[48px] bg-[#ECECEC] border border-[#BDBDBD] 
            text-[16px] text-[#303030] rounded"
          >
            인증번호 전송
          </Button>
        </div>
      </div>

      {/* 인증번호 입력 영역 */}
      {/* 주의: 인증번호 확인 기능도 아직 미구현. 상태 관리 없이 UI만 있음 */}
      <div className="mt-[16px]">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="인증번호 6자리를 입력해주세요"
            fullWidth={false}
            noMarginBottom
            className="w-[228px] h-[48px] border border-[#D9D9D9] rounded px-3 text-[14px]"
          />
          <Button
            fullWidth={false}
            className="w-[112px] h-[48px] bg-[#ECECEC] border border-[#BDBDBD] 
            text-[16px] text-[#303030] rounded"
          >
            인증번호 확인
          </Button>
        </div>
      </div>

      {/* 아이디 찾기 실행 버튼 */}
      {/* 주의: 입력값 유효성 및 결과 처리(성공/실패)는 부모 컴포넌트에서 처리됨 */}
      <Button
        fullWidth={false}
        className="w-[348px] h-[52px] bg-[#6201E0] text-white text-[16px] rounded mt-[40px]"
        onClick={onFindId}
      >
        아이디 찾기
      </Button>
    </>
  );
};

export default FindIdForm;