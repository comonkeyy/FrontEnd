import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SignIn.css';

interface SignInProps {
  isOpen: boolean;
  close: () => void;
}

export default function SignIn({ isOpen, close }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 역할 상태 추가
  const [role, setRole] = useState<'owner' | 'worker'>('owner');

  const loginClickHandler = () => {
    fetch('http://10.58.2.17:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={close}>
      <div className="loginModal" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={close}>
          &times;
        </span>
        <div className="modalContents">
          <h2>로그인</h2>
          {/* 역할 선택 UI */}
          <div className="login-role-select">
            <button
              type="button"
              className={`role-btn ${role === 'owner' ? 'active' : ''}`}
              onClick={() => setRole('owner')}
            >
              집 소유자
            </button>
            <button
              type="button"
              className={`role-btn ${role === 'worker' ? 'active' : ''}`}
              onClick={() => setRole('worker')}
            >
              복지사
            </button>
          </div>
          <input
            name="email"
            className="loginId"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            name="password"
            className="loginPw"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginBtn" onClick={loginClickHandler}>
            로그인
          </button>
          <div className="loginEnd">
            <div className="loginLine">
              회원이 아니신가요?{' '}
              <Link to="/signup" className="signup-link" onClick={close}>
                회원가입
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
