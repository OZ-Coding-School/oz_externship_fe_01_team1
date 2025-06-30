// SNS 간편 로그인 버튼 컴포넌트
// - 로그인 페이지 상단에 위치
// - 각각 카카오, 네이버 로그인 버튼 역할
// - Button 컴포넌트 (공통 UI) 기반으로 구성됨

import { FaComment } from 'react-icons/fa'; // 카카오 아이콘
import { SiNaver } from 'react-icons/si'; // 네이버 아이콘
import { Button } from '@components/common'; // 공통 버튼 컴포넌트

const LoginButtons = () => (
  <>
    {/* 카카오 간편 로그인 버튼 */}
    <Button 
      fullWidth={false} // 반드시 false로 설정해야 w-full 적용 방지됨
      className="w-[348px] h-[52px] bg-[#FEE500] text-[#391C1A] rounded flex items-center 
      text-[16px] justify-center font-normal mb-[12px] cursor-pointer"
    >
      <FaComment className="mr-2" />
      카카오 간편 로그인 / 가입
    </Button>
    
    {/* 네이버 간편 로그인 버튼 */}
    <Button
      fullWidth={false}
      className="w-[348px] h-[52px] bg-[#03C75A] text-white rounded flex items-center 
      text-[16px] justify-center font-normal cursor-pointer"
    >
      <SiNaver className="mr-2" />
      네이버 간편 로그인 / 가입
    </Button>
  </>
);

export default LoginButtons;