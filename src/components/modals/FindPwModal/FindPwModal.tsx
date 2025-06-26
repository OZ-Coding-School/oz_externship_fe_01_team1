// 비밀번호 찾기 모달 컨테이너 컴포넌트
// FindPwForm을 ModalWrapper로 감싸서 배경 어둡게 처리 및 중앙 정렬된 모달 형태 제공
// 실질적인 로직은 FindPwForm 내부에서 처리하고, 이 컴포넌트는 래핑 및 props 전달만 수행
// onClose: 모달 닫기 핸들러
// onResetPwOpen: 다음 단계인 비밀번호 재설정 모달 열기 핸들러

// 주의: 모달 UI 레이아웃은 ModalWrapper에서 공통 처리되므로 커스텀 UI를 적용하려면 해당 컴포넌트를 수정해야 함

import React from 'react';
import ModalWrapper from '@components/common/ModalWrapper';
import FindPwForm from './FindPwForm';

interface FindPwModalProps {
  onClose: () => void;  // 부모 컴포넌트에서 전달된 모달 닫기 함수
  onResetPwOpen: () => void; // 인증 완료 후 비밀번호 재설정 모달로 전환하는 함수
}

const FindPwModal: React.FC<FindPwModalProps> = ({ onClose, onResetPwOpen }) => {
  return (
    <ModalWrapper>
      {/* 비밀번호 찾기 폼에 props 전달 */}
      <FindPwForm onClose={onClose} onResetPwOpen={onResetPwOpen} />
    </ModalWrapper>
  );
};

export default FindPwModal;