import { Button } from '@components/common';

interface SubmitButtonProps {
  name: string;
  nickname: string;
  birth: string;
  email: string;
  phone1: string;
  phone2: string;
  phone3: string;
  password: string;
  confirmPw: string;
}

export default function SubmitButton({
  name,
  nickname,
  birth,
  email,
  phone1,
  phone2,
  phone3,
  password,
  confirmPw,
}: SubmitButtonProps) {
  const isNameValid = name.length >= 2;
  const isNicknameValid = /^[가-힣a-zA-Z0-9]{2,10}$/.test(nickname);
  const isBirthValid = birth.length === 8;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneValid = phone1.length >= 3 && phone2.length >= 3 && phone3.length >= 3;
  const isPasswordValid = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+{}:"<>?]).{8,15}$/.test(password);
  const isPwMatched = password === confirmPw;

  const isFormValid =
    isNameValid &&
    isNicknameValid &&
    isBirthValid &&
    isEmailValid &&
    isPhoneValid &&
    isPasswordValid &&
    isPwMatched;

  return (
    <Button
      disabled={!isFormValid}
      className={`
        w-[480px] text-[16px] font-[500]
        ${isFormValid
          ? 'bg-[#6201E0] text-white'
          : 'bg-[#ECECEC] text-[#BDBDBD]'}
      `}
    >
      가입하기
    </Button>
  );
}