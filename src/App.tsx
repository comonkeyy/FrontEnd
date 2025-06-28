import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home/Home';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import MyPage from './pages/owner/MyPage';
import HouseRegisterForm from './pages/HouseRegisterForm';
import MatchRequestPage from './pages/MatchRequestPage/MatchRequestPage';
import ReviewPage from './pages/ReviewPage/Review';
import SignIn from './components/SignIn/SignIn';
import AdminPage from './pages/AdminPage/AdminPage';
import MatchCompletePage from './pages/MatchCompletePage/MatchComplete';

const AppRouter: React.FC = () => {
  // 실제로는 로그인 후 userRole을 받아와야 합니다.
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

  const handleAdminLogin = (email: string, password: string) => {
    // 실제로는 백엔드에 role: 'M'으로 요청해야 함
    fetch('http://10.58.2.17:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'M' }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem('userRole', 'admin'); // 로컬 스토리지 저장
          setUserRole('admin');
          setIsAdminSignInOpen(false);
          window.location.href = '/admin';
        } else {
          alert('관리자 로그인 실패');
        }
      });
  };

  // userRole이 admin일 때만 admin 전달, 아니면 guest로 다운캐스팅
  const headerRole = userRole === 'admin' ? 'guest' : userRole;
  const homeRole = userRole === 'admin' ? 'guest' : userRole;

  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF5]">
        <Header userRole={headerRole} setUserRole={setUserRole} />

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
        <SignIn
          isOpen={isAdminSignInOpen}
          close={() => setIsAdminSignInOpen(false)}
          onAdminLogin={handleAdminLogin}
          adminMode
        />
        <Routes>
          <Route path="/" element={<Home userRole={homeRole} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/register-property" element={<HouseRegisterForm />} />
          <Route path="/owner/mypage" element={<MyPage />} />
          <Route path="/owner/watinglist" element={<MyPage />} />
          <Route path="/owner/matchedlist" element={<MyPage />} />
          <Route path="/request" element={<MatchRequestPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/complete" element={<MatchCompletePage />} />
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

const App: React.FC = () => {
  return <AppRouter />;
};

export default App;
