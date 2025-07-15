import type { userData } from '@customType/userData'
import axios from 'axios'

// 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_MAIN_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // 공통 헤더
  },
  withCredentials: true,
})

//요청 인터셉터: 요청 전에 토큰을 헤더에 추가
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      const parsed: { state: { userInfo: userData } } = JSON.parse(userInfo)
      const token = parsed.state.userInfo.access
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return error
  }
)

// export const testApi = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   timeout: 5000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// })

// testApi.interceptors.request.use(
//   (config) => {
//     const userInfo = localStorage.getItem('userInfo')

//     if (userInfo) {
//       const parsed: userData = JSON.parse(userInfo)
//       const token = parsed.access
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => {
//     console.error('Request error:', error)
//     return Promise.reject(error)
//   }
// )

export default api
