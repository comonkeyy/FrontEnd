import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './pages/Home/Home';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import RegisterPropertyPage from './pages/RegisterPropertyPage/RegisterPropertyPage';
import MyPage from './pages/owner/MyPage';
import HouseRegisterForm from './pages/HouseRegisterForm';

const App: React.FC = () => {
  // 실제로는 로그인 후 userRole을 받아와야 합니다.
  const [userRole, setUserRole] = useState<'owner' | 'worker' | 'guest'>(
    'owner',
  );

  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF5]">
        <Header userRole={userRole} />
        <Routes>
          <Route path="/" element={<Home userRole={userRole} />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/register-property" element={<HouseRegisterForm />} />
          <Route path="/owner/mypage" element={<MyPage />} />
          <Route path="/owner/register" element={<HouseRegisterForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
