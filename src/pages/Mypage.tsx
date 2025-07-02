import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import profileDefault from '../assets/profile_default.png';

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
  const profileImgSrc = user.profileImg || profileDefault;
  const thumbnailSrc = user.course.thumbnail || profileImgSrc;

  const handleEditClick = () => {
    navigate('/MyPage/MyPageEdit');
  };

  return (
    <div className="min-h-screen bg-white flex justify-center py-20 text-black font-sans">
      <div className="flex w-[944px] gap-12">
        {/* 왼쪽 메뉴 */}
        <div className="w-[200px] pt-2">
          <div className="flex flex-col gap-4 text-[18px] font-semibold text-[#7B61FF]">
            <div className="text-[#BDBDBD] border-l-4 border-transparent pl-4 cursor-pointer hover:text-[#7B61FF] hover:border-[#7B61FF] transition">
              쪽지 시험
            </div>
            <div className="text-[#BDBDBD] border-l-4 border-transparent pl-4 cursor-pointer hover:text-[#7B61FF] hover:border-[#7B61FF] transition">
              내 정보
            </div>
            <div className="text-[#BDBDBD] border-l-4 border-transparent pl-4 cursor-pointer hover:text-[#7B61FF] hover:border-[#7B61FF] transition">
              비밀번호 변경
            </div>
          </div>
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="flex-1 flex flex-col gap-10">
          {/* 상단 내 정보 헤더 및 수정 버튼 */}
          <div className="flex items-center justify-between">
            <h2 className="text-[28px] font-semibold">내 정보</h2>
            <button
              onClick={handleEditClick}
              className="border border-[#7B61FF] text-[#7B61FF] rounded px-4 py-1 text-[14px] font-medium hover:bg-[#f7f3ff] transition"
            >
              수정하기
            </button>
          </div>

          {/* 프로필 박스 */}
          <div className="bg-white border border-[#D9D9D9] rounded-[8px] px-[44px] py-[52px] flex flex-col items-center gap-[40px]">
            {/* 프로필 헤더 */}
            <div className="w-full">
              <h2 className="text-[#7B61FF] font-bold text-[16px] mb-2">프로필</h2>
              <div className="border-b border-[#D9D9D9] w-full" />
            </div>

            {/* 프로필 이미지 140x140, 닉네임, 이메일 */}
            <div className="flex flex-col items-center">
              <div className="w-[140px] h-[140px] rounded-full overflow-hidden bg-[#E0E0E0] mb-6">
                <img src={profileImgSrc} alt="프로필" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-[14px] w-full max-w-[440px]">
                <div className="text-[#4F4F4F]">닉네임</div>
                <div className="text-black font-medium">{user.nickname}</div>
                <div className="text-[#4F4F4F]">이메일</div>
                <div className="text-black font-medium">{user.email}</div>
              </div>
            </div>

            {/* 개인정보 */}
            <div className="w-full">
              <h2 className="text-[#7B61FF] font-bold text-[16px] mb-2">개인 정보</h2>
              <div className="border-b border-[#D9D9D9] w-full mb-4" />
              <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-[14px]">
                <div className="text-[#4F4F4F]">이름</div>
                <div className="text-black font-medium">{user.name}</div>
                <div className="text-[#4F4F4F]">휴대전화</div>
                <div className="text-black font-medium">{user.phone}</div>
                <div className="text-[#4F4F4F]">생년월일</div>
                <div className="text-black font-medium">{user.birth}</div>
                <div className="text-[#4F4F4F]">거주지</div>
                <div className="text-black font-medium">{user.address}</div>
              </div>
            </div>
          </div>

          {/* 수강 증명 과정 */}
          <div className="bg-white border border-[#D9D9D9] rounded-[8px] px-[44px] py-[52px] flex flex-col items-start gap-[40px]">
            <div className="w-full">
              <h2 className="text-[#7B61FF] font-bold text-[16px] mb-2">수강 중인 과정</h2>
              <div className="border-b border-[#D9D9D9] w-full" />
            </div>

            <div className="w-full flex items-start justify-between">
              <div>
                <div className="text-black font-medium text-[14px] mb-2">{user.course.title}</div>
                <div className="text-[#4F4F4F] text-[13px]">{user.course.description}</div>
                <div className="text-[#BDBDBD] text-[13px] mt-2">
                  {user.nickname} · {user.course.date} · 좋아요 {user.course.likes}
                </div>
                <div className="text-[#7B61FF] text-[13px] mt-1 underline cursor-pointer">
                  이수증/카드 발급 <span className="ml-1">&gt;</span>
                </div>
              </div>
              <div className="w-[140px] h-[80px] bg-[#E0E0E0] rounded overflow-hidden">
                <img src={thumbnailSrc} alt="썸네일" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* 탈퇴 안내 + 탈퇴 버튼 한 줄에 */}
          <div className="flex justify-between items-center text-[#BDBDBD] text-[12px] leading-relaxed">
            <div>
              회원 탈퇴 안내<br />
              탈퇴 시, 수강 기간 / 작성한 글 / 댓글 / 가입정보 / 개인인증 서류가 모두 삭제되며 복구가 불가능합니다.<br />
              일시 정지, 상담이 필요한 경우 반드시 문의 후 진행해 주세요.
            </div>
            <button className="border border-[#BDBDBD] text-[#4F4F4F] rounded px-4 py-2 text-[13px] font-medium hover:bg-[#f7f3ff] transition whitespace-nowrap">
              회원 탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
