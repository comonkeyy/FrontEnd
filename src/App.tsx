import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home/Home';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import MyPage from './pages/owner/MyPage';
import HouseRegisterForm from './pages/HouseRegisterForm';
import SignIn from './components/SignIn/SignIn';
import AdminPage from './pages/AdminPage/AdminPage';
import MatchRequestPage from './pages/MatchRequestPage/MatchRequestPage';
import MatchCompletePage from './pages/MatchCompletePage/MatchComplete';
import WorkerReview from './pages/WorkerReviewPage/WorkerReview';

// 복지사 메인 페이지 컴포넌트
const WorkerMainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-[#364C84] text-3xl font-bold">
      <p>환영합니다, 복지사님!</p>
      <p className="mt-4 text-xl">복지사 메인 페이지입니다.</p>
    </div>
  );
};

const AppRouter: React.FC = () => {
  // 로컬 스토리지에서 역할 읽기
  const storedRole = localStorage.getItem('userRole') as
    | 'owner'
    | 'worker'
    | 'guest'
    | 'admin'
    | null;

  const [userRole, setUserRole] = useState<
    'owner' | 'worker' | 'guest' | 'admin'
  >(storedRole ?? 'guest');

  const [isAdminSignInOpen, setIsAdminSignInOpen] = useState(false);

  // 로그인 핸들러
  const handleLogin = (role: 'owner' | 'worker' | 'admin') => {
    localStorage.setItem('userRole', role); // 로컬 스토리지 저장
    setUserRole(role);
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('currentUser');
    setUserRole('guest');
  };

  // 관리자 로그인
  const handleAdminLogin = (user_id: string, password: string) => {
    fetch('http://10.58.2.17:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, password, role: 'M' }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem('userRole', 'admin');
          setUserRole('admin');
          setIsAdminSignInOpen(false);
          window.location.href = '/admin';
        } else {
          alert('관리자 로그인 실패');
        }
      });
  };

  const headerRole = userRole === 'admin' ? 'guest' : userRole;
  const homeRole = userRole === 'admin' ? 'guest' : userRole;

  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF5]">
        {/* Header에 핸들러 전달 */}
        <Header
          userRole={headerRole}
          setUserRole={setUserRole}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        {/* 게스트일 때만 관리자 로그인 버튼 노출 */}
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
        <SignIn
          isOpen={isAdminSignInOpen}
          close={() => setIsAdminSignInOpen(false)}
          onAdminLogin={handleAdminLogin}
          adminMode
          onLogin={handleLogin} // 일반 로그인 핸들러 추가
        />

        <Routes>
          <Route path="/" element={<Home userRole={homeRole} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/register-property" element={<HouseRegisterForm />} />
          <Route path="/owner/mypage" element={<MyPage />} />
          <Route path="/owner/waitinglist" element={<MyPage />} />
          <Route path="/owner/matchedlist" element={<MyPage />} />
          <Route path="/worker/main" element={<WorkerMainPage />} />
          <Route path="/request" element={<MatchRequestPage />} />
          <Route path="/complete" element={<MatchCompletePage />} />
          <Route path="/review" element={<WorkerReview />} />
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
    </Router>
  );
};

export default AppRouter;
