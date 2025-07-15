import type { userData } from '@customType/userData'
import axios, { type AxiosRequestConfig } from 'axios'

// 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_MAIN_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json', // 공통 헤더
    Authorization: '',
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

const refreshAccessToken = async () => {
  const userInfo = localStorage.getItem('userInfo')
  if (!userInfo) throw new Error('No userInfo found in localStorage')

  const parsed: { state: { userInfo: userData } } = JSON.parse(userInfo)
  const refreshToken = parsed.state.userInfo.refresh
  if (!refreshToken) throw new Error('No refresh token found')

  const res = await axios.post('v1/auth/token/refresh/', {
    refresh: refreshToken,
  })

  const newAccessToken: string = res.data.accessToken
  parsed.state.userInfo.access = newAccessToken
  localStorage.setItem('userInfo', JSON.stringify(parsed))

  return newAccessToken
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      try {
        const newAccessToken = await refreshAccessToken()
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        }
        return api(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('userInfo')
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default api
