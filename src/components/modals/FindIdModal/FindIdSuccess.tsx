// 아이디 찾기 성공 모달 컴포넌트
// props로 onClose (로그인으로 이동), onFindPwOpen (비밀번호 찾기 모달 전환)을 전달받아 행동 제어
// 실제 입력된 이메일은 UI에 마스킹된 더미값으로 하드코딩되어 있음 (ozcoding@g****.com)
// 필요시 이메일 props로 분리하여 확장 가능
// 이 컴포넌트는 상태를 갖지 않고, 상위에서 성공 여부를 판단하고 조건부로 렌더링함

import { GoPerson } from 'react-icons/go';
import { Button } from '@components/common';

interface FindIdSuccessProps {
  onClose: () => void; // 로그인 화면으로 돌아가기 위한 콜백
  onFindPwOpen: () => void; // 비밀번호 찾기 모달을 열기 위한 콜백
}

const FindIdSuccess = ({ onClose, onFindPwOpen }: FindIdSuccessProps) => {
  return (
    // 전체 모달 배경 (회색 반투명 레이어 + 중앙 정렬)
    <div className="fixed inset-0 bg-[rgba(18,18,18,0.6)] z-50 flex justify-center items-center">

      {/* 실제 모달 박스 */}
      <div className="bg-white w-[396px] h-auto p-[24px] rounded-xl relative">

        {/* 아이콘 및 제목 영역 */}
        <div className="mt-[34px] flex flex-col items-center mb-[24px]">
          <div className="w-[28px] h-[28px] rounded-full bg-[#D0B3F6] flex items-center justify-center mb-[8px]">
            <GoPerson className="text-[#6201E0] text-l" />
          </div>
          <h2 className="text-center text-[20px] text-[#121212] font-bold">아이디 찾기</h2>
          <p className="text-[14px] text-[#121212] text-center mb-[32px]">
            입력하신 정보와 일치하는 아이디입니다.
          </p>

          {/* 결과 영역 (임시 마스킹된 이메일 표시) */}
          <div className="w-[348px] h-[93px] bg-[#ECECEC] border border-[#BDBDBD] rounded flex justify-center items-center mb-[24px] text-[#121212] font-semibold text-[16px]">
            ozcoding@g****.com
          </div>

          {/* 버튼 영역: 로그인 또는 비밀번호 찾기로 전환 */}
          <div className="flex gap-[12px] w-[348px]">
            <Button
              fullWidth={false}
              className="w-[168px] h-[48px] border border-[#6201E0] text-[#6201E0] rounded"
              onClick={onClose}
            >
              로그인
            </Button>
            <Button
              fullWidth={false}
              className="w-[168px] h-[48px] bg-[#6201E0] text-white rounded"
              onClick={onFindPwOpen}
            >
              비밀번호 찾기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindIdSuccess;