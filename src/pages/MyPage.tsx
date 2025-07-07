import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import profileDefault from '../assets/profile_default.png';

// 예시: 실제로는 전역 상태관리(store)나 context, props 등에서 받아오세요.
const mockUser = {
  nickname: 'ozsx5x',
  email: 'ozschool1234@gmail.com',
  name: '김오즈',
  phone: '010 - 1234 - 1234',
  birth: '20001225',
  address: '경기도 성남시 사송북로 87, 201동',
  profileImg: '', // 없으면 기본 이미지
  course: {
    title: 'React로 블로그 만들기 스터디',
    date: '2024.06.27',
    likes: 99,
    thumbnail: '', // 없으면 프로필 이미지와 동일하게
  },
};

// 예시: 실제 로그인 여부 (store/context에서 받아오세요)
const isLoggedIn = true; // 실제로는 상태에서 받아와야 함

export default function MyPage() {
  const navigate = useNavigate();

  // 로그인 안 했으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    }
  }, [isLoggedIn, navigate]);

  const user = mockUser;
  const profileImgSrc = user.profileImg ? user.profileImg : profileDefault;
  const thumbnailSrc = user.course.thumbnail ? user.course.thumbnail : profileImgSrc;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* 본문 */}
      <div className="flex w-[1200px] mt-12">
        {/* 왼쪽 메뉴 */}
        <div className="w-[200px] mr-12">
          <div className="flex flex-col gap-4 text-[18px] font-semibold text-[#7B61FF]">
            <div className="border-l-4 border-[#7B61FF] pl-4">내 정보</div>
            <div className="text-[#BDBDBD] border-l-4 border-transparent pl-4">비밀번호 변경</div>
          </div>
        </div>
        {/* 오른쪽 본문 */}
        <div className="flex-1">
          <h2 className="text-[28px] font-semibold mb-8">내 정보</h2>
          <div className="bg-white border border-[#E0E0E0] rounded-[8px] p-8 mb-8 w-full max-w-[700px]">
            {/* 프로필 */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <div className="text-[20px] font-semibold">프로필</div>
                <button className="border border-[#7B61FF] text-[#7B61FF] rounded px-4 py-1 text-[14px] font-medium hover:bg-[#f7f3ff] transition">수정하기</button>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-[80px] h-[80px] rounded-full bg-[#E0E0E0] flex items-center justify-center overflow-hidden">
                  <img src={profileImgSrc} alt="프로필" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold text-[18px] mb-1">{user.nickname}</div>
                  <div className="text-[#828282] text-[15px]">{user.email}</div>
                </div>
              </div>
            </div>
            {/* 개인 정보 */}
            <div className="mb-8">
              <div className="text-[20px] font-semibold mb-4">개인 정보</div>
              <div className="grid grid-cols-2 gap-y-2 gap-x-8 text-[15px]">
                <div>
                  <span className="text-[#BDBDBD] mr-2">이름</span>
                  <span>{user.name}</span>
                </div>
                <div>
                  <span className="text-[#BDBDBD] mr-2">휴대폰 번호</span>
                  <span>{user.phone}</span>
                </div>
                <div>
                  <span className="text-[#BDBDBD] mr-2">생년월일</span>
                  <span>{user.birth}</span>
                </div>
                <div>
                  <span className="text-[#BDBDBD] mr-2">거주지</span>
                  <span>{user.address}</span>
                </div>
              </div>
            </div>
            {/* 수강 증명 과정 */}
            <div>
              <div className="text-[20px] font-semibold mb-4">수강 증명 과정</div>
              <div className="flex items-center gap-4 border border-[#E0E0E0] rounded-[8px] p-4 bg-[#FAFAFA]">
                <div className="w-[120px] h-[90px] bg-[#E0E0E0] flex items-center justify-center rounded overflow-hidden">
                  <img src={thumbnailSrc} alt="썸네일" className="w-full h-full object-cover" />
                </div>
                <div>
                  <div className="font-semibold">{user.course.title}</div>
                  <div className="text-[#BDBDBD] text-[14px]">
                    {user.nickname} · {user.course.date} · 좋아요 {user.course.likes}
                  </div>
                  <div className="text-[#7B61FF] text-[14px] mt-1 underline cursor-pointer">
                    이수증/카드 발급 <span className="ml-1">&gt;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 하단 안내 */}
          <div className="text-[#BDBDBD] text-[13px] mb-2">
            탈퇴 안내 안내<br />
            탈퇴 시, 수강정보, 작성글, 댓글, 가입정보, 개인인증 서류가 영구히 삭제되며 복구가 불가합니다.<br />
            일시적 정지, 상담, 남기기 등의 경우 탈퇴 전 문의 바랍니다.
          </div>
          <button className="border border-[#BDBDBD] text-[#BDBDBD] rounded px-4 py-2 text-[14px] font-medium hover:bg-[#f7f3ff] transition">
            전체 탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
}