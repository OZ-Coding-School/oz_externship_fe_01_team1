import React from 'react';
import logo from '../../assets/oz_logo.png';
import { FaComment } from 'react-icons/fa'; // 카카오 대체
import { SiNaver } from 'react-icons/si';

const LoginForm = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white pt-[100px]">
      <img src={logo} alt="OZ 로고" className="w-[180px] mb-4" />

      <p className="text-base text-[#4D4D4D] mb-[60px]">
        아직 회원이 아니신가요?{' '}
        <a href="/join" className="text-[#6201E0] font-normal">
          회원가입 하기
        </a>
      </p>

      <button className="w-[348px] h-[52px] bg-[#FEE500] text-[#391C1A] rounded flex items-center text-base justify-center font-normal mb-3 ">
        <FaComment className="mr-2" />
        카카오 간편 로그인 / 가입
      </button>

      <button className="w-[348px] h-[52px] bg-[#03C75A] text-white rounded flex items-center text-base justify-center font-normal mb-6">
        <SiNaver className="mr-2" />
        네이버 간편 로그인 / 가입
      </button>

      <div className="w-[348px] pace-y-3">
        <input
        type="email"
        placeholder="아이디 (example@gmail.com)"
        className="w-[346px] h-[48px] border border-[#BDBDBD] px-4 py-2 rounded text-sm focus:outline-none mb-[10px] text-[#BDBDBD]"
        />
        <input
        type="password"
        placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
        className="w-[346px] h-[48px] border border-[#BDBDBD] px-4 py-2 rounded text-sm focus:outline-none text-[#BDBDBD]"
        />

        {/* 하단 링크 + 여백 조정 */}
        <div className="flex justify-left gap-2 text-[#4D4D4D] mt-4 mb-3 text-sm">
        <a href="#" className="">아이디 찾기</a>
        <span>|</span>
        <a href="#" className="">비밀번호 찾기</a>
        </div>

        {/* 일반 로그인 버튼 */}
        <button
        className="w-[348px] h-[52px] bg-[#ECECEC] font-semibold rounded mt-2 cursor-not-allowed text-[#BDBDBD]"
        disabled 
        >
        일반회원 로그인
        </button>
        </div>
        </div>

        );
};

export default LoginForm;