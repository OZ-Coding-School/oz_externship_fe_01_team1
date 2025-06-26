import { Route, Routes } from 'react-router'
import './App.css'
import CommunityDetail from './pages/CommunityDetail'
import Layout from './pages/Layout'
// Update the import path to match the actual filename, e.g. CommunityList.tsx or CommunityList/index.tsx
import CommunityList from './pages/CommunityList' // <-- Update this path if the file is named differently, e.g. './pages/CommunityList.tsx'
import Login from './pages/Login'
import Join from './pages/Join'
import CommunityPost from './pages/CommunityPost';
import CommunityEdits from './pages/CommunityEdits'

export default function App() {
  return  (
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/"/>
          <Route path="/CommunityList" element={<CommunityList/>}/>
          <Route
              path="/CommunityList/CommunityEdit"
              element={<CommunityEdits/>}
          />
          <Route
              path="/CommunityList/CommunityPost"
              element={<CommunityPost/>}
          />
          <Route
              path="/CommunityList/CommunityDetail"
              element={<CommunityDetail/>}
          />
          <Route path="/Join" element={<Join/>}/>
          <Route path="/Login" element={<Login/>}/>
        </Route>
      </Routes>
  )

}



