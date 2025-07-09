import { useActionState, useState } from 'react'
import ozlogo from '../../assets/ozcoding_logo_black.png'
import NicknameField from './NicknameField'
import EmailVerification from './EmailVerification'
import PhoneVerification from './PhoneVerification'
import PasswordFields from './PasswordFields'
import NameField from './NameField'
import BirthField from './BirthField'
import SubmitButton from './JoinSubmitButton'
import api from '../../api/mainApi'
import { useNavigate } from 'react-router'
import type { AxiosError } from 'axios'
import axios from 'axios'

export default function JoinForm() {
  const [nickname, setNickname] = useState('')
  const [email, setEmail] = useState('')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [phone3, setPhone3] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [name, setName] = useState('')
  const [birth, setBirth] = useState('')
  const [errMessage, setErrorMessage] = useState<string[]>([])
  const navigate = useNavigate()

  const formAction = async (_: null, formData: FormData) => {
    const data: Record<string, string | File> = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }
    data.gender = 'MALE' // 입력 필드가 없어서 강제 적용
    data.phone_number = `${phone1}${phone2}${phone3}`
    try {
      const res = await api.post(`/v1/auth/signup`, data)
      if (res.status === 201) {
        navigate('/login')
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 400) {
          const axiosError = err as AxiosError
          const errors = axiosError.response?.data ?? {}
          setErrorMessage([...Object.values(errors)])
        }
      } else {
        // Axios 오류가 아닌 경우 처리
        console.error('Unexpected error:', err)
      }
    }

    return null
  }

  const [_, formActionHandler, isPending] = useActionState(formAction, null)

  return (
    <div className="w-[528px] mx-auto px-[24px] py-[40px] bg-white ">
      <div className="w-full flex flex-col gap-[52px]">
        <div className="flex flex-col justify-center items-center w-full gap-[16px]">
          <p className="text-[#000a30] text-[18px] font-[700]">
            마법같이 빠르게 성장시켜줄
          </p>
          <img className="w-[180px] h-[24px]" src={ozlogo} alt="" />
        </div>
        <div className="text-[18px] font-[600]">회원가입</div>

        <form action={formActionHandler}>
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
            errMessage={errMessage}
            isPending={isPending}
          />
        </form>
      </div>
    </div>
  )
}
