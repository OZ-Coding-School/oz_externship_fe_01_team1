import photo1 from '../../assets/commentphoto.png'

export default function Comment() {
  return (
    <div className="flex gap-[17px] w-full">
      <img src={photo1} className="w-[48px] h-[48px] rounded-[50%] " />
      <div className="flex flex-col gap-[20px] pb-[38px] border-b-[1px] border-[#cecece] w-full">
        <div className="flex items-center gap-[8px]">
          <div className="text-[#4d4d4d] text-[16px] font-[600]">jnubugo</div>
          <div className="text-[#9d9d9d] text-[12px] font-[500]">
            2025년 6월 13일
          </div>
        </div>
        <div className="text-[#000000] text-[16px] font-[400]">좋아요</div>
      </div>
    </div>
  )
}
