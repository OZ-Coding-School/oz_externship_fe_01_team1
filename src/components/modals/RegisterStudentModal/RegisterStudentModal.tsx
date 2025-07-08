import ModalWrapper from '@components/common/ModalWrapper'
import ModalHeader from '@components/common/ModalHeader'
import CloseButton from '@components/common/CloseButton'
import Button from '@components/common/Button'
import CourseSelect from './CourseSelect'
import ClassSelect from './ClassSelect'
import { IoCheckmark } from "react-icons/io5";
import { useState } from 'react'


export default function RegisterStudentModal({ onClose }: { onClose: () => void }) {
  const [selectedCourse, setSelectedCourse] = useState('')
  const [selectedClass, setSelectedClass] = useState('')

  return (
    <ModalWrapper width="w-[396px] h-[410px]">
      <CloseButton onClick={onClose} className="top-[24px]" />
      <ModalHeader
        icon={<IoCheckmark size={16} />}
        title="내 과정 선택하기"
        description="해당하는 과정과 기수를 선택해 주세요."
        className="mt-[18px]"
      />
      <div className="w-full">

      <CourseSelect selected={selectedCourse} onChange={setSelectedCourse} />
      <ClassSelect selected={selectedClass} onChange={setSelectedClass} />
      </div>
      <Button className="bg-[#6201E0] text-white font-normal mt-6 cursor-pointer">등록 하기</Button>
    </ModalWrapper>
  )
}