// LoginForm.tsx
// - 로그인 페이지의 메인 컴포넌트
// - UI 구조를 LoginButtons / LoginInputs / LoginModals 로 분리하여 관리
// - 상태 관리는 이 컴포넌트에서 모두 처리
// - 모달 상태 제어와 관련된 로직이 중심

import { useState } from 'react'
import logo from '../../assets/oz_logo.png'

import LoginButtons from '../common/SnsAuthButton' // SNS 간편 로그인 버튼
import LoginInputs from './LoginInputs' // 이메일/비밀번호 입력 + 아이디/비번 찾기 링크
import LoginModals from './LoginModals' // 아이디찾기 / 비번찾기 / 재설정 모달 관리
import axios from 'axios'
import { useUserInfo } from '@store/userInfoStore'
import { useNavigate } from 'react-router'

import RestoreUserInfoModal from '@components/modals/RestoreUserModal/RestoreUserInfoModal'
import RestoreUserForm from '@components/modals/RestoreUserModal/RestoreUserForm'

const LoginForm = () => {
  const [openFindIdModal, setOpenFindIdModal] = useState(false) // 아이디 찾기 모달
  const [openFindPwModal, setOpenFindPwModal] = useState(false) // 비밀번호 찾기 모달
  const [openResetPwModal, setOpenResetPwModal] = useState(false) // 비밀번호 재설정 모달
  const [showFindIdSuccess, setShowFindIdSuccess] = useState(false) // 아이디 찾기 성공 화면
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserInfo } = useUserInfo()

  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [showRestoreForm, setShowRestoreForm] = useState(false);

  const navigate = useNavigate()

  const URL = import.meta.env.VITE_API_BASE_URL
  const login = () => {
    return axios.post(URL, { email, password }).then((res) => {
      const userData = res.data;
  
      // 탈퇴 회원 여부 확인
      if (userData.user?.isdeleted) {
        // 모달 띄우기
        setShowRestoreModal(true);
      } else {
        // 정상 로그인 처리
        setUserInfo(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
        if (res.statusText === 'OK') {
          navigate('/');
        }
      }
    });
  };
  return (
    <div className="flex flex-col items-center justify-center bg-white pt-[88px]">
      {/* 로고 + 상단 안내 텍스트 */}
      <img src={logo} alt="OZ 로고" className="w-[180px] mb-4" />

      <p className="text-base text-[#4D4D4D] mb-[64px]">
        아직 회원이 아니신가요?{' '}
        <a href="/join" className="text-[#6201E0] font-normal">
          회원가입 하기
        </a>
      </p>

      {/* 카카오/네이버 간편 로그인 버튼 묶음 */}
      <LoginButtons />

      <div className="w-[348px] pace-y-3 mt-[40px]">
        <LoginInputs
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          onFindId={() => {
            setOpenFindIdModal(true)
            setOpenFindPwModal(false)
            setOpenResetPwModal(false)
          }}
          onFindPw={() => {
            setOpenFindPwModal(true)
            setOpenFindIdModal(false)
            setOpenResetPwModal(false)
          }}
          login={login}
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
        {showRestoreModal && !showRestoreForm && (
          <RestoreUserInfoModal
            onClose={() => setShowRestoreModal(false)}
            onNext={() => {
              setShowRestoreForm(true);    
            }}
          />
        )}
        {showRestoreForm && (
          <RestoreUserForm
            onVerified={() => {
              setShowRestoreForm(false);
              setShowRestoreModal(false);
            }}
            onClose={() => {
              setShowRestoreForm(false);
              setShowRestoreModal(false);
            }}
          />
        )}
      </div>
    </div>
  )
}

export default LoginForm
