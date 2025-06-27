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
import MatchCompletePage from './pages/MatchCompletePage/MatchComplete';

const App: React.FC = () => {
  // 실제로는 로그인 후 userRole을 받아와야 합니다.
  const [userRole, setUserRole] = useState<'owner' | 'worker' | 'guest'>(
    'worker',
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
          <Route path="/owner/watinglist" element={<MyPage />} />
          <Route path="/owner/matchedlist" element={<MyPage />} />
          <Route path="/request" element={<MatchRequestPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/complete" element={<MatchCompletePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
