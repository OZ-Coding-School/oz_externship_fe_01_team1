import { useEffect } from 'react'
import { Outlet } from 'react-router'
import NavBar from '../components/NavBar'
import Footer from '@components/Footer.tsx'
import LowercaseRedirect from '@components/common/LowercaseRedirect.tsx'
import { useAuthStore } from '@store/useAuthStore' 

export default function Layout() {
  const { initAuth } = useAuthStore() // localStorage 복원 함수

  useEffect(() => {
    initAuth()
  }, [])

  return (
    <>
      <LowercaseRedirect />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}