// 아이디 찾기 모달 컴포넌트
// 내부에서 입력 폼 렌더링하고, 유효성 검사 후 부모 컴포넌트에 성공 여부 전달
// 모달 내 성공 상태는 관리하지 않으며, onSuccess + onClose를 통해 상위에서 모달 전환을 제어
// 모달이 항상 열릴 때는 FindIdForm만 보여주고, 성공 여부는 외부에서 판단

import React, { useState } from 'react';
// import { IoClose } from 'react-icons/io5';
import CloseButton from '@components/common/CloseButton';
import FindIdForm from './FindIdForm';

interface FindIdModalProps {
  onClose: () => void;
  onSuccess: () => void;  //부모 컴포넌트에서 성공 여부에 따라 모달 전환 처리
}

// 아이디 찾기 모달 컴포넌트
// 내부에서 입력 폼 렌더링하고, 유효성 검사 후 부모 컴포넌트에 성공 여부 전달
// 모달 내 성공 상태는 관리하지 않으며, onSuccess + onClose를 통해 상위에서 모달 전환을 제어
// 모달이 항상 열릴 때는 FindIdForm만 보여주고, 성공 여부는 외부에서 판단
const FindIdModal: React.FC<FindIdModalProps> = ({ onClose, onSuccess }) => {
  const [showError, setShowError] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // 유효성 검사 및 성공 콜백 처리
  const handleFindId = () => {
    if (name.trim() === '' || phone.trim() === '') {
      // 사용자가 아무것도 입력하지 않았을 경우 에러 메시지 표시
      setShowError(true);
    } else {
      // 성공 시: 
      // 1) 외부 상태로 성공 여부 알림 (FindIdSuccess 띄우기 위함)
      // 2) 현재 모달은 닫음
      onSuccess();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-[rgba(18,18,18,0.6)] z-50 flex justify-center items-center">
      {/* 모달 레이어 */}
      <div className="bg-white w-[396px] h-auto p-[24px] rounded-xl relative">
        
        {/* 닫기 버튼 */}
        <CloseButton onClick={onClose} className="top-[30px]"/>

        {/* 입력 폼: 성공 여부와 관계없이 항상 렌더링됨 */}
        <FindIdForm
          name={name}
          phone={phone}
          showError={showError}
          onNameChange={setName}
          onPhoneChange={setPhone}
          onFindId={handleFindId}
        />
      </div>
    </div>
  );
};

export default FindIdModal;