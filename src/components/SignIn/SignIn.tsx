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

    // 관리자 모드는 기존 로직 유지
    if (adminMode && onAdminLogin) {
      onAdminLogin(email, password);
      close();
      return;
    }

    try {
      // 1. 백엔드 API 호출
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          ...(role === 'worker' ? { role: 'CW' } : {}),
        }),
      });

      // 2. 응답 상태 확인
      if (!response.ok) {
        const errorText = await response.text();
        console.error('서버 응답 오류:', response.status, errorText);
        alert(`로그인 실패: ${response.status} - ${errorText || '서버 오류'}`);
        return;
      }

      // 3. JSON 파싱 및 데이터 확인
      const result = await response.json();
      console.log('로그인 응답 데이터:', result); // 응답 데이터 로그 출력

      if (result.accessToken) {
        // 4. 토큰 및 유저 정보 저장
        localStorage.setItem('accessToken', result.accessToken);
        localStorage.setItem('refreshToken', result.refreshToken);
        localStorage.setItem('currentUser', JSON.stringify(result.user));

        // 5. 역할 처리
        const userRole = result.user.role === 'CW' ? 'worker' : 'owner';

        if (onLogin) onLogin(userRole);
        if (setUserRole) setUserRole(userRole);

        alert(`${userRole === 'owner' ? '집 소유주' : '복지사'} 로그인 성공!`);

        // 6. 페이지 이동
        if (userRole === 'owner') navigate('/owner/mypage');
        else if (userRole === 'worker') navigate('/worker/main');
        else navigate('/');

        close();
      } else {
        console.error('토큰 없음:', result);
        alert('토큰 정보가 없습니다. 서버 응답을 확인해주세요.');
      }
    } catch (error) {
      // 7. 네트워크 오류 처리
      console.error('로그인 처리 중 오류:', error);
      alert('로그인 중 네트워크 오류가 발생했습니다.');
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginClickHandler();
            }}
          >
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
              type="submit"
              style={{
                width: '100%',
                fontWeight: 600,
                fontSize: '1.1rem',
                marginBottom: 16,
              }}
            >
              로그인
            </button>
          </form>
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
