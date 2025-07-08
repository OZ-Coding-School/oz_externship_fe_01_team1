import axios from 'axios'

// 인스턴스 생성
const api = axios.create({
  baseURL: import.meta.env.VITE_API_MAIN_URL, // 공통 API URL (엔드포인트를 제외한 백엔드 API 주소)
  timeout: 5000, // 요청 타임아웃 (5초뒤에 요청 중단해주세요.)
  headers: {
    'Content-Type': 'application/json', // 공통 헤더
  },
})

export default api
