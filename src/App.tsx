import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 라우터 관련 컴포넌트 import

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

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      <Header />
      <HeroSection />
      <ServiceIntroSection />
      <ProcessSection />
      <StatsSection />
      <CommunitySection />
      <CTASection />
      <Footer />
      <GeminiVoiceChatButton />
    </div>
  );
};

export default App;
