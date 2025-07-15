import type { userData } from '@customType/userData'
import axios from 'axios'

// 인스턴스 생성
const api = axios.create({
    baseURL: `/api`,
    timeout: 15000,
    withCredentials: true,
})

// 요청 인터셉터: 요청 전에 토큰을 헤더에 추가
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem('userInfo')

        if (userInfo) {
            const parsed: userData = JSON.parse(userInfo)
            const token = parsed.access
            console.log('✅ Access Token:', token)
            config.headers = config.headers || {} // 안전하게 초기화
            config.headers.Authorization = `Bearer ${token}`
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