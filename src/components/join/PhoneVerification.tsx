import { useState } from 'react'
import { Input, Button } from '@components/common'
import { cn } from '@utils/cn'
import api from '../../api/mainApi'
import useCountdown from '@hooks/useCountdown'
import { useAuthVerificationStore } from '@store/useAuthVerificationStore'

interface PhoneVerificationProps {
  phone1: string
  phone2: string
  phone3: string
  setPhone1: (value: string) => void
  setPhone2: (value: string) => void
  setPhone3: (value: string) => void
}

export default function PhoneVerification({
  phone1,
  phone2,
  phone3,
  setPhone1,
  setPhone2,
  setPhone3,
}: PhoneVerificationProps) {
  const [code, setCode] = useState('')
  const [isPhoneCodeSent, setIsPhoneCodeSent] = useState(false) // 휴대폰 인증요청 성공 여부
  const { phoneCodeValid, setPhoneCodeValid } = useAuthVerificationStore()
  const { timeLeft, start } = useCountdown({ duration: 600 }) // 10분

  const phone = `${phone1}${phone2}${phone3}`
  const isPhoneSuccess = /^\d{9,}$/.test(phone)
  const isAnyPhoneEntered = phone1 || phone2 || phone3
  const isPhoneError = isAnyPhoneEntered ? !isPhoneSuccess : false
  const isCodeEntered = code !== ''
  const isCodeValid = /^\d{6}$/.test(code)

  // 휴대폰 인증 번호 요청
  const sendVerificationCode = async () => {
    try {
      const res = await api.post(`/v1/auth/phone/send-code/`, { phone })
      if (res.status === 200) {
        setIsPhoneCodeSent(true)
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

  //휴대폰 인증번호 검증
  const verifyPhoneCode = async () => {
    try {
      const res = await api.post(`/v1/auth/phone/verify-code/`, { phone, code })
      if (res.status === 200) {
        setIsPhoneCodeSent(false)
        setPhoneCodeValid(true)
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
      <label className="text-[16px] font-[500] mb-[20px]">
        휴대전화<span className="ml-1 text-red-500">*</span>
      </label>

      <div className="flex w-full gap-[20px]">
        <div className="flex gap-[5px] items-center w-[356px]">
          <Input
            value={phone1}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '')
              const limited = onlyNumbers.slice(0, 4)
              setPhone1(limited)
            }}
            placeholder="010"
            fullWidth={false}
            noMarginBottom
            focusBorderColor="focus:border-[#6201E0]"
            success={isPhoneSuccess}
            error={isPhoneError}
            className="min-w-0 grow w-[108px]"
            name="phone_number"
          />
          <span className="text-[14px] text-[#bdbdbd] ">-</span>
          <Input
            value={phone2}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '')
              const limited = onlyNumbers.slice(0, 4)
              setPhone2(limited)
            }}
            placeholder="1234"
            fullWidth={false}
            noMarginBottom
            focusBorderColor="focus:border-[#6201E0]"
            success={isPhoneSuccess}
            error={isPhoneError}
            className="min-w-0 grow w-[108px]"
          />
          <span className="text-[14px] text-[#bdbdbd]">-</span>
          <Input
            value={phone3}
            onChange={(e) => {
              const onlyNumbers = e.target.value.replace(/[^0-9]/g, '')
              const limited = onlyNumbers.slice(0, 4)
              setPhone3(limited)
            }}
            placeholder="5678"
            noMarginBottom
            fullWidth={false}
            focusBorderColor="focus:border-[#6201E0]"
            success={isPhoneSuccess}
            error={isPhoneError}
            className="min-w-0 grow w-[108px]"
          />
        </div>

        {/* 인증번호전송 버튼 */}
        <Button
          fullWidth={false}
          disabled={!isPhoneSuccess}
          className={`
            w-[112px] text-[16px] border font-semibold
            ${
              isPhoneSuccess
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

      {(isPhoneError || isPhoneSuccess) && (
        <div className="pl-[2px] mt-[8px]">
          {isPhoneError && (
            <p className="text-[#EC0037] text-[12px]">
              * 이미 가입에 사용된 휴대전화 번호입니다.
            </p>
          )}
          {isPhoneSuccess && (
            <p className="text-[#00C27C] text-[12px]">
              * 사용 가능한 휴대전화 번호입니다.
            </p>
          )}
        </div>
      )}

      {/* 인증번호 입력 */}
      <div className="flex flex-col gap-[1px] mt-[12px]">
        <div className="flex w-full gap-[20px]">
          <Input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="인증번호 6자리를 입력해주세요"
            className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[356px]"
            noMarginBottom
            focusBorderColor="focus:border-[#6201E0]"
            error={isCodeEntered && !isCodeValid}
            success={isCodeEntered && isCodeValid}
            fullWidth={false}
          />
          <Button
            fullWidth={false}
            disabled={!isCodeValid}
            className={cn(
              'w-[112px]',
              'text-[16px]',
              'border',
              'font-semibold',
              isCodeValid
                ? 'bg-[#F3EFFF] border-[#6201E0] text-[#6201E0]'
                : 'bg-[#ECECEC] border-[#BDBDBD] text-[#4D4D4D]'
            )}
            type="button"
            onClick={verifyPhoneCode}
          >
            인증번호확인
          </Button>
        </div>
        {isPhoneCodeSent ? (
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
          phoneCodeValid && (
            <p className="text-[#00C27C] text-[12px]">
              휴대폰 인증이 완료 되었습니다.
            </p>
          )
        )}
      </div>
    </div>
  )
}
