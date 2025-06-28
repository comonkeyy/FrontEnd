import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'; // useNavigate 임포트

// 컴포넌트 임포트
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home/Home';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import MyPage from './pages/owner/MyPage';
import HouseRegisterForm from './pages/HouseRegisterForm';
import SignIn from './components/SignIn/SignIn'; // SignIn 컴포넌트 경로 확인
import AdminPage from './pages/AdminPage/AdminPage';

// 복지사 메인 페이지 컴포넌트 (더미, 실제 구현 필요)
const WorkerMainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-[#364C84] text-3xl font-bold">
      <p>환영합니다, 복지사님!</p>
      <p className="mt-4 text-xl">복지사 메인 페이지입니다.</p>
    </div>
  );
};

const AppRouter: React.FC = () => {
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

  // useNavigate 훅 사용 (컴포넌트 내부에 선언)
  const navigate = useNavigate();

  // 일반 사용자 로그인 핸들러 (SignIn 컴포넌트에서 호출)
  const handleLogin = (role: 'owner' | 'worker' | 'admin') => {
    localStorage.setItem('userRole', role);
    setUserRole(role);
    // 로그인 성공 후 역할에 따라 페이지 이동 (SignIn 내부에서 navigate 해도 됨)
    if (role === 'owner') {
      navigate('/owner/mypage');
    } else if (role === 'worker') {
      navigate('/worker/main');
    } else {
      // admin 역할로 일반 로그인하는 경우는 없어야 하지만, 혹시 모를 경우 대비
      navigate('/');
    }
  };

  // 로그아웃 핸들러 (Header 컴포넌트에서 호출)
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken'); // 인증 토큰도 함께 제거 (필요시)
    setUserRole('guest');
    navigate('/'); // 로그아웃 후 홈으로 리디렉션
  };

  // 관리자 로그인 핸들러 (SignIn 컴포넌트에서 호출)
  const handleAdminLogin = async (email: string, password: string) => {
    // async 함수로 변경
    // 더미 관리자 계정 정보
    const dummyAdmin = {
      email: 'admin@example.com',
      password: 'admin123',
    };

    try {
      // 1. 더미 데이터로 먼저 검증 (네트워크 요청 없이 빠르게 테스트)
      if (email === dummyAdmin.email && password === dummyAdmin.password) {
        alert('관리자 더미 로그인 성공!');
        localStorage.setItem('userRole', 'admin');
        setUserRole('admin');
        setIsAdminSignInOpen(false);
        navigate('/admin'); // navigate 사용
        return; // 더미 로그인 성공 시 여기서 함수 종료
      }

      // 2. 더미 데이터에 실패하면 실제 백엔드 API 호출
      const response = await fetch('http://10.58.2.17:8000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'admin' }), // 백엔드 역할이 'admin'인지 'M'인지 정확히 확인하고 일치시키세요!
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // HTTP 상태 코드 2xx 확인 및 백엔드 success 플래그 확인
        alert('관리자 백엔드 로그인 성공!');
        localStorage.setItem('userRole', 'admin');
        setUserRole('admin');
        setIsAdminSignInOpen(false);
        navigate('/admin'); // navigate 사용
      } else {
        // 백엔드에서 실패 메시지가 있다면 그것을 사용, 없다면 일반 메시지
        alert(
          '관리자 로그인 실패: ' +
            (result.message || '아이디 또는 비밀번호를 확인해주세요.'),
        );
      }
    } catch (error) {
      // 네트워크 오류 또는 JSON 파싱 오류 등 발생 시
      console.error('관리자 로그인 처리 중 오류:', error);
      alert('관리자 로그인 중 네트워크 오류가 발생했습니다.');
    }
  };

  const headerRole = userRole === 'admin' ? 'guest' : userRole;
  const homeRole = userRole === 'admin' ? 'guest' : userRole;

  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF5]">
        {/* Header에 핸들러 전달 */}
        <Header
          userRole={headerRole} // Header에서 admin을 guest처럼 보이게 하려면 이대로
          setUserRole={setUserRole} // Header 내 LogInButton에 전달될 경우 필요
          onLogin={handleLogin} // Header 내 LogInButton에 전달
          onLogout={handleLogout} // Header 내 로그아웃 버튼에 사용
        />

        {/* 관리자 로그인 버튼 (userRole이 guest일 때만 노출) */}
        {userRole === 'guest' && ( // 이 조건이 스크린샷과 맞는지 다시 확인하세요.
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

        {/* SignIn 모달 컴포넌트 (관리자 로그인용) */}
        {/* adminMode={true}로 고정하여 이 모달은 관리자 로그인 전용으로 만듭니다. */}
        <SignIn
          isOpen={isAdminSignInOpen}
          close={() => setIsAdminSignInOpen(false)}
          onAdminLogin={handleAdminLogin} // 관리자 로그인 처리 함수 전달
          adminMode={true} // 이 모달은 항상 관리자 모드
          // 일반 로그인 관련 props는 여기서는 굳이 전달하지 않아도 됩니다.
          // onLogin={handleLogin} // 주석 처리하거나 필요에 따라 빈 함수를 전달
          // setUserRole={setUserRole} // 주석 처리하거나 필요에 따라 빈 함수를 전달
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
              userRole === 'admin' ? (
                <AdminPage />
              ) : (
                <Home userRole={homeRole} /> // 관리자가 아니면 Home으로 리디렉션
              )
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
    </Router>
  );
};

export default AppRouter;
