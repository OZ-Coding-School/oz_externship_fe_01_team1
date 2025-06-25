import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200">
      <h1 className="text-9xl font-extrabold text-gray-300 dark:text-gray-600">
        404
      </h1>
      <p className="text-2xl mt-[-20px] font-semibold">
        페이지를 찾을 수 없습니다.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-[#6201E0] text-white rounded-lg hover:bg-[#3B0186] transition-colors duration-200"
      >
        홈으로 이동
      </Link>
    </div>
  )
}
