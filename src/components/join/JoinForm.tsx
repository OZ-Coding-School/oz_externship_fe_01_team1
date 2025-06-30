import { useState } from 'react';
import ozlogo from '../../assets/ozcoding_logo_black.png';
import { Input, Button } from '@components/common';
import NicknameField from './NicknameField';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';
import PasswordFields from './PasswordFields';

export default function JoinForm() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  return (

  <div className="w-[528px] mx-auto px-[24px] py-[40px] bg-white ">
      <div className="w-full flex flex-col gap-[52px]">
        <div className="flex flex-col justify-center items-center w-full gap-[16px]">
          <p className="text-[#000a30] text-[18px] font-[700]">마법같이 빠르게 성장시켜줄</p>
          <img className="w-[180px] h-[24px]" src={ozlogo} alt="" />
        </div>
        <div className="text-[18px] font-[600]">회원가입</div>

        <div className="flex flex-col">
          {/* 이름 */}
          <div className="flex flex-col gap-[12px] mb-[44px]">
            <label className="text-[16px] text-[#121212]">
              이름<span className="text-[#EC0037] ml-1">*</span>
            </label>
            <Input
              placeholder="이름을 입력해주세요"
              focusBorderColor="focus:border-[#6201E0]"
              className="placeholder:font-[400] placeholder:text-[14px]"
            />
          </div>
          {/* 닉네임 */}
          <NicknameField nickname={nickname} setNickname={setNickname} />

          {/* 생년월일 */}
          <div className="flex flex-col gap-[12px]  mb-[44px]">
          <label className="text-[16px] text-[#121212]">
            생년월일<span className="text-[#EC0037] ml-1">*</span>
          </label>
          <Input
            type="number"
            noMarginBottom
            focusBorderColor="focus:border-[#6201E0]"
            placeholder="8자리 입력해주세요 (ex.20001004)"
            className="placeholder:font-[400] placeholder:text-[14px]"
          />
          </div>
        </div>

        {/* 이메일 인증 */}
        <EmailVerification email={email} setEmail={setEmail} />

        {/* 휴대전화 */}
        <PhoneVerification
          phone1={phone1}
          phone2={phone2}
          phone3={phone3}
          setPhone1={setPhone1}
          setPhone2={setPhone2}
          setPhone3={setPhone3}
        />


        {/* 비밀번호 */}
        <PasswordFields
          password={password}
          confirmPw={confirmPw}
          setPassword={setPassword}
          setConfirmPw={setConfirmPw}
        />

        {/* 가입 버튼 */}
        <Button className="bg-[#ececec] text-[#bdbdbd] font-[500] w-[480px] text-[16px]">
          가입하기
        </Button>
      </div>
    </div>
  );
}
