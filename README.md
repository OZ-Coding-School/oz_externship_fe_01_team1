## 📌 프로젝트 개요
사용자가 회원가입하고 로그인 그리고 커뮤니티 게시판을 사용할 수 있게 구현한 프로젝트입니다.  
디자인은 제공된 Figma 시안을 기반으로 TailwindCSS를 활용하여 개발하였으며, 
모듈별로 컴포넌트를 분리해 재사용성을 높였습니다.

<br/>

## 🔗 배포 링크

- [오즈 커뮤니티 웹사이트 배포주소](https://ozcommunity.p-e.kr)

<br/>

## 📅 프로젝트 기간
2025.06.19(목) ~ 2025.07.16(수)  
- 총 일수: 28일  
- 워킹데이: 20일 (주말/공휴일 제외)

<br/>

## 🙌 팀원 
<table>
  <thead>
    <tr>
      <th>이름</th>
      <th>역할</th>      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/yongarframe">최용훈</a><br/> 
        <img src="https://github.com/yongarframe.png" width="80" alt="최용훈"/>       
      </td>
      <td align="center">커뮤니티 상세 페이지</td>      
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Lee-sung-il">이성일</a><br/> 
        <img src="https://github.com/Lee-sung-il.png" width="80" alt="이성일"/>       
      </td>
      <td align="center">글작성/수정 페이지</td>      
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/93choi">최진희</a><br/> 
        <img src="https://github.com/93choi.png" width="80" alt="최진희"/>       
      </td>
      <td>유저기능, 로그인/로그아웃</td>      
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/Js00223">허준서</a><br/> 
        <img src="https://github.com/Js00223.png" width="80" alt="허준서"/>       
      </td>
      <td align="center">커뮤니티 목록 페이지</td>      
    </tr>
  </tbody>
</table>


<br/>

## 🖥 기술 스택

### 🚀 프론트엔드

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)


### 🎨 스타일링

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)


### 📦 주요 라이브러리

![md-editor](https://img.shields.io/badge/md--editor-2C5282?style=for-the-badge)
![clsx](https://img.shields.io/badge/clsx-DB7093?style=for-the-badge)
![tailwind-merge](https://img.shields.io/badge/tailwind--merge-38B2AC?style=for-the-badge)


### ☁️ 배포 환경

![AWS S3](https://img.shields.io/badge/AWS%20S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white)
![CloudFront](https://img.shields.io/badge/CloudFront-D05C4B?style=for-the-badge&logo=amazonaws&logoColor=white)



<br/>

## ✅ 구현 기능

### 🧩 공통 컴포넌트

- `Input`, `Button`, `CloseButton`, `Modal` 등 **UI 구성 요소를 재사용 가능한 컴포넌트로 분리**
- 유지보수성과 일관성을 고려한 컴포넌트 구조 설계



### 🔐 로그인 기능

- 이메일 / 비밀번호 입력 및 로그인 요청 처리
- **ID/PW 찾기 모달 UI** 구현
- **로컬스토리지 기반 로그인 상태 유지** (임시 구현)



### 📝 회원가입 기능

- 닉네임 유효성 검사 및 **중복 확인 기능**
- 이메일 인증: 인증번호 발송 / 입력, **타이머 기능 포함**
- 휴대폰 인증: UI 구현 및 타이머 표시
- 비밀번호 유효성 검사 및 **비밀번호 확인 일치 검사**
- 모든 항목 유효성 통과 시 `가입하기` 버튼 활성화



### 🗂 커뮤니티 목록 페이지

- 커뮤니티 **게시글 리스트 조회**
- 게시글 정렬 옵션 제공
- **10개씩 페이지네이션** 구현



### ✍️ 게시글 작성/수정 기능

- **게시글 작성 및 수정 페이지** 구현
- 본문 영역을 **2단 구조**로 구성  
  (좌측: 마크다운 에디터 / 우측: 실시간 미리보기)



### 📄 커뮤니티 상세 페이지

- 목록 클릭 시 상세 페이지로 이동 및 렌더링
- **마크다운 형식**으로 본문 렌더링
- 댓글은 **10개씩 무한 스크롤 로딩**
- 게시글 작성자는 **수정/삭제 버튼 노출 및 처리 가능**

## 🎬 미리보기

<br/>

### 🔐 인증 관련

**로그인 화면**  
![로그인](https://github.com/user-attachments/assets/e15f2380-3329-4737-961a-16123af4239c)

**아이디 찾기 모달**  
![아이디찾기-모달](https://github.com/user-attachments/assets/a90f192c-6b10-43f4-aad4-28b14e27377c)

**비밀번호 찾기 모달**  
![비밀번호찾기-모달](https://github.com/user-attachments/assets/65a6d986-e4ab-4fce-af08-b9b727577087)

**비밀번호 변경 페이지**  
![비밀번호변경-페이지](https://github.com/user-attachments/assets/4675bb0b-7019-4170-8a11-f0b02a9a3cf9)

**회원 탈퇴 모달**  
![회원탈퇴-모달](https://github.com/user-attachments/assets/1fa261b1-d8a3-4e5b-9103-043847c07b31)

---

### 🧑‍🏫 수강생 관리

**수강생 정보 모달**  
![수강생-모달](https://github.com/user-attachments/assets/03ed705c-7133-4434-9c1f-b88a80f55b0d)

---

### 📄 게시글 및 댓글

**리스트 페이지 (페이지네이션)**  
![리스트페이지-페이지네이션](https://github.com/user-attachments/assets/fd9b8c77-ebc9-4b0d-bbfe-064ce539ccb7)

**마크다운 에디터**  
![마크다운에디터](https://github.com/user-attachments/assets/8527ca7c-103b-4151-a2d2-2e151477c84d)

**멘션 사용자 검색**  
![멘션-유저-검색](https://github.com/user-attachments/assets/095cdfbe-8f34-4dbd-ac2c-957216c7be9f)

**댓글 스크롤 무한 렌더링**  
![댓글-스크롤-무한렌더링](https://github.com/user-attachments/assets/af1c8417-ee45-4dc4-b43f-e49e5b45a10e)

