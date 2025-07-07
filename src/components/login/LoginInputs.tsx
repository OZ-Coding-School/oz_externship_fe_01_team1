// LoginInputs.tsx
// - 이메일, 비밀번호 입력 필드 및 관련 링크, 버튼 포함
// - 로그인 입력 UI만 담당하는 프리젠테이셔널 컴포넌트
// - 상태 및 로직은 상위 컴포넌트(LoginForm)에서 제어함

import { Input, Button } from '@components/common'

interface Props {
  email: string
  password: string
  setEmail: (value: string) => void
  setPassword: (value: string) => void
  onFindId: () => void // 상위에서 전달된 아이디 찾기 모달 열기 함수
  onFindPw: () => void // 상위에서 전달된 비밀번호 찾기 모달 열기 함수
  login: () => void
}

const LoginInputs = ({
  email,
  password,
  setEmail,
  setPassword,
  onFindId,
  onFindPw,
  login,
}: Props) => (
  <>
    {/* 이메일 입력 */}
    <Input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="아이디 (example@gmail.com)"
      noMarginBottom
      className="w-[346px] h-[48px] border border-[#BDBDBD] px-4 py-2 rounded text-[14px] 
      focus:outline-none mb-[12px]"
    />

    {/* 비밀번호 입력 */}
    <Input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="비밀번호 (6~15자의 영문 대소문자, 숫자, 특수문자 포함)"
      className="w-[346px] h-[48px] border border-[#BDBDBD] px-4 py-2 rounded text-[14px] 
      focus:outline-none"
    />

    {/* 아이디 / 비번 찾기 */}
    <div className="flex justify-left gap-2 text-[#4D4D4D] mt-[8px] mb-[12px] text-[14px]">
      <a
        href="#"
        role="button"
        onClick={(e) => {
          e.preventDefault()
          onFindId()
        }}
      >
        아이디 찾기
      </a>
      <span>|</span>
      <a
        href="#"
        role="button"
        onClick={(e) => {
          e.preventDefault()
          onFindPw()
        }}
      >
        비밀번호 찾기
      </a>
    </div>

    {/* 로그인 버튼 */}
    <Button
      disabled={!email || !password}
      className={`w-[348px] h-[52px] font-semibold rounded mt-2 cursor-pointer
        ${email && password ? 'bg-[#6201E0] text-white' : 'bg-[#ECECEC] text-[#BDBDBD]'}`}
      onClick={login}
    >
      일반회원 로그인
    </Button>
  </>
)

export default LoginInputs
