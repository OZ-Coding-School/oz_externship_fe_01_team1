// FindIdModal 관련 컴포넌트들을 하나의 entry 파일(index.tsx)로 묶어 export
// import 경로를 줄이기 위해 index.tsx에서 모듈을 재수출 (barrel 패턴)
// 사용자는 @components/modals/FindIdModal 경로로 접근 시 개별 파일명을 신경 쓰지 않고 필요한 컴포넌트를 바로 import 가능
// 예: import { FindIdModal, FindIdForm } from '@components/modals/FindIdModal'

// 각 컴포넌트는 해당 폴더 내에 위치한 파일에서 default export 되어야 정상 작동함

export { default as FindIdModal } from './FindIdModal';
export { default as FindIdForm } from './FindIdForm';
export { default as FindIdSuccess } from './FindIdSuccess';
