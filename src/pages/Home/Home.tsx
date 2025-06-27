import React from 'react';
import HeroSection from '../../components/HeroSection';
import ServiceIntroSection from '../../components/ServiceIntroSection';
import ProcessSection from '../../components/ProcessSession';
import StatsSection from '../../components/StatsSection';
import CommunitySection from '../../components/CommunitySection';
import CTASection from '../../components/CTASection';
import GeminiVoiceChatButton from '../../components/GeminiVoiceChatButton';

type HomeProps = {
  userRole: 'owner' | 'worker' | 'guest';
};

const Home: React.FC<HomeProps> = ({ userRole }) => (
  <>
    <HeroSection userRole={userRole} />
    <ServiceIntroSection userRole={userRole} />
    <ProcessSection userRole={userRole} />

    {/* 게스트는 안내/버튼 모두 숨김 */}
    {userRole === 'owner' && (
      <div className="my-8 flex flex-col items-center">
        <div className="text-xl font-bold text-[#364C84] mb-4">
          집주인 전용 안내
        </div>
        <button className="bg-[#E7F1A8] text-[#364C84] px-6 py-3 rounded font-medium">
          빈집 등록하기
        </button>
      </div>
    )}
    {userRole === 'worker' && (
      <div className="my-8 flex flex-col items-center">
        <div className="text-xl font-bold text-[#364C84] mb-4">
          복지사 전용 안내
        </div>
        <button className="bg-[#95B1EE] text-white px-6 py-3 rounded font-medium">
          복지사 매칭 신청
        </button>
      </div>
    )}

    <StatsSection />
    <CommunitySection />
    <CTASection />
    <GeminiVoiceChatButton />
  </>
);

export default Home;
