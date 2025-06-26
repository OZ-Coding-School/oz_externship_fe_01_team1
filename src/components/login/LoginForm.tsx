// LoginForm.tsx
// - 로그인 페이지의 메인 컴포넌트
// - UI 구조를 LoginButtons / LoginInputs / LoginModals 로 분리하여 관리
// - 상태 관리는 이 컴포넌트에서 모두 처리
// - 모달 상태 제어와 관련된 로직이 중심

import { useState } from 'react'; 
import logo from '../../assets/oz_logo.png';

import LoginButtons from './LoginButtons'; // SNS 간편 로그인 버튼
import LoginInputs from './LoginInputs';  // 이메일/비밀번호 입력 + 아이디/비번 찾기 링크
import LoginModals from './LoginModals'; // 아이디찾기 / 비번찾기 / 재설정 모달 관리

const LoginForm = () => {
  const [openFindIdModal, setOpenFindIdModal] = useState(false);  // 아이디 찾기 모달
  const [openFindPwModal, setOpenFindPwModal] = useState(false);  // 비밀번호 찾기 모달
  const [openResetPwModal, setOpenResetPwModal] = useState(false);  // 비밀번호 재설정 모달
  const [showFindIdSuccess, setShowFindIdSuccess] = useState(false);  // 아이디 찾기 성공 화면

  return (
    <div className="flex flex-col items-center justify-center bg-white pt-[88px]">

      {/* 로고 + 상단 안내 텍스트 */}
      <img src={logo} alt="OZ 로고" className="w-[180px] mb-4" />

      <p className="text-base text-[#4D4D4D] mb-[64px]">
        아직 회원이 아니신가요?{' '}
        <a href="/join" className="text-[#6201E0] font-normal">회원가입 하기</a>
      </p>

       {/* 카카오/네이버 간편 로그인 버튼 묶음 */}
      <LoginButtons />

      <div className="w-[348px] pace-y-3 mt-[40px]">
        <LoginInputs
          onFindId={() => {
            setOpenFindIdModal(true);
            setOpenFindPwModal(false);
            setOpenResetPwModal(false);
          }}
          onFindPw={() => {
            setOpenFindPwModal(true);
            setOpenFindIdModal(false);
            setOpenResetPwModal(false);
          }}
        />
        
        {/* 모달 렌더링 담당 (props로 상태 전달) */}
        <LoginModals
          openFindIdModal={openFindIdModal}
          setOpenFindIdModal={setOpenFindIdModal}
          openFindPwModal={openFindPwModal}
          setOpenFindPwModal={setOpenFindPwModal}
          openResetPwModal={openResetPwModal}
          setOpenResetPwModal={setOpenResetPwModal}
          showFindIdSuccess={showFindIdSuccess}
          setShowFindIdSuccess={setShowFindIdSuccess}
        />
      </div>
    </div>
  );
};

export default LoginForm;