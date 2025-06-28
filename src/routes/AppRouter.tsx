import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom'; // useNavigate 임포트

// 컴포넌트 임포트
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Home from '@/pages/Home/Home';
import SignUpPage from '@/pages/SignUpPage/SignUpPage';
import MyPage from '@/pages/owner/MyPage';
import HouseRegisterForm from '@/pages/HouseRegisterForm';
import SignIn from '@/components/SignIn/SignIn'; // SignIn 컴포넌트 경로 확인
import AdminPage from '@/pages/AdminPage/AdminPage';
import WorkerRequestPage from '@/pages/WorkerRequestPage/WorkerRequestPage'; // 새로 만든 페이지 임포트

// 복지사 메인 페이지 컴포넌트 (더미, 실제 구현 필요)
const WorkerMainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-[#364C84] text-3xl font-bold">
      <p>환영합니다, 복지사님!</p>
      <p className="mt-4 text-xl">복지사 메인 페이지입니다.</p>
    </div>
  );
};

// ** 이 파일의 유일한 AppRouter 컴포넌트 정의 **
// 모든 상태, 핸들러, 라우팅 로직을 이 컴포넌트 안에 포함합니다.
const AppRouter: React.FC = () => {
  // 이제 이 AppRouter가 파일의 유일한 메인 컴포넌트입니다.
  // 로컬 스토리지에서 역할 읽기
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

  // useNavigate 훅 사용 (컴포넌트 내부에 선언)
  const navigate = useNavigate();

  // 로그인 핸들러 (SignIn 컴포넌트에서 호출될 일반 사용자 로그인 로직)
  const handleLogin = (
    role: 'owner' | 'worker' | 'admin' | 'USER' | 'OWNER',
  ) => {
    // 백엔드에서 오는 다양한 역할 값을 프론트엔드 역할로 변환
    let normalizedRole: 'owner' | 'worker' | 'admin' = 'worker'; // 기본값 설정

    const upperCaseRole = typeof role === 'string' ? role.toUpperCase() : '';

    if (upperCaseRole === 'OWNER' || upperCaseRole === 'OWNER') {
      normalizedRole = 'owner';
    } else if (upperCaseRole === 'WORKER' || upperCaseRole === 'USER') {
      // 'USER'를 'worker'로 취급
      normalizedRole = 'worker';
    } else if (upperCaseRole === 'ADMIN') {
      normalizedRole = 'admin';
    }

    localStorage.setItem('userRole', normalizedRole); // 변환된 역할 저장
    setUserRole(normalizedRole); // 변환된 역할로 상태 업데이트

    if (normalizedRole === 'owner') {
      navigate('/');
    } else if (normalizedRole === 'worker') {
      navigate('/'); // '/worker/main'에서 '/'로 변경
    } else {
      navigate('/');
    }
  };

  // 로그아웃 핸들러 (Header 컴포넌트에서 호출)
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken'); // 토큰도 함께 제거 (필요시)
    setUserRole('guest');
    navigate('/'); // 로그아웃 후 홈으로 리디렉션
  };

  // 관리자 로그인 핸들러 (SignIn 컴포넌트에서 호출)
  const handleAdminLogin = async (user_id: string, password: string) => {
    // async 함수로 변경
    // 더미 관리자 계정 정보
    const dummyAdmin = {
      user_id: 'admin@example.com',
      password: 'admin123',
    };

    try {
      // 1. 더미 데이터로 먼저 검증 (네트워크 요청 없이 빠르게 테스트)
      if (user_id === dummyAdmin.user_id && password === dummyAdmin.password) {
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
        body: JSON.stringify({ user_id, password, role: 'M' }), // 백엔드 역할이 'admin'인지 'M'인지 정확히 확인하고 일치시키세요!
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
    <Router>
      {' '}
      {/* 최상위 라우터는 여기서 한 번만 감쌉니다. */}
      <div className="min-h-screen bg-[#FFFDF5]">
        {/* Header에 핸들러 전달 */}
        <Header
          userRole={headerRole}
          setUserRole={setUserRole}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />

        {/* 관리자 로그인 버튼 (userRole이 guest일 때만 노출) */}
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

        {/* SignIn 모달 컴포넌트 (관리자 로그인용) */}
        <SignIn
          isOpen={isAdminSignInOpen}
          close={() => setIsAdminSignInOpen(false)}
          onAdminLogin={handleAdminLogin} // 관리자 로그인 처리 함수 전달
          adminMode={true} // 이 모달은 항상 관리자 모드
          // 참고: 관리자용 SignIn 모달에서는 일반 로그인 관련 props (onLogin, setUserRole)는 사용되지 않으므로,
          // 명시적으로 전달하지 않거나 빈 함수를 전달하여 혼란을 피할 수 있습니다.
          onLogin={handleLogin} // AppRouter의 handleLogin을 전달 (필요 없다면 제거)
          setUserRole={setUserRole} // AppRouter의 setUserRole을 전달 (필요 없다면 제거)
        />

        <Routes>
          {/* --- 공용 라우트 --- */}
          <Route path="/" element={<Home userRole={homeRole} />} />
          <Route path="/signup" element={<SignUpPage onLogin={handleLogin} />} />

          {/* --- 빈집 소유자(owner) 전용 라우트 --- */}
          {userRole === 'owner' && (
            <>
              <Route path="/owner/mypage" element={<MyPage />} />
              <Route path="/owner/waitinglist" element={<MyPage />} />
              <Route path="/owner/matchedlist" element={<MyPage />} />
              <Route path="/register-property" element={<HouseRegisterForm />} />
            </>
          )}

          {/* --- 복지사(worker) 전용 라우트 --- */}
          {userRole === 'CW' && ( // 'worker' 대신 'CW'를 사용해야 할 수 있습니다. SignIn 로직 확인 필요
            <>
              <Route path="/worker/mypage" element={<WorkerMainPage />} />
              <Route path="/request" element={<WorkerRequestPage />} />
              <Route path="/complete" element={<WorkerMainPage />} />
              <Route path="/review" element={<WorkerMainPage />} />
            </>
          )}

          {/* --- 관리자(admin) 전용 라우트 --- */}
          {userRole === 'admin' && (
            <Route path="/admin" element={<AdminPage />} />
          )}
          
          {/* 일치하는 라우트가 없을 경우 홈으로 리디렉션 */}
          <Route path="*" element={<Home userRole={homeRole} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default AppRouter; // 이제 이 파일에서 export 되는 AppRouter는 유일한 라우터 컴포넌트입니다.
