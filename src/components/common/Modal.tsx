import React, { useEffect } from 'react'

interface CommonModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function CommonModal({
  isOpen,
  onClose,
  children,
}: CommonModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-opacity-50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className=" w-[428px] h-[162px] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.25)] rounded-[24px] p-[24px] flex flex-col justify-between"
      >
        <div>{children}</div>{' '}
        <div className="flex justify-end gap-[12px]">
          <button
            onClick={onClose}
            className="flex justify-center items-center px-[24px] py-[18px] bg-[#efe6fc] text-[16px] text-[#4e01b3] font-[600] rounded-[100px] h-[43px] w-[76px]"
          >
            취소
          </button>
          <button
            onClick={onClose}
            className="flex justify-center items-center px-[24px] py-[18px] bg-[#6201e0] text-[16px] text-[#fafafa] font-[600] rounded-[100px] h-[43px] w-[76px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  )
}

//const [open, setOpen] = useState(false);<CommonModal isOpen={open} onClose={() => setOpen(false)} title="모달 제목"><p>모달 내용</p></CommonModal>
