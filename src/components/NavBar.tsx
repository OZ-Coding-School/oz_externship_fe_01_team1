import { Link} from 'react-router'
import { useNavigate } from 'react-router-dom'
import ozLogo from '../assets/oz_logo.png'
import default_profile_img from '../assets/profile_default.png'
import { useEffect, useState } from 'react'
import { useUserInfo } from '@store/userInfoStore'
import RegisterStudentModal from './modals/RegisterStudentModal/RegisterStudentModal'

export default function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const userInfo = useUserInfo((state) => state.userInfo)
  const setUserInfo = useUserInfo((state) => state.setUserInfo)
  const initializeUserInfo = useUserInfo((state) => state.initializeUserInfo)
  const [showRegisterModal, setShowRegisterModal] = useState(false)

  useEffect(() => {
    initializeUserInfo()
  }, [])

  const sortOptions = ['수강생 등록','마이페이지', '로그아웃']
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full flex justify-center items-center bg-[#222222] text-[#ffffff] 
      font-[400] text-[16px] h-[48px]">
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
                className="h-[40p] w-[40px] rounded-full cursor-pointer"
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
            <div className="absolute top-[100%] right-0 mt-2 bg-white shadow-lg rounded-xl p-4 w-52 text-sm z-50">
              {userInfo && (
                <>
                  {/* 닉네임 + 이메일 */}
                  <div className="mb-2">
                  <div className="text-[16px] mb-[12px] font-bold">{userInfo?.user.nickname}</div>
                  <div className="text-[13px] mb-[20px] text-gray-400">{userInfo?.user.email}</div>
                  </div>
                  <div className="border-t border-gray-200 my-2" />
                </>
              )}
              {sortOptions.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    if (option === '수강생 등록') {
                      setShowRegisterModal(true)
                    } else if (option === '마이페이지') {
                      navigate('/MyPage')
                    } else if (option === '로그아웃') {
                      setUserInfo(null)
                      setIsDropdownOpen(false)
                      localStorage.removeItem('userData')
                    } else {
                      throw new Error('Error')
                    }
                  }}
                  className="px-3 py-2 text-left transition cursor-pointer 
                  hover:bg-purple-100 hover:text-[#6202E0] font-normal text-[14px]"
                >
                  {option}
                </div>
              ))}
              </div>
            )}
          </div>
              {/* ✅ 모달 조건부 렌더링: 여기에 들어가야 함 */}
              {showRegisterModal && (
                <RegisterStudentModal onClose={() => setShowRegisterModal(false)} />
              )}
        </div>
      </div>
      
    </>
  )
}
