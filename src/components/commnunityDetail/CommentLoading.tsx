import { useEffect, useState } from 'react'

export default function CommentLoading() {
  const [active, setActive] = useState(0) // 현재 애니메이션 중인 점 index

  useEffect(() => {
    if (active < 3) {
      const timer = setTimeout(() => {
        setActive((prev) => (prev + 1) % 3)
      }, 1000) // 각 점 1초 간격으로 실행
      return () => clearTimeout(timer)
    }
  }, [active])

  return (
    <div className="flex h-[48px] w-[48px] justify-around">
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={`w-[8px] h-[8px] bg-[#6101E0] rounded-full relative ${
            active === index ? 'bounce-x' : ''
          }`}
        />
      ))}
    </div>
  )
}
