import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';

// 컴포넌트 임포트
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';
import Home from '../pages/Home/Home';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import MyPage from '../pages/owner/MyPage';
import HouseRegisterForm from '../pages/HouseRegisterForm';
import SignIn from '../components/SignIn/SignIn';
import AdminPage from '../pages/AdminPage/AdminPage';

// 복지사 메인 페이지 (더미)
const WorkerMainPage: React.FC = () => (
  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-[#364C84] text-3xl font-bold">
    <p>환영합니다, 복지사님!</p>
    <p className="mt-4 text-xl">복지사 메인 페이지입니다.</p>
  </div>
);

// useNavigate 훅은 Router 내부 컴포넌트에서만 사용 가능하므로
// 별도 컴포넌트로 분리
const AppRouterInner: React.FC = () => {
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
  const navigate = useNavigate();

  // 로그인 핸들러
  const handleLogin = (role: 'owner' | 'worker' | 'admin') => {
    localStorage.setItem('userRole', role);
    setUserRole(role);
    if (role === 'owner') {
      navigate('/owner/mypage');
    } else if (role === 'worker') {
      navigate('/worker/main');
    } else {
      navigate('/');
    }
  };

  // 로그아웃 핸들러
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken');
    setUserRole('guest');
    navigate('/');
  };

  // 관리자 로그인 핸들러
  const handleAdminLogin = async (email: string, password: string) => {
    const dummyAdmin = {
      email: 'admin@example.com',
      password: 'admin123',
    };
    try {
      if (email === dummyAdmin.email && password === dummyAdmin.password) {
        alert('관리자 더미 로그인 성공!');
        localStorage.setItem('userRole', 'admin');
        setUserRole('admin');
        setIsAdminSignInOpen(false);
        navigate('/admin');
        return;
      }
      // 실제 백엔드 로그인
      const response = await fetch('http://10.58.2.17:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        alert('관리자 백엔드 로그인 성공!');
        localStorage.setItem('userRole', 'admin');
        setUserRole('admin');
        setIsAdminSignInOpen(false);
        navigate('/admin');
      } else {
        alert(
          '관리자 로그인 실패: ' +
            (result.message || '아이디 또는 비밀번호를 확인해주세요.'),
        );
      }
    } catch (error) {
      console.error('관리자 로그인 처리 중 오류:', error);
      alert('관리자 로그인 중 네트워크 오류가 발생했습니다.');
    }
  };

  const headerRole = userRole === 'admin' ? 'guest' : userRole;
  const homeRole = userRole === 'admin' ? 'guest' : userRole;

  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      <Header
        userRole={headerRole}
        setUserRole={setUserRole}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

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
        adminMode={true}
      />

      <Routes>
        <Route path="/" element={<Home userRole={homeRole} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/register-property" element={<HouseRegisterForm />} />
        <Route path="/owner/mypage" element={<MyPage />} />
        <Route path="/owner/waitinglist" element={<MyPage />} />
        <Route path="/owner/matchedlist" element={<MyPage />} />
        <Route path="/worker/main" element={<WorkerMainPage />} />
        <Route
          path="/admin"
          element={
            userRole === 'admin' ? <AdminPage /> : <Home userRole={homeRole} />
          }
        />
        {/* 기타 라우트들 */}
        <Route path="/worker/mypage" element={<WorkerMainPage />} />
        <Route path="/request" element={<WorkerMainPage />} />
        <Route path="/complete" element={<WorkerMainPage />} />
        <Route path="/review" element={<WorkerMainPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

// Router로 감싸기
const AppRouter: React.FC = () => (
  <Router>
    <AppRouterInner />
  </Router>
);

export default AppRouter;
