import ModalWrapper from '@components/common/ModalWrapper';
import RestoreUserInfoModal from './RestoreUserInfoModal';
import RestoreUserForm from './RestoreUserForm';
import SuccessPopup from '@components/common/SuccessPopup';
import { useState } from 'react';

interface Props {
  onClose: () => void;
}

const RestoreUserModal = ({ onClose }: Props) => {
  const [step, setStep] = useState<'info' | 'form' | 'success'>('info');

  const handleClose = () => {
    setStep('info');
    onClose();
  };

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
          onVerified={() => setStep('success')}
          onClose={handleClose}
        />
      )}

      {step === 'success' && (
        <SuccessPopup
          title="계정 복구 완료!"
          message="이제 다시 로그인하실 수 있어요."
          onConfirm={handleClose}
        />
      )}
    </ModalWrapper>
  );
};

export default RestoreUserModal;
