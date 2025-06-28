import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './SignIn.css'; // 이 파일은 제공되지 않았으므로 스타일 관련 문제는 발생할 수 있습니다.

interface SignInProps {
  isOpen: boolean;
  close: () => void;
  onAdminLogin?: (email: string, password: string) => void;
  adminMode?: boolean;
  // AppRouter에서 userRole 상태를 업데이트하기 위한 함수를 추가합니다.
  setUserRole?: (role: 'owner' | 'worker' | 'guest' | 'admin') => void;
}

export default function SignIn({
  isOpen,
  close,
  onAdminLogin,
  adminMode,
  setUserRole, // 새로 추가된 prop
}: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // 역할 상태 추가
  const [role, setRole] = useState<'owner' | 'worker' | 'admin'>('owner');

  // 모달이 열릴 때마다 초기화 (선택 사항)
  React.useEffect(() => {
    if (isOpen) {
      setEmail('');
      setPassword('');
      setRole('owner'); // 기본 역할 설정
    }
  }, [isOpen]);

  const loginClickHandler = async () => {
    // 폼 유효성 검사 (간단하게)
    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    // 관리자 모드일 경우 기존 onAdminLogin 호출
    if (adminMode && onAdminLogin) {
      onAdminLogin(email, password); // 이 함수는 AppRouter에서 전달받은 실제 백엔드 호출 로직을 가질 수 있습니다.
      close(); // 관리자 로그인 처리 후 모달 닫기
      return;
    }

    // --- 일반 사용자 로그인 (더미 데이터 사용) ---
    try {
      // localStorage에서 회원 정보 가져오기
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      // 이메일과 비밀번호가 일치하는 회원 찾기
      const foundUser = users.find(
        (user: any) => user.email === email && user.password === password,
      );

      if (foundUser) {
        // 로그인 성공 처리
        const userRole = foundUser.role || 'owner';
        alert(`${userRole === 'owner' ? '집 소유주' : '복지사'} 로그인 성공!`);

        // 로그인 상태 저장
        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        // 상태 업데이트
        if (setUserRole) {
          setUserRole(userRole);
        }

        Navigate('/');

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
                  // 이메일이 worker@test.com 일 때만 복지사 선택 버튼 활성화 (선택 사항)
                  // disabled={email !== 'worker@test.com' && email !== ''}
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
