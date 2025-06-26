// LoginModals.tsx
// - 로그인 화면에서 사용되는 모달 UI들을 조건부로 렌더링하는 역할
// - 각 모달의 열림/닫힘 상태는 상위에서 제어하며, 이 컴포넌트는 표현에 집중
// - 모달 간 전환(예: 아이디 찾기 → 성공 화면 → 비밀번호 찾기 등)을 props 함수로 관리

import { FindIdModal } from '@components/modals/FindIdModal';
import { FindPwModal } from '@components/modals/FindPwModal';
import { ResetPwModal } from '@components/modals/ResetPwModal';
import FindIdSuccess from '@components/modals/FindIdModal/FindIdSuccess';

interface Props {
  openFindIdModal: boolean; // 아이디 찾기 모달 열림 여부
  setOpenFindIdModal: (v: boolean) => void;
  openFindPwModal: boolean; // 비밀번호 찾기 모달 열림 여부
  setOpenFindPwModal: (v: boolean) => void;
  openResetPwModal: boolean; // 비밀번호 재설정 모달 열림 여부
  setOpenResetPwModal: (v: boolean) => void;
  showFindIdSuccess: boolean; // 아이디 찾기 성공 화면 열림 여부
  setShowFindIdSuccess: (v: boolean) => void;
}

const LoginModals = ({
  openFindIdModal,
  setOpenFindIdModal,
  openFindPwModal,
  setOpenFindPwModal,
  openResetPwModal,
  setOpenResetPwModal,
  showFindIdSuccess,
  setShowFindIdSuccess,
}: Props) => (
  <>
  {/* 아이디 찾기 모달 */}
    {openFindIdModal && (
      <FindIdModal
        onClose={() => setOpenFindIdModal(false)}
        onSuccess={() => {
          setOpenFindIdModal(false); // 현재 모달 닫기
          setShowFindIdSuccess(true); // 성공 모달 열기
        }}
      />
    )}
    {/* 아이디 찾기 성공 모달 */}
    {showFindIdSuccess && (
      <FindIdSuccess
        onClose={() => setShowFindIdSuccess(false)}
        onFindPwOpen={() => {
          setShowFindIdSuccess(false); // 성공 모달 닫기
          setOpenFindPwModal(true); // 비밀번호 찾기 모달 열기
        }}
      />
    )}
    {/* 비밀번호 찾기 모달 */}
    {openFindPwModal && (
      <FindPwModal
        onClose={() => setOpenFindPwModal(false)}
        onResetPwOpen={() => {
          setOpenFindPwModal(false); // 현재 모달 닫기
          setOpenResetPwModal(true);  // 비밀번호 재설정 모달 열기
        }}
      />
    )}
    {/* 비밀번호 재설정 모달 */}
    {openResetPwModal && (
      <ResetPwModal onClose={() => setOpenResetPwModal(false)} />
    )}
  </>
);

export default LoginModals;