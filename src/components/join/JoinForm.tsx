import { useState } from 'react';
import ozlogo from '../../assets/ozcoding_logo_black.png';
import NicknameField from './NicknameField';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';
import PasswordFields from './PasswordFields';
import NameField from './NameField';
import BirthField from './BirthField';
import SubmitButton from './JoinSubmitButton';

export default function JoinForm() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');

  return (

  <div className="w-[528px] mx-auto px-[24px] py-[40px] bg-white ">
      <div className="w-full flex flex-col gap-[52px]">
        <div className="flex flex-col justify-center items-center w-full gap-[16px]">
          <p className="text-[#000a30] text-[18px] font-[700]">마법같이 빠르게 성장시켜줄</p>
          <img className="w-[180px] h-[24px]" src={ozlogo} alt="" />
        </div>
        <div className="text-[18px] font-[600]">회원가입</div>

        <div className="flex flex-col gap-[44px]">
          <NameField name={name} setName={setName} />
          <NicknameField nickname={nickname} setNickname={setNickname} />
          <BirthField birth={birth} setBirth={setBirth} />
          <EmailVerification email={email} setEmail={setEmail} />
          <PhoneVerification
            phone1={phone1}
            phone2={phone2}
            phone3={phone3}
            setPhone1={setPhone1}
            setPhone2={setPhone2}
            setPhone3={setPhone3}
          />
          <PasswordFields
            password={password}
            confirmPw={confirmPw}
            setPassword={setPassword}
            setConfirmPw={setConfirmPw}
          />
        </div>

          {/* 가입 버튼 */}
          <SubmitButton
            name={name}
            nickname={nickname}
            birth={birth}
            email={email}
            phone1={phone1}
            phone2={phone2}
            phone3={phone3}
            password={password}
            confirmPw={confirmPw}
          />
        </div>
      </div>
  );
}
