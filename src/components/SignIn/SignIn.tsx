import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css';

interface SignInProps {
  isOpen: boolean;
  close: () => void;
  onAdminLogin?: (email: string, password: string) => void;
  adminMode?: boolean;
  setUserRole?: (role: 'owner' | 'worker' | 'guest' | 'admin') => void;
  onLogin?: (role: 'owner' | 'worker' | 'admin') => void;
}

export default function SignIn({
  isOpen,
  close,
  onAdminLogin,
  adminMode,
  setUserRole,
  onLogin,
}: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'owner' | 'worker' | 'admin'>('owner');
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setRole('owner');
    }
  }, [isOpen]);

  const loginClickHandler = async () => {
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 관리자 모드
    if (adminMode && onAdminLogin) {
      onAdminLogin(email, password);
      close();
      return;
    }

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(
        (user: any) => user.email === email && user.password === password,
      );

      if (foundUser) {
        const userRole = foundUser.role || 'owner';
        alert(`${userRole === 'owner' ? '집 소유주' : '복지사'} 로그인 성공!`);

        // 로그인 성공 처리
        if (onLogin) {
          onLogin(userRole);
        }

        // 로그인 상태 저장
        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        // 역할에 따라 분기해서 이동
        if (userRole === 'owner') {
          navigate('/owner/mypage');
        } else if (userRole === 'worker') {
          navigate('/worker/main');
        } else {
          navigate('/');
        }

        close();
      } else {
        alert('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } catch (error) {
      console.error('로그인 처리 중 오류:', error);
      alert('로그인 중 알 수 없는 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={close}>
      <div className="loginModal" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={close}>
          &times;
        </span>
        <div className="modalContents">
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textAlign: 'center',
            }}
          >
            {adminMode ? '관리자 로그인' : '로그인'}
          </h2>
          {/* 역할 선택 UI */}
          <div
            className="login-role-select"
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '1rem',
            }}
          >
            {!adminMode && (
              <>
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
              </>
            )}
            {adminMode && (
              <button
                type="button"
                className={`role-btn active`}
                disabled
                style={{ minWidth: 120 }}
              >
                관리자
              </button>
            )}
          </div>
          <input
            name="email"
            className="loginId"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 12 }}
          />
          <input
            name="password"
            className="loginPw"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', marginBottom: 20 }}
          />
          <button
            className="loginBtn"
            onClick={loginClickHandler}
            style={{
              width: '100%',
              fontWeight: 600,
              fontSize: '1.1rem',
              marginBottom: 16,
            }}
          >
            로그인
          </button>
          {!adminMode && (
            <div className="loginEnd">
              <div className="loginLine">
                회원이 아니신가요?{' '}
                <Link to="/signup" className="signup-link" onClick={close}>
                  회원가입
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
