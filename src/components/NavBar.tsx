import { Link } from 'react-router'

// 이미지 파일 import (src/assets/oz_logo.png 등 실제 경로에 맞게 수정)
import ozLogo from '../assets/oz_logo.png'
import { useUserInfo } from '@store/userInfoStore'
import default_profile_img from '../assets/profile_default.png'
import { useState } from 'react'

export default function NavBar() {
  const { userInfo } = useUserInfo()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const { setUserInfo } = useUserInfo()
  const sortOptions = ['로그아웃', '마이페이지']
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
            <div>
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
            </div>
            <div className="flex gap-[60px]">
              <Link to="/CommunityList">커뮤니티</Link>
              <div>질의응답</div>
            </div>
          </div>
          <div className="flex gap-[12px] items-center relative">
            {userInfo ? (
              <img
                src={default_profile_img}
                alt=""
                className="h-[40px]"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
              />
            ) : (
              <>
                <Link to="/Login">로그인</Link>
                <div>|</div>
                <Link to="/Join">회원가입</Link>
              </>
            )}
            {isDropdownOpen && (
              <div className="absolute top-[100%] right-0 mt-2 bg-white shadow-lg rounded-xl p-2 w-32 text-sm z-20">
                {sortOptions.map((option) => (
                  <div
                    key={option}
                    onClick={() => {
                      if (option === '로그아웃') {
                        setUserInfo(null)
                        setIsDropdownOpen(false)
                        localStorage.removeItem('userData')
                      }
                    }}
                    className="px-3 py-2 text-center transition rounded-md cursor-pointer hover:bg-purple-100 hover:text-[#6202E0] font-bold"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
