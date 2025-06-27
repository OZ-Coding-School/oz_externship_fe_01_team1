import ozlogo from '../../assets/ozcoding_logo_black.png';
import { Input, Button } from '@components/common';

export default function JoinForm() {
  return (

  <div className="w-[528px] mx-auto px-[24px] py-[40px] bg-white ">
      <div className="w-full flex flex-col gap-[52px]">
        <div className="flex flex-col justify-center items-center w-full gap-[16px]">
          <p className="text-[#000a30] text-[18px] font-[700]">마법같이 빠르게 성장시켜줄</p>
          <img className="w-[180px] h-[24px]" src={ozlogo} alt="" />
        </div>
        <div className="text-[18px] font-[600]">회원가입</div>

        <div className="flex flex-col gap-[44px]">
          {/* 이름 */}
          <div className="flex flex-col gap-[12px]">
            <label className="text-[16px] text-[#121212]">
              이름<span className="text-[#EC0037] ml-1">*</span>
            </label>
            <Input
              placeholder="이름을 입력해주세요"
              className="placeholder:font-[400] placeholder:text-[14px]"
            />
          </div>

          {/* 닉네임 */}
          <div className="flex flex-col gap-[12px]">
            <label className="text-[16px] text-[#121212]">
              닉네임<span className="text-[#EC0037] ml-1">*</span>
            </label>
            <div className="flex gap-[12px]">
              <Input
                placeholder="닉네임을 입력해주세요"
                fullWidth={false}
                className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[356px]"
              />
              <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
                중복확인
              </Button>
            </div>
          </div>

          {/* 생년월일 */}
          <div className="flex flex-col gap-[12px]">
          <label className="text-[16px] text-[#121212]">
            생년월일<span className="text-[#EC0037] ml-1">*</span>
          </label>
          <Input
            type="number"
            placeholder="8자리 입력해주세요 (ex.20001004)"
            className="placeholder:font-[400] placeholder:text-[14px]"
          />
          </div>
        </div>

        {/* 이메일 인증 */}
        <div className="flex flex-col">
          <div className="flex gap-[16px] items-center">
            <label className="text-[16px] font-[500] mb-[12px]">이메일<span className="text-red-500 ml-1">*</span></label>
            <div className="text-[14px] font-[600] text-[#6201E0]  mb-[12px]">
              로그인 시 아이디로 사용합니다.
            </div>
          </div>
          <div className="flex gap-[12px]">
            <Input
              placeholder="이메일(example@gmail.com)"
              className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[346px]"
              fullWidth={false}
            />
            <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
              인증번호전송
            </Button>
          </div>
          <div className="flex gap-[12px]">
            <Input
              placeholder="인증번호 6자리를 입력해주세요"
              className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[346px]"
              fullWidth={false}
            />
            <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
              인증번호확인
            </Button>
          </div>
        </div>

        {/* 휴대전화 */}
        <div className="flex flex-col">
          <label className="text-[16px] font-[500] mb-[12px]">
            휴대전화<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex w-full gap-[20px]">
            <div className="flex grow min-w-0 gap-[5px] items-center">
              <Input placeholder="010" fullWidth={false} className="min-w-0 grow w-[108px]" /> 
              <span className="text-[14px] text-[#bdbdbd] mb-[14px]">-</span>
              <Input placeholder="1234" fullWidth={false} className="min-w-0 grow w-[108px]" /> 
                <span className="text-[14px] text-[#bdbdbd] mb-[14px]">-</span>
              <Input placeholder="5678" fullWidth={false} className="min-w-0 grow w-[108px]" />
            </div>
            <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
              인증번호전송
            </Button>
          </div>
          <div className="flex gap-[12px]">
            <Input
              placeholder="인증번호 6자리를 입력해주세요"
              className="flex-1 placeholder:text-[14px] placeholder:font-[400] w-[356px]"
              fullWidth={false}
            />
            <Button fullWidth={false} className="w-[112px] bg-[#ececec] border border-[#bdbdbd] text-[16px]">
              인증번호확인
            </Button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className="flex flex-col gap-[12px]">
          <div className="inline-flex items-center">
            <span className="text-[16px] font-[500] text-[#121212]">비밀번호</span>
            <span className="text-red-500 ml-[4px] text-[16px]">*</span>
            <span className="ml-[8px] text-[14px] font-[600] text-[#6201E0]">
              8~15자의 영문 대소문자, 숫자, 특수문자 포함
            </span>
          </div>

          <div className="flex flex-col">
            <Input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="placeholder:text-[14px] placeholder:font-[400] w-[480px]"
            />
            <Input
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              className="placeholder:text-[14px] placeholder:font-[400] w-[480px]"
            />
          </div>
        </div>

        {/* 가입 버튼 */}
        <Button className="bg-[#ececec] text-[#bdbdbd] font-[500] w-[480px] text-[16px]">
          가입하기
        </Button>
      </div>
    </div>
  );
}