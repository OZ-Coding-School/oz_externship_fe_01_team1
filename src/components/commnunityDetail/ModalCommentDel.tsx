export default function ModalCommentDel({
  setIsModal,
}: {
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const handleCancel = () => {
    setIsModal(false)
  }

  const handleDelete = () => {
    setIsModal(false)
  }
  return (
    <div className="flex flex-col p-[24px] justify-between w-[428px] h-[162px] bg-[#ffffff] shadow-[0_4px_16px_rgba(0,0,0,0.25)] rounded-[24px] absolute top-[-50px] left-1/2 -translate-x-1/2">
      <div>댓글을 삭제하시겠습니까?</div>{' '}
      <div className="flex justify-end gap-[12px]">
        <button
          className="flex justify-center items-center px-[24px] py-[18px] bg-[#efe6fc] text-[16px] text-[#4e01b3] font-[600] rounded-[100px] h-[43px] w-[76px]"
          onClick={handleCancel}
        >
          취소
        </button>
        <button
          className="flex justify-center items-center px-[24px] py-[18px] bg-[#6201e0] text-[16px] text-[#fafafa] font-[600] rounded-[100px] h-[43px] w-[76px]"
          onClick={handleDelete}
        >
          확인
        </button>
      </div>
    </div>
  )
}
