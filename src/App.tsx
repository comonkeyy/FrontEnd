import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home/Home';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import MyPage from './features/owner/MyPage';
import HouseRegisterForm from './pages/HouseRegisterForm';
import SignIn from './components/SignIn/SignIn';
import AdminPage from './pages/AdminPage/AdminPage';
import MatchRequestPage from './pages/MatchRequestPage/MatchRequestPage';
import MatchCompletePage from './pages/MatchCompletePage/MatchComplete';
import Review from './pages/ReviewPage/Review';

// 필요한 경우 WorkerMainPage 등 추가 import

// 복지사 메인 페이지 컴포넌트
const AppRouter: React.FC = () => {
  // 역할 관리
  const storedRole = localStorage.getItem('userRole') as
    | 'owner'
    | 'CW'
    | 'guest'
    | 'admin'
    | null;

  const [userRole, setUserRole] = useState<'owner' | 'CW' | 'guest' | 'admin'>(
    storedRole ?? 'guest',
  );
  const [isAdminSignInOpen, setIsAdminSignInOpen] = useState(false);

  // 로그인 핸들러
  const handleLogin = (role: 'owner' | 'CW' | 'admin') => {
    localStorage.setItem('userRole', role); // 로컬 스토리지 저장
    setUserRole(role);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    setUserRole('guest');
  };

  // 관리자 로그인 핸들러
  const handleAdminLogin = (user_id: string, password: string) => {
    fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, password }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem('userRole', 'admin');
          localStorage.setItem('adminToken', res.accessToken);
          localStorage.setItem('adminInfo', JSON.stringify(res.admin));
          setUserRole('admin');
          setIsAdminSignInOpen(false);
          window.location.href = '/admin';
        } else {
          alert('관리자 로그인 실패: ' + (res.message || '정보를 확인하세요.'));
        }
      });
  };

  // 역할에 따라 헤더/홈에 전달할 값
  const headerRole = userRole === 'admin' ? 'guest' : userRole;
  const homeRole = userRole === 'admin' ? 'guest' : userRole;

  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF5] flex flex-col">
        {/* 헤더 */}
        <Header
          userRole={headerRole}
          setUserRole={setUserRole}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        {/* 관리자 로그인 버튼 (게스트만 노출) */}
        {userRole === 'guest' && (
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
        )}
        {/* 로그인/회원가입 모달 */}
        <SignIn
          isOpen={isAdminSignInOpen}
          close={() => setIsAdminSignInOpen(false)}
          onAdminLogin={handleAdminLogin}
          adminMode
          onLogin={handleLogin}
        />

        {/* 라우팅 */}
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home userRole={homeRole} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/register-property" element={<HouseRegisterForm />} />
            <Route path="/owner/mypage" element={<MyPage />} />
            <Route path="/owner/waitinglist" element={<MyPage />} />
            <Route path="/owner/matchedlist" element={<MyPage />} />
            {/* WorkerMainPage가 필요하다면 import 후 아래 라우트 추가 */}
            {/* <Route path="/worker/main" element={<WorkerMainPage />} /> */}
            <Route path="/request" element={<MatchRequestPage />} />
            <Route path="/complete" element={<MatchCompletePage />} />
            <Route path="/review" element={<Review />} />
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
            {/* 404 Not Found 처리 */}
            <Route path="*" element={<Home userRole={homeRole} />} />
          </Routes>
        </div>
        {/* 푸터 */}
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter;
