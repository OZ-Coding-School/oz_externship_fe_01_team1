import logo from '../assets/ozcoding_logo_black.png'
import cacaologo from '../assets/cacaologo.png'
import naverlogo from '../assets/neverlogo.png'
import { Link } from 'react-router'

export default function Join() {
  return (
    <div className="w-full flex flex-col items-center absolute top-[200px]">
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
          <div className="flex flex-col gap-[16px] w-full">
            <button className="flex justify-center items-center gap-[4px] bg-[#fee500] w-full h-[52px] 
            text-[#391c1a] text-[16px] rounded-[4px] font-[400]">
              <img src={cacaologo} className="w-[16px] h-[14px]" />
              <div>카카오로 3초만에 가입하기</div>
            </button>
            <button className="flex justify-center items-center gap-[4px] 
            bg-[#03c45a] w-full h-[52px] text-[#ffffff] text-[16px] rounded-[4px]">
              <img src={naverlogo} className="w-[13px] h-[13px]" />
              <div>네이버로 가입하기</div>
            </button>
          </div>
          <Link
            to="/Join/JoinForm"
            className="font-[500] text-[16px] text-[#4d4d4d] underline"
          >
            일반회원 가입
          </Link>
        </div>
      </div>
    </div>
  )
}
