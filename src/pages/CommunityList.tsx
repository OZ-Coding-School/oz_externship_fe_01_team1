import { Link } from 'react-router'

export default function CommunityList() {
  return (
    <>
      <h1 className="text-[30px]">커뮤니티 목록 페이지</h1>
      <div>
        <Link to="/CommunityList/CommunityDetail">
          커뮤니티 상세페이지 이동
        </Link>
      </div>
      <div>
        <Link to="/CommunityList/CommunityPost">글작성 페이지 이동</Link>
      </div>
      <div>
        <Link to="/CommunityList/CommunityEdit">글수정 페이지 이동</Link>
      </div>
    </>
  )
}
