import { Route, Routes } from 'react-router'
import './App.css'
import CommunityDetail from './pages/CommunityDetail'
import Layout from './pages/Layout'
import CommunityList from './pages/CommunityList'
import Login from './pages/Login'
import Join from './pages/Join'
<<<<<<< HEAD
import CommunityPost from './pages/CommunityPost'
=======
import { CommunityPost } from './pages/CommunityPost'
>>>>>>> e929f05 (오타 수정 및 댓글 정렬 기능 커스텀훅으로 적용)
import CommunityEdits from './pages/CommunityEdits'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" />
        <Route path="/CommunityList" element={<CommunityList />} />
        <Route
          path="/CommunityList/CommunityEdit"
          element={<CommunityEdits />}
        />
        <Route
          path="/CommunityList/CommunityPost"
          element={<CommunityPost />}
        />
        <Route
          path="/CommunityList/CommunityDetail"
          element={<CommunityDetail />}
        />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
<<<<<<< HEAD
        <Route path="*" element={<NotFound />} />
=======
>>>>>>> e929f05 (오타 수정 및 댓글 정렬 기능 커스텀훅으로 적용)
      </Route>
    </Routes>
  )
}
