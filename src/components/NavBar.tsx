import { Link } from 'react-router'

export default function NavBar() {
  return (
    <>
      <div className="w-full flex justify-center items-center bg-[#222222] text-[#ffffff] font-[400] text-[16px] h-[48px]">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </div>
      <div className="flex justify-around items-center py-[8px] border-[rgba(0,0,0,0.2)] border-[1px]">
        <div className="flex gap-[60px]">
          <div>OZ 코딩스쿨</div>
          <div className="flex gap-[60px]">
            <Link to="/CommunityList">커뮤니티</Link>
            <div>질의응답</div>
          </div>
        </div>
        <div className="flex gap-[12px]">
          <Link to="/Login">로그인</Link>
          <div>|</div>
          <Link to="/JoinMain">회원가입</Link>
        </div>
      </div>
    </>
  )
}
