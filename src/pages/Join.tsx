import logo from '../assets/ozcoding_logo_black.png'
import { Link } from 'react-router'
import SnsAuthButton from '../components/common/SnsAuthButton';


export default function Join() {
  return (
    <div className="w-full flex flex-col items-center mt-[88px]">
      <div className="flex flex-col items-center w-[348px] gap-[64px]">
        <div className="flex flex-col items-center gap-[27px]">
          <img src={logo} alt="" className="h-[24px]" />
          <div className="flex gap-[10px]">
            <div className="font-[500] text-[#4d4d4d] text-[16px]">
              아직 회원이신가요?
            </div>
            <button className="font-[500] text-[#6201e0] text-[16px]">
              로그인하기
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center gap-[36px] w-full">
        <div className="flex flex-col items-center gap-[36px] w-full">

          <div className="flex flex-col gap-[4px] w-full">
            <SnsAuthButton />
          </div>

          <Link
            to="/Join/JoinForm"
            className="font-normal text-[16px] text-[#4d4d4d] underline decoration-solid"
          >
            일반회원 가입
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
