import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import default_profile_img from '../assets/profile_default.png';
import checker from '../assets/checker.png';
import Button from '@components/common/Button'
import SidebarMenu from '@components/mypage/SidebarMenu';

const mockUser = {
  nickname: '오즈오즈',
  email: 'ozschool1234@gmail.com',
  name: '김오즈',
  phone: '010 - 1234 - 1234',
  birth: '20001225',
  address: '경기도 김포시 사우중앙로 87, 201호',
  profileImg: '',
  course: {
    title: '익스턴십 개발 캠프 · 오즈코딩',
    description: 'IT스타트업 실무형 풀스택 웹개발 부트캠프 (React + Node.js) <1기>',
    date: '2024.06.27',
    likes: 58,
    thumbnail: '',
  },
};

const isLoggedIn = true;

export default function MyPage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    }
  }, [isLoggedIn, navigate]);

  const user = mockUser;
  
  const handleEditClick = () => {
    navigate('/MyPage/MyPageEdit');
  };

  return (
    <div className="min-h-screen bg-white flex justify-center py-20 text-black font-sans">
      <div className="flex w-[944px] gap-12">
        {/* 왼쪽 메뉴 */}
        <SidebarMenu active="내 정보" />

        {/* 오른쪽 콘텐츠 */}
        <div className=" w-[744px] flex-1 flex flex-col gap-10">
          {/* 상단 내 정보 헤더 및 수정 버튼 */}
          <div className="flex items-center justify-between">
            <h2 className="text-[28px] font-semibold">내 정보</h2>

            <Button
            onClick={handleEditClick}
            fullWidth={false}
            className="w-[126px] bg-[#6201E0] text-[#ffffff] text-[16px] px-4 py- cursor-pointer"
          >
            수정하기
          </Button>
          </div>

          {/* 프로필 박스 */}
          <div className="border border-[#d1d1d1] rounded-[8px] px-[44px] py-[52px] flex flex-col items-center">
            {/* 프로필 헤더 */}
            <div className="w-full">
              <h2 className="text-[#6201E0] font-bold text-[20px] mb-[16px]">프로필</h2>
              <div className="border-b border-[#bdbdbd] w-full" />
            </div>

            {/* 프로필 이미지 + 닉네임/이메일 */}
            <div className="w-full flex flex-col items-center">
              {/* 프로필 이미지 */}
              <div className="w-[184px] h-[184px] rounded-full overflow-hidden mt-[52px] mb-[52px]">
                <img src={default_profile_img} alt="프로필" className="w-full h-full object-cover" />
              </div>

              {/* 텍스트를 왼쪽 기준으로 */}
              <div className="w-full flex justify-start mb-[100px]">
                <div className="grid grid-cols-2 gap-y-[42px] text-[14px] max-w-[440px]">
                  <div className="text-[#121212] text-[18px]">닉네임</div>
                  <div className="text-[#121212] text-[16px]">{user.nickname}</div>
                  <div className="text-[#121212] text-[18px]">이메일</div>
                  <div className="text-[#121212] text-[16px]">{user.email}</div>
                </div>
              </div>
            </div>

            {/* 개인정보 */}
            <div className="w-full">
              <h2 className="text-[#6201E0] font-bold text-[20px] mb-[16px]">개인 정보</h2>
              <div className="border-b border-[#D9D9D9] w-full mb-[52px]" />
              <div className="grid grid-cols-2 gap-y-[40px] gap-x-8 text-[14px]">
                <div className="text-[#121212] text-[18px]">이름</div>
                <div className="text-[#121212] text-[16px]">{user.name}</div>
                <div className="text-[#121212] text-[18px]">휴대전화</div>
                <div className="text-[#121212] text-[16px]">{user.phone}</div>
                <div className="text-[#121212] text-[18px]">생년월일</div>
                <div className="text-[#121212] text-[16px]">{user.birth}</div>
              </div>
            </div>
          </div>
          {/* 수강 증명 과정 */}
          <div className="border border-[#d1d1d1] rounded-[8px] px-[44px] py-[52px] flex flex-col items-start gap-[40px]">
            <div className="w-full">
              <h2 className="text-[#6201E0] font-bold text-[20px] mb-[16px]">수강 중인 과정</h2>
              <div className="border-b border-[#bdbdbd] w-full" />
            </div>

            {/* 내용 */}
            <div className="flex items-start gap-[33px] w-full">
              <div className="flex-1 min-w-0">
                <div className="text-[#bdbdbd] font-medium text-[14px] mb-[20px]">{user.course.title}</div>
                <div className="text-[#121212] font-normal text-[16px] leading-[1.4]">
                  {user.course.description}
                </div>
              </div>

              <div className="w-[152px] h-[102px] bg-[#d1d1d1] rounded overflow-hidden shrink-0">
                <img src={checker} alt="썸네일" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* 탈퇴 안내 + 탈퇴 버튼 한 줄에 */}
          <div className="flex justify-between items-center leading-relaxed mt-[40px]">
            <div className="">
              <p className="text-[20px] mb-[34px] text-[#9d9d9d]">회원 탈퇴 안내</p>
              <p className="text-[14px] text-[#bdbdbd]">탈퇴 처리 시, 수강 기간 / 포인트 / 쿠폰은 소멸되며 환불되지 않습니다.
                  <br /> 필요한 경우, 반드시 탈퇴 전에 문의 바랍니다..</p>
            </div>

            <Button
              fullWidth={false}
              className="w-[142px] border border-[#cecece] bg-[#ececec] text-[#4d4d4d] px-4 py-2 text-[16px]
              cursor-pointer"
            >
              회원 탈퇴하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
