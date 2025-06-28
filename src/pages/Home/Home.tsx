import React from 'react';
import HeroSection from '../../components/HeroSection';
import ServiceIntroSection from '../../components/ServiceIntroSection';
import ProcessSection from '../../components/ProcessSession';
import StatsSection from '../../components/StatsSection';
import CommunitySection from '../../components/CommunitySection';
import CTASection from '../../components/CTASection';
import GeminiVoiceChatButton from '../../components/GeminiVoiceChatButton';

type HomeProps = {
  userRole: 'owner' | 'CW' | 'guest';
};

const Home: React.FC<HomeProps> = ({ userRole }) => (
  <>
    <HeroSection userRole={userRole} />
    <ServiceIntroSection userRole={userRole} />
    <ProcessSection userRole={userRole} />

    <StatsSection />
    <CommunitySection />
    <CTASection />
    <GeminiVoiceChatButton />
  </>
);

export default Home;
