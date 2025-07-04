import { Route, Routes } from 'react-router-dom'; 
import './App.css'
import CommunityDetail from './pages/CommunityDetail'
import Layout from './pages/Layout'
import CommunityList from './pages/CommunityList'
import Login from './pages/Login'
import Join from './pages/Join'
import CommunityPost from './pages/CommunityPost'
import CommunityEdits from './pages/CommunityEdits'
import JoinFrom from './components/join/JoinForm'
import NotFound from './pages/NotFound'
import MyPage from "@pages/Mypage.tsx";
import MyPageEdit from "@pages/MypageEdit.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CommunityList />}/>
        <Route path="/CommunityList" element={<CommunityList />} />
        <Route path="/CommunityList/CommunityEdit/:id" element={<CommunityEdits />} />
        <Route path="/CommunityList/CommunityPost" element={<CommunityPost />} />
        <Route path="/CommunityList/CommunityDetail/:id" element={<CommunityDetail />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Join/JoinForm" element={<JoinFrom />} />
        <Route path="/Mypage" element={<MyPage />} />
        <Route path="/MyPage/MyPageEdit" element={<MyPageEdit />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}