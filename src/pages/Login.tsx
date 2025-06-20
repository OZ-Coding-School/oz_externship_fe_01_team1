import React, { useState, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom'; // ✅ 추가
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const isFormValid: boolean = email.trim() !== '' && password.trim() !== '';

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.logo}>oz. 오즈코딩스쿨</h1>

      <p className={styles.subText}>
        아직 회원이 아니신가요? <Link to="/join">회원가입 하기</Link>
      </p>

      <button className={styles.kakaoButton}>
        카카오 간편 로그인 / 가입
      </button>

      <input
        className={styles.input}
        type="email"
        placeholder="아이디 (example@gmail.com)"
        value={email}
        onChange={handleEmailChange}
      />

      <input
        className={styles.input}
        type="password"
        placeholder="비밀번호 (6~15자리 영문 대소문자, 숫자, 특수문자 포함)"
        value={password}
        onChange={handlePasswordChange}
      />

      <div className={styles.findLinks}>
        <a href="#">아이디 찾기</a> | <a href="#">비밀번호 찾기</a>
      </div>

      <button
        className={styles.loginButton}
        disabled={!isFormValid}
      >
        일반회원 로그인
      </button>

      <p className={styles.naverLink}>
        <a href="#">네이버 간편 로그인 / 가입</a>
      </p>
    </div>
  );
};

export default LoginPage;
