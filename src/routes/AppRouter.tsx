import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 컴포넌트 임포트
import AdminPage from '../pages/AdminPage/AdminPage';
import Home from '../pages/Home/Home';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import SignIn from './components/SignIn/SignIn'; // SignIn 컴포넌트의 실제 경로로 수정해주세요
import MyPage from '../pages/owner/MyPage';
import HouseRegisterForm from '../pages/HouseRegisterForm';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

// 복지사 메인 페이지 컴포넌트 (더미, 실제 구현 필요)
const WorkerMainPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-160px)] text-[#364C84] text-3xl font-bold">
      <p>환영합니다, 복지사님!</p>
      <p className="mt-4 text-xl">복지사 메인 페이지입니다.</p>
      {/* 여기에 복지사 관련 기능 컴포넌트들을 추가하세요 */}
    </div>
  );
};

export default function AppRouter() {
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

  // 관리자 로그인 처리를 위한 함수 (실제 백엔드 API 호출)
  const handleAdminLogin = (email: string, password: string) => {
    // 실제 백엔드 API 엔드포인트와 'M' 역할 매핑 확인 필요
    fetch('http://10.58.2.17:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, role: 'admin' }), // 'M' 대신 'admin'으로 명확히
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          localStorage.setItem('userRole', 'admin'); // 로컬 스토리지에 관리자 역할 저장
          setUserRole('admin'); // 상태 업데이트
          setIsAdminSignInOpen(false); // 모달 닫기
          window.location.href = '/admin'; // 관리자 페이지로 리디렉션
        } else {
          alert('관리자 로그인 실패: ' + (res.message || '알 수 없는 오류'));
        }
      })
      .catch((error) => {
        console.error('관리자 로그인 네트워크 오류:', error);
        alert('관리자 로그인 중 네트워크 오류가 발생했습니다.');
      });
  };

  // Header 컴포넌트에 전달할 userRole 값 (관리자가 아닌 경우 guest로 처리)
  // 이는 특정 컴포넌트에서만 'admin' 역할을 guest처럼 보이게 하려는 의도일 수 있습니다.
  const headerRole = userRole === 'admin' ? 'guest' : userRole;
  const homeRole = userRole === 'admin' ? 'guest' : userRole; // Home 컴포넌트도 마찬가지

  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF5]">
        {/* Header 컴포넌트에 userRole과 setUserRole을 전달하여 로그인 상태를 관리하게 합니다. */}
        <Header userRole={headerRole} setUserRole={setUserRole} />

        {/* 관리자 로그인 버튼: 이 버튼을 클릭하면 관리자 로그인 모달이 열립니다. */}
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

        {/* SignIn 컴포넌트를 렌더링합니다.
            - isOpen: 모달 표시 여부
            - close: 모달 닫기 함수
            - onAdminLogin: 관리자 로그인 시 호출될 함수
            - adminMode: 관리자 로그인 모드임을 SignIn 컴포넌트에 알림
            - setUserRole: SignIn 컴포넌트에서 로그인 성공 시 AppRouter의 userRole 상태를 업데이트하기 위함
        */}
        <SignIn
          isOpen={isAdminSignInOpen} // 관리자 로그인 버튼에 의해 제어되는 모달 상태
          close={() => setIsAdminSignInOpen(false)}
          onAdminLogin={handleAdminLogin}
          adminMode={true} // 이 SignIn 모달은 항상 관리자 모드로 작동
          setUserRole={setUserRole} // userRole 상태를 SignIn 컴포넌트에서 업데이트할 수 있도록 전달
        />
        {/* 일반 사용자 로그인 모달은 LogInButton.tsx에서 렌더링됩니다.
            따라서 AppRouter에서는 별도로 일반 로그인용 SignIn을 직접 렌더링할 필요가 없습니다.
            LogInButton.tsx에서도 setUserRole을 SignIn 컴포넌트로 전달해야 합니다.
            (이전 답변에서 LogInButton.tsx 수정 제안 참조)
        */}

        <Routes>
          <Route path="/" element={<Home userRole={homeRole} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/register-property" element={<HouseRegisterForm />} />
          <Route path="/owner/mypage" element={<MyPage />} />
          <Route path="/owner/watinglist" element={<MyPage />} />
          <Route path="/owner/matchedlist" element={<MyPage />} />
          <Route path="/worker/main" element={<WorkerMainPage />} />{' '}
          {/* 복지사 메인 페이지 라우트 추가 */}
          {/* AdminPage 접근 권한을 userRole에 따라 제어합니다. */}
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
