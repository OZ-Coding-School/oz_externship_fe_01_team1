import ozlogo from '../../assets/ozcoding_logo_black.png'

export default function JoinFrom() {
  return (
    <div className="w-[528px] absolute left-1/2 -translate-x-1/2 top-[200px] flex flex-col items-center justify-center bg-white px-[24px] py-[40px]">
      <div className="w-full flex flex-col gap-[52px]">
        <div className="flex flex-col justify-center items-center w-full gap-[16px]">
          <p className="text-[#000a30] text-[18px] font-[700]">
            마법같이 빠르게 성장시켜줄
          </p>
          <img className="w-[180px] h-[24px]" src={ozlogo} alt="" />
        </div>
        <div className="text-[18px] font-[600]">회원가입</div>
        <div className="flex flex-col gap-[44px]">
          <div className="flex flex-col gap-[20px]">
            <div className="flex">
              <div className="text-[16px] font-[500]">이름</div>
              <div className="text-red-500 text-[16px] font-[400]">*</div>
            </div>
            <input
              type="text"
              className="border rounded-[4px] w-full h-[48px] border-[#bdbdbd] py-[10pz] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex">
              <div className="text-[16px] font-[500]">닉네임</div>
              <div className="text-red-500 text-[16px] font-[400]">*</div>
            </div>
            <div className="flex gap-[20px]">
              <input
                type="text"
                className="flex-1 border rounded-[4px] h-[48px] border-[#bdbdbd] py-[10pz] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
                placeholder="이름을 입력해주세요"
              />
              <button className=" flex justify-center items-center w-[112px] h-[48px] py-[16px] px-[8px] bg-[#ececec] rounded-[4px]]">
                중복확인
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="flex">
              <div className="text-[16px] font-[500]">생년월일 </div>
              <div className="text-red-500 text-[16px] font-[400]">*</div>
            </div>
            <input
              type="number"
              className="border rounded-[4px] w-full h-[48px] border-[#bdbdbd] py-[10pz] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
              placeholder="8자리 입력해주세요 (ex.20001004)"
            />
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[16px] items-center">
            <div className="flex">
              <div className="text-[16px] font-[500]">이메일</div>
              <div className="text-red-500 text-[16px] font-[400]">*</div>
            </div>
            <div className="text-[14px] font-[600] text-[#6201E0]">
              로그인 시 아이디로 사용합니다.
            </div>
          </div>
          <div className="flex gap-[20px]">
            <input
              type="text"
              className="flex-1 border rounded-[4px] h-[48px] border-[#bdbdbd] py-[10px] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
              placeholder="이메일(example@gmail.com)"
            />
            <button className=" flex justify-center items-center w-[112px] h-[48px] py-[20px] px-[10px] bg-[#ececec] rounded-[4px] text-[16px]">
              인증번호전송
            </button>
          </div>
          <div className="flex gap-[20px]">
            <input
              type="text"
              className="flex-1 border rounded-[4px] h-[48px] border-[#bdbdbd] py-[10px] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
              placeholder="인증번호 6자리를 입력해주세요"
            />
            <button className=" flex justify-center items-center w-[112px] h-[48px] py-[20px] px-[10px] bg-[#ececec] rounded-[4px] text-[16px]">
              인증번호확인
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex">
            <div className="text-[16px] font-[500]">휴대전화</div>
            <div className="text-red-500 text-[16px] font-[400]">*</div>
          </div>
          <div className="flex w-full gap-[20px]">
            <div className="flex grow min-w-0 gap-[5px] items-center">
              <input
                type="text"
                className="min-w-0 grow border rounded-[4px] h-[48px] border-[#bdbdbd] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
                placeholder="010"
              />
              -
              <input
                type="text"
                className="min-w-0 grow border rounded-[4px] h-[48px] border-[#bdbdbd] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
                placeholder="1234"
              />
              -
              <input
                type="text"
                className="min-w-0 grow border rounded-[4px] h-[48px] border-[#bdbdbd] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
                placeholder="5678"
              />
            </div>
            <button className="shrink-0 w-[112px] h-[48px] flex justify-center items-center bg-[#ececec] rounded-[4px] text-[16px]">
              인증번호전송
            </button>
          </div>
          <div className="flex gap-[20px]">
            <input
              type="text"
              className="flex-1 border rounded-[4px] h-[48px] border-[#bdbdbd] py-[10px] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
              placeholder="인증번호 6자리를 입력해주세요"
            />
            <button className=" flex justify-center items-center w-[112px] h-[48px] py-[20px] px-[10px] bg-[#ececec] rounded-[4px] text-[16px]">
              인증번호확인
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-[20px]">
          <div className="flex gap-[16px] items-center">
            <div className="flex">
              <div className="text-[16px] font-[500]">비밀번호</div>
              <div className="text-red-500 text-[16px] font-[400]">*</div>
            </div>
            <div className="text-[14px] font-[600] text-[#6201E0]">
              8 ~ 15자리의 영문 대소문자, 숫자, 특수문자 포함
            </div>
          </div>
          <input
            type="password"
            className="flex-1 border rounded-[4px] h-[48px] border-[#bdbdbd] py-[10px] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
            placeholder="비밀번호를 입력해주세요"
          />

          <input
            type="password"
            className="flex-1 border rounded-[4px] h-[48px] border-[#bdbdbd] py-[10px] px-[16px] placeholder:text-[14px] placeholder:font-[400]"
            placeholder="비밀번호를 다시입력해주세요"
          />
        </div>
        <button className="w-full h-[52px] bg-[#6201e0] rounded-[4px] text-[16px] text-[#efe6fc] font-[500]">
          가입하기
        </button>
      </div>
    </div>
  )
}
