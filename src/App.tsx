import { Route, Routes } from 'react-router-dom'; 
import './App.css'
import CommunityDetail from './pages/ComunityDetail'
import Layout from './pages/Layout'
import CommunityList from './pages/CommunityList'
import Login from './pages/Login'
import Join from './pages/Join'
import CommunityPost from './pages/CommunityPost'
import CommunityEdits from './pages/CommunityEdits'
import NotFound from './pages/NotFound'
https://github.com/OZ-Coding-School/oz_externship_fe_01_team1/pull/6/conflict?name=src%252FApp.tsx&ancestor_oid=e77dfb5f3eebc27e094f218edb3f8661a08b1c6f&base_oid=ee5cc033f42d86cc8de105fc5f62a8b465b469bb&head_oid=8c697edd89578f28b1f8d6d99ec16f3e36a4854a
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" />
        <Route path="/CommunityList" element={<CommunityList />} />
        <Route path="/CommunityList/CommunityEdit" element={<CommunityEdits />} />
        <Route path="/CommunityList/CommunityPost" element={<CommunityPost />} />
        <Route path="/CommunityList/CommunityDetail" element={<CommunityDetail />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}