import { useState } from 'react'

export default function SharePopup() {
  const [copied, setCopied] = useState(false)
  const [copyError, setCopyError] = useState(false)
  const currentUrl = window.location.href

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000) // 2초 후 복사 알림 사라짐
    } catch {
      setCopyError(true)
      setTimeout(() => setCopyError(false), 2000)
    } finally {
      // setShowPopup((prev: boolean) => !prev)
    }
  }
  return (
    <div className="absolute top-[200px] right-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
      <h3 className="font-semibold mb-2 text-gray-800">URL 공유</h3>
      <input
        type="text"
        value={currentUrl}
        readOnly
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-sm text-gray-600"
      />
      <button
        onClick={handleCopy}
        className={`w-full  text-white py-2 rounded ${copyError ? 'hover:bg-red-500 bg-red-400' : 'hover:bg-purple-700 bg-[#6201e0]'}`}
      >
        {copyError ? '복사실패' : copied ? '복사됨!' : '복사하기'}
      </button>
    </div>
  )
}
