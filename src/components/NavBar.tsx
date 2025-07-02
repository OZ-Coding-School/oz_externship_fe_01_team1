import { Link } from 'react-router'

// 이미지 파일 import (src/assets/oz_logo.png 등 실제 경로에 맞게 수정)
import ozLogo from '../assets/oz_logo.png'
import { useUserInfo } from '@store/userInfoStore'
import default_profile_img from '../assets/profile_default.png'

export default function NavBar() {
  const { userInfo } = useUserInfo()
  return (
    <>
      <div className="w-full flex justify-center items-center bg-[#222222] text-[#ffffff] font-[400] text-[16px] h-[48px]">
        🚨 선착순 모집! 국비지원 받고 4주 완성
      </div>
      <div className="w-full flex justify-center items-center border-[rgba(0,0,0,0.2)] border-[1px] py-[8px]">
        <div
          className="flex items-center justify-between"
          style={{ width: '1200px', height: '48px' }}
        >
          <div className="flex gap-[60px] items-center">
            {/* 오즈코딩스쿨 텍스트 대신 이미지 (조건에 맞게 스타일 적용) */}
            <img
              src={ozLogo}
              alt="OZ코딩스쿨"
              style={{
                width: '149.68px',
                height: '20px',
                top: 0,
                left: 0,
                borderRadius: 0,
                objectFit: 'contain',
                display: 'block',
              }}
            />
            <div className="flex gap-[60px]">
              <Link to="/CommunityList">커뮤니티</Link>
              <div>질의응답</div>
            </div>
          </div>
          <div className="flex gap-[12px] items-center">
            {userInfo ? (
              <img src={default_profile_img} alt="" className="h-[40px]" />
            ) : (
              <>
                <Link to="/Login">로그인</Link>
                <div>|</div>
                <Link to="/Join">회원가입</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
