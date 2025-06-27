import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from '../pages/AdminPage/AdminPage';
import Home from '../pages/Home/Home';
import SignUpPage from '../pages/SignUpPage/SignUpPage';
import MyPage from '../pages/owner/MyPage';
import HouseRegisterForm from '../pages/HouseRegisterForm';
import Header from '../components/layouts/Header';
import Footer from '../components/layouts/Footer';

export default function AppRouter() {
  const [userRole, setUserRole] = useState<'owner' | 'worker' | 'guest'>(
    'guest',
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
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
