import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// 컴포넌트 임포트
import AdminPage from '../pages/AdminPage/AdminPage';
import Home from '../pages/Home/Home';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignIn from './components/SignIn/SignIn';
import MyPage from '../pages/owner/MyPage';
import HouseRegisterForm from '../pages/HouseRegisterForm';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

// 복지사 메인 페이지 컴포넌트
const WorkerMainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-[#364C84] text-3xl font-bold">
      <p>환영합니다, 복지사님!</p>
      <p className="mt-4 text-xl">복지사 메인 페이지입니다.</p>
    </div>
  );
};

// 내부 라우터 컴포넌트 (Router 내부에서 사용)
const AppContent: React.FC = () => {
  // 로컬 스토리지에서 저장된 사용자 역할을 불러옵니다.
  const storedRole = localStorage.getItem('userRole') as
    | 'owner'
    | 'worker'
    | 'guest'
    | 'admin'
    | null;

  // userRole 상태를 정의하고 초기값을 설정합니다.
  const [userRole, setUserRole] = useState<
    'owner' | 'worker' | 'guest' | 'admin'
  >(storedRole ?? 'guest');

  // 관리자 로그인 모달의 열림/닫힘 상태를 관리합니다.
  const [isAdminSignInOpen, setIsAdminSignInOpen] = useState(false);

  // 로그인 핸들러 (일반 사용자 로그인)
  const handleLogin = (role: 'owner' | 'worker' | 'admin') => {
    localStorage.setItem('userRole', role);
    setUserRole(role);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    setUserRole('guest');
    // 홈으로 이동
    window.location.href = '/';
  };

  // 관리자 로그인 처리를 위한 함수
  const handleAdminLogin = (email: string, password: string) => {
    fetch('http://10.58.2.17:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'admin' }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem('userRole', 'admin');
          setUserRole('admin');
          setIsAdminSignInOpen(false);
          window.location.href = '/admin';
        } else {
          alert('관리자 로그인 실패: ' + (res.message || '알 수 없는 오류'));
        }
      })
      .catch((error) => {
        console.error('관리자 로그인 네트워크 오류:', error);
        alert('관리자 로그인 중 네트워크 오류가 발생했습니다.');
      });
  };

  // Header에 전달할 userRole 값
  const headerRole = userRole === 'admin' ? 'guest' : userRole;
  const homeRole = userRole === 'admin' ? 'guest' : userRole;

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* Header에 모든 필요한 props 전달 */}
      <Header
        userRole={headerRole}
        setUserRole={setUserRole}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <button
        onClick={() => setIsAdminSignInOpen(true)}
        style={{
          position: 'fixed',
          left: 24,
          bottom: 24,
          zIndex: 1000,
          background: '#364C84',
          color: 'white',
          padding: '7px 16px',
          borderRadius: '6px',
          fontWeight: 500,
          fontSize: '0.95rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          border: 'none',
          cursor: 'pointer',
          minWidth: 90,
          minHeight: 36,
        }}
      >
        관리자 로그인
      </button>

      {/* SignIn 컴포넌트에 로그인 핸들러 전달 */}
      <SignIn
        isOpen={isAdminSignInOpen}
        close={() => setIsAdminSignInOpen(false)}
        onAdminLogin={handleAdminLogin}
        onLogin={handleLogin}
        adminMode={true}
      />

      <Routes>
        <Route path="/" element={<Home userRole={homeRole} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/register-property" element={<HouseRegisterForm />} />
        <Route path="/owner/mypage" element={<MyPage />} />
        <Route path="/owner/watinglist" element={<MyPage />} />
        <Route path="/owner/matchedlist" element={<MyPage />} />
        <Route path="/worker/main" element={<WorkerMainPage />} />
        <Route
          path="/admin"
          element={
            userRole === 'admin' ? (
              <AdminPage />
            ) : (
              <Home userRole={homeRole} />
            )
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default function AppRouter() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
