// 비밀번호 재설정 모달 컴포넌트
// 내부에서 비밀번호 입력 폼(ResetPwForm)을 렌더링하며, 입력 완료 후 성공 팝업(SuccessPopup)으로 전환됨
// 모달 상태는 내부 useState로 관리되며, 성공 시 10초 뒤 자동 닫힘
// 상위 컴포넌트에서는 단순히 onClose 핸들러만 전달하면 됨

import { useState } from 'react';
import CloseButton from '@components/common/CloseButton';
import SuccessPopup from '@components/common/SuccessPopup';
import ResetPwForm from './ResetPwForm';

const ResetPwModal = ({ onClose }: { onClose: () => void }) => {
  // 비밀번호와 확인 값
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  // 비밀번호가 일치하지 않을 경우 에러 상태
  const [showSuccessOnly, setShowSuccessOnly] = useState(false);

  // 성공 팝업 표시 여부 (true일 경우 SuccessPopup만 보여짐)
  const [passwordError, setPasswordError] = useState(false);

  // 비밀번호 일치 확인 후 성공 처리
  const handleConfirm = () => {
    if (!password || password !== passwordCheck) {
      setPasswordError(true);
      return;
    }

    setPasswordError(false);
    setShowSuccessOnly(true); // 성공 모달 띄우기

    setTimeout(() => {
      setShowSuccessOnly(false);
      onClose(); // 로그인 페이지로 이동 (또는 모달 닫힘 처리)
    }, 10000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(18,18,18,0.6)] flex items-center justify-center">
      {showSuccessOnly ? (
        // 비밀번호 변경 성공 팝업
        <SuccessPopup
          title="비밀번호 변경 완료!"
          message="잠시 후 로그인 페이지로 이동합니다."
        />
      ) : (
        // 입력 폼 모드
        <div className="relative">

          {/* 닫기 버튼 (폼 우측 상단) */}
          <CloseButton onClick={onClose} className="top-[30px]" />
          
          {/* 비밀번호 입력 폼 */}
          <ResetPwForm
            password={password}
            passwordCheck={passwordCheck}
            passwordError={passwordError}
            onChangePassword={setPassword}
            onChangePasswordCheck={setPasswordCheck}
            onConfirm={handleConfirm}
          />
        </div>
      )}
    </div>
  );
};

export default ResetPwModal;