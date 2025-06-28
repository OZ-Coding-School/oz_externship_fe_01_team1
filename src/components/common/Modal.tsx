import React, { useEffect, useRef } from 'react'

interface CommonModalProps {
  title: string
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  position?: 'center' | 'inline' | 'center-bg'
}

export default function CommonModal({
  isOpen,
  onClose,
  children,
  position = 'center',
  title,
}: CommonModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    // 외부 클릭 시 창닫기
    const handleClickOutside = (e: MouseEvent) => {
      if (
        modalRef.current && // ref current 가 존재하고
        e.target instanceof Node && // 클릭 이 node 이고
        !modalRef.current.contains(e.target) // null 이 아닐때
      ) {
        onClose() // 창닫힘
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      if (position === 'inline') {
        document.addEventListener('mousedown', handleClickOutside)
      }
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (position === 'inline') {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose, position])

  if (!isOpen) return null

  const modalContent = (
    <div
      ref={modalRef}
      onClick={(e) => e.stopPropagation()}
      className={`${position === 'inline' ? 'absolute top-[-70px] left-[300px]' : ''} w-[428px] h-[162px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] rounded-[24px] p-[24px] flex flex-col justify-between`}
    >
      <div className="text-[14px] mb-[12px]">{title}</div>
      <div className="flex justify-end gap-[12px]">{children}</div>
    </div>
  )

  if (position === 'inline') {
    return modalContent
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center ${position === 'center-bg' ? 'bg-[rgba(0,0,0,0.2)]' : ''}`}
      onClick={onClose}
    >
      {modalContent}
    </div>
  )
}
