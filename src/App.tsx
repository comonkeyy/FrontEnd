import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import HeroSection from './components/HeroSection';
import ServiceIntroSection from './components/ServiceIntroSection';
import ProcessSection from './components/ProcessSession';
import StatsSection from './components/StatsSection';
import CommunitySection from './components/CommunitySection';
import CTASection from './components/CTASection';
import GeminiVoiceChatButton from './components/GeminiVoiceChatButton';
import SignUpPage from './pages/SignUpPage/SignUpPage';

const Home = () => (
  <>
    <HeroSection />
    <ServiceIntroSection />
    <ProcessSection />
    <StatsSection />
    <CommunitySection />
    <CTASection />
    <GeminiVoiceChatButton />
  </>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFFDF5]">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* 필요시 다른 페이지도 추가 */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
