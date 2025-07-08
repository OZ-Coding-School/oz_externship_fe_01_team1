import ModalWrapper from '@components/common/ModalWrapper';
import RestoreUserInfoModal from './RestoreUserInfoModal';
import RestoreUserForm from './RestoreUserForm';
import SuccessPopup from '@components/common/SuccessPopup';
import { useState } from 'react';

interface Props {
  onClose: () => void;
}

const RestoreUserModal = ({ onClose }: Props) => {
  const [step, setStep] = useState<'info' | 'form'>('info');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClose = () => {
    setStep('info');
    setShowSuccess(false);
    onClose();
  };

  const handleVerify = () => {
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      handleClose();
    }, 10000);
  };

  if (showSuccess) {
    return (
      <div className="fixed inset-0 z-50 bg-[rgba(18,18,18,0.6)] flex items-center justify-center">
        <SuccessPopup
          title="계정 복구 완료!"
          message="잠시 후 로그인 페이지로 이동합니다."
          onConfirm={handleClose}
        />
      </div>
    );
  }

  return (
    <ModalWrapper className="w-[396px] max-w-full relative">
      {step === 'info' && (
        <RestoreUserInfoModal
          onNext={() => setStep('form')}
          onClose={handleClose}
        />
      )}

      {step === 'form' && (
        <RestoreUserForm
          onVerified={handleVerify}
          onClose={handleClose}
        />
      )}
    </ModalWrapper>
  );
};

export default RestoreUserModal;