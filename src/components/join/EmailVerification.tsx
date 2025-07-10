import { useState, useMemo } from 'react'
import { Input, Button } from '@components/common'
import api from '../../api/mainApi'
import useCountdown from '@hooks/useCountdown'
import { useAuthVerificationStore } from '@store/useAuthVerificationStore'

interface EmailVerificationProps {
  email: string
  setEmail: (value: string) => void
}

export default function EmailVerification({
  email,
  setEmail,
}: EmailVerificationProps) {
  const [code, setCode] = useState('')
  const [isEmailCodeSent, setIsEmailCodeSent] = useState(false) // 휴대폰 인증요청 성공 여부
  const { emailCodeValid, setEmailCodeValid } = useAuthVerificationStore()
  const { timeLeft, start } = useCountdown({ duration: 600 }) // 10분

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const isValidEmail = useMemo(
    () => email.length > 0 && emailRegex.test(email),
    [email]
  )
  const showError = email.length > 0 && !isValidEmail
  const showSuccess = email.length > 0 && isValidEmail

  const isAuthCodeSuccess = code.length === 6
  const isAuthCodeError = code.length > 0 && code.length < 6

  // 이메일 인증 번호 요청
  const sendVerificationCode = async () => {
    try {
      const res = await api.post(`/v1/auth/email/send-code`, {
        email,
        purpose: 'signup',
      })
      if (res.status === 200) {
        setIsEmailCodeSent(true)

        start()
        //카운트다운 10분 시작
        //UI 성공 메시지 표시
      } else if (res.status === 400) {
        alert('이미 인증되었거나, 잘못된 형식의 번호 입니다.')
        //400 에러처리
        // 유효하지 않은 휴대폰 번호 형식
        //UI에 에러메시지 출력
      } else {
        alert('인증번호 전송 오류 발생하였습니다. 다시한번 시도해 주세요')
      }
    } catch (err) {
      alert(`오류가 발생하였습니다.: ${err}`)
    }
  }

  //이메일 인증번호 검증
  const verifyPhoneCode = async () => {
    try {
      const res = await api.post(`/v1/auth/email/verify-code`, {
        email,
        verification_code: code,
        purpose: 'signup',
      })
      if (res.status === 200) {
        setIsEmailCodeSent(false)
        setEmailCodeValid(true)
      } else if (res.status === 400) {
        alert('인증번호가 잘못 되었습니다.')
        //400 에러처리
        // 유효하지 않은 휴대폰 번호 형식
        //UI에 에러메시지 출력
      } else {
        alert('인증번호 전송 오류 발생하였습니다. 다시한번 시도해 주세요')
      }
    } catch (err: any) {
      alert(`오류가 발생하였습니다.: ${err}`)
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex gap-[16px] items-center mb-[20px]">
        <label className="text-[16px] font-[500]">
          이메일<span className="ml-1 text-red-500">*</span>
        </label>
        <div className="text-[14px] font-[600] text-[#6201E0]">
          로그인 시 아이디로 사용합니다.
        </div>
      </div>

      <div className="flex gap-[20px]">
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일(example@gmail.com)"
          error={showError}
          success={showSuccess}
          noMarginBottom
          focusBorderColor="focus:border-[#6201E0]"
          className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[356px]"
          fullWidth={false}
          name="email"
        />
        <Button
          fullWidth={false}
          disabled={!email}
          className={`
            w-[112px] text-[16px] border font-semibold
            ${
              email
                ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
                : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'
            }
          `}
          type="button"
          onClick={sendVerificationCode}
        >
          인증번호전송
        </Button>
      </div>

      {(showError || showSuccess) && (
        <div className="pl-[2px] mt-[8px] min-h-[20px]">
          {showError && (
            <p className="text-[#EC0037] text-[12px]">
              * 이미 가입된 이메일입니다.
            </p>
          )}
          {showSuccess && (
            <p className="text-[#00C27C] text-[12px]">
              * 사용 가능한 이메일입니다.
            </p>
          )}
        </div>
      )}

      <div className="flex gap-[20px] mt-[12px]">
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="인증번호 6자리를 입력해주세요"
          error={isAuthCodeError}
          success={isAuthCodeSuccess}
          focusBorderColor="focus:border-[#6201E0]"
          className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[356px]"
          fullWidth={false}
          noMarginBottom
        />
        <Button
          fullWidth={false}
          disabled={code.length < 6}
          className={`
            w-[112px] text-[16px] border font-semibold
            ${
              code.length >= 6
                ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
                : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'
            }
          `}
          type="button"
          onClick={verifyPhoneCode}
        >
          인증번호확인
        </Button>
      </div>
      {isEmailCodeSent ? (
        <div className="pl-[2px] mt-[8px]">
          <p className="text-[12px] text-red-500">
            {timeLeft > 0
              ? `* 남은 시간 ${Math.floor(timeLeft / 60)
                  .toString()
                  .padStart(2, '0')}:${(timeLeft % 60)
                  .toString()
                  .padStart(2, '0')} 내에 인증번호를 입력해 주세요`
              : '* 인증 시간이 만료되었습니다'}
          </p>
        </div>
      ) : (
        emailCodeValid && (
          <p className="text-[#00C27C] text-[12px]">
            이메일 인증이 완료 되었습니다.
          </p>
        )
      )}
    </div>
  )
}
