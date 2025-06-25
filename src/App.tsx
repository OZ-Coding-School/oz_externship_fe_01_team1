import { Route, Routes } from 'react-router-dom'; 
import './App.css'
import CommunityDetail from './pages/ComunityDetail'
import Layout from './pages/Layout'
import CommunityList from './pages/CommunityList'
import Login from './pages/Login'
import Join from './pages/Join'
import CommunityPost from './pages/CommunityPost'
import CommunityEdits from './pages/CommunityEdits'

function App() {
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
      </Route>
    </Routes>
  );
}

export default App;