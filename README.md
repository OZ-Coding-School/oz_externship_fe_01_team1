## 📌 프로젝트 개요
사용자가 회원가입하고 로그인 그리고 커뮤니티 게시판을 사용할 수 있게 구현한 프로젝트입니다.  
디자인은 제공된 Figma 시안을 기반으로 TailwindCSS를 활용하여 개발하였으며, 
모듈별로 컴포넌트를 분리해 재사용성을 높였습니다.


## 🖥 기술 스택
<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=black">
<img src="https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=TailwindCSS&logoColor=black"> <img src="https://img.shields.io/badge/TVite-646CFF?style=for-the-badge&logo=Vite&logoColor=black">

## ✅ 구현 기능

### 🧩 공통 컴포넌트
- `Input`, `Button`, `CloseButton` 등 UI 구성 요소 분리

### 🔐 로그인
- 이메일 / 비밀번호 입력
- ID/PW 찾기 및 모달 팝업 UI
- 로컬스토리지 기반 로그인 상태 유지 (임시 구현)

### 📝 회원가입
- 닉네임 유효성 검사 및 중복확인 버튼
- 이메일 인증 (인증번호 발송/입력 + 타이머)
- 휴대폰 인증 (UI 구현 및 타이머)
- 비밀번호 유효성 검사 및 확인
- 전체 입력 완료 시 `가입하기` 버튼 활성화

## 🎬 미리보기
![로그인](https://github.com/user-attachments/assets/e15f2380-3329-4737-961a-16123af4239c)
![아이디찾기-모달](https://github.com/user-attachments/assets/a90f192c-6b10-43f4-aad4-28b14e27377c)
![비밀번호찾기-모달](https://github.com/user-attachments/assets/65a6d986-e4ab-4fce-af08-b9b727577087)
![수강생-모달](https://github.com/user-attachments/assets/03ed705c-7133-4434-9c1f-b88a80f55b0d)
![회원탈퇴-모달](https://github.com/user-attachments/assets/1fa261b1-d8a3-4e5b-9103-043847c07b31)
![비밀번호변경-페이지](https://github.com/user-attachments/assets/4675bb0b-7019-4170-8a11-f0b02a9a3cf9)

