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
import { useNavigate } from 'react-router'
import { useUserInfo } from '@store/userInfoStore'

import RestoreUserModal from '@components/modals/RestoreUserModal/RestoreUserModal'
import type { userData } from '@customType/userData'
import api from '../../api/mainApi'
import axios, { AxiosError } from 'axios'
import CommonModal from '@components/common/Modal'
import { Button } from '@components/common'

const LoginForm = () => {
  const [openFindIdModal, setOpenFindIdModal] = useState(false) // 아이디 찾기 모달
  const [openFindPwModal, setOpenFindPwModal] = useState(false) // 비밀번호 찾기 모달
  const [openResetPwModal, setOpenResetPwModal] = useState(false) // 비밀번호 재설정 모달
  const [showFindIdSuccess, setShowFindIdSuccess] = useState(false) // 아이디 찾기 성공 화면
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setUserInfo } = useUserInfo()
  const [errMsg, setErrMsg] = useState<string>('')
  const [isOpenErrMsg, setIsOpenErrMsg] = useState(false)

  const [showRestoreModal, setShowRestoreModal] = useState(false)

  const navigate = useNavigate()

  const login = async () => {
    try {
      const res = await api.post<userData>(`v1/auth/login/email`, {
        email,
        password,
      })

      const userData = res.data
      if (userData) {
        userData.user.isDeleted = false // 탈퇴 여부 API 속성값이 없어 입의로 속성값 적용
      }

      // 탈퇴 회원 여부 확인
      if (userData.user?.isDeleted) {
        // 모달 띄우기
        setShowRestoreModal(true)
      } else {
        // 정상 로그인 처리
        localStorage.setItem('userInfo', JSON.stringify(userData))
        if (res.status === 200) {
          setUserInfo(userData)
          navigate('/')
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError

        if (axiosError.code === 'ECONNABORTED') {
          // 요청 시간 초과
          setErrMsg(
            '요청시간이 초과 되었습니다. 다시한번 시도해 보시기 바랍니다.'
          )
        } else if (axiosError.response?.data) {
          // 백엔드에서 전달안 에러 응답 처리
          const errorData = axiosError.response.data
          const messages =
            typeof errorData === 'string'
              ? [errorData]
              : Object.values(errorData).flat()

          setErrMsg(messages.join('\n'))
        } else {
          // 기타 Axios 오류
          setErrMsg(
            '예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
          )
        }

        setIsOpenErrMsg(true)
      } else {
        // Axios 오류가 아닌 경우 처리
        alert('알수없는 오류가 발생하였습니다.')
      }
    }
  }
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
      </div>
      <CommonModal
        title={errMsg}
        isOpen={isOpenErrMsg}
        onClose={() => setIsOpenErrMsg(false)}
        position="center-bg"
      >
        <Button
          fullWidth={false}
          className="flex justify-center items-center px-[24px] py-[18px] bg-[#6201e0] text-[16px] text-[#fafafa] font-[600] rounded-[100px] h-[43px] w-[76px]"
          onClick={() => {
            setIsOpenErrMsg(false)
          }}
        >
          확인
        </Button>
      </CommonModal>
      {showRestoreModal && (
        <RestoreUserModal onClose={() => setShowRestoreModal(false)} />
      )}
    </div>
  )
}

export default LoginForm
