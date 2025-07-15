import type { userData } from '@customType/userData'
import axios from 'axios'

// 인스턴스 생성
const api = axios.create({
    baseURL: import.meta.env.VITE_API_MAIN_URL,
    timeout: 15000,
    withCredentials: true,
})

// 요청 인터셉터: 요청 전에 토큰을 헤더에 추가
api.interceptors.request.use(
    (config) => {
        try {
            const userInfo = localStorage.getItem('userInfo')

            if (userInfo) {
                const parsed = JSON.parse(userInfo) as { state?: { userInfo?: userData } }
                const token = parsed?.state?.userInfo?.access

                if (token) {
                    console.log('✅ Access Token:', token)
                    config.headers = config.headers || {} // 안전하게 초기화
                    config.headers.Authorization = `Bearer ${token}`
                }
            }
        } catch (error) {
            console.error('❌ userInfo 파싱 오류 또는 토큰 접근 실패:', error)
        }

        // multipart/form-data 시 Content-Type 제거 (axios가 자동 설정하게)
        if (
            config.data instanceof FormData &&
            config.headers &&
            'Content-Type' in config.headers
        ) {
            delete config.headers['Content-Type']
        }

        return config
    },
    (error) => {
        console.error('❌ Request error:', error)
        return Promise.reject(error)
    }
)

export default api
