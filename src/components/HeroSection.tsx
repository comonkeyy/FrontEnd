import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1_HeroSection from '../assets/61879_112530_424.jpg';

type HeroSectionProps = {
  userRole: 'owner' | 'CW' | 'guest';
};

const HeroSection: React.FC<HeroSectionProps> = ({ userRole }) => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={img1_HeroSection}
          alt="의성 빈집-복지사 매칭 서비스"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#364C84]/80 to-transparent"></div>
      </div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        {/* min-h-[260px]는 버튼 포함시 실제 콘텐츠 높이에 맞게 조정하세요 */}
        <div className="max-w-lg md:ml-10 ml-0 text-white min-h-[260px] flex flex-col justify-center">
          {userRole === 'owner' && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                빈집을 새로운 기회로!
                <br />
                집주인을 위한 플랫폼
              </h2>
              <p className="text-lg mb-8 text-white">
                빈집을 등록하고, 복지사와 연결해 마을을 함께 살려보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-[#E7F1A8] hover:bg-[#D9E68A] text-[#364C84] font-medium px-6 py-3 rounded-button cursor-pointer whitespace-nowrap"
                  onClick={() => navigate('/register-property')}
                >
                  빈집 등록하기
                </button>
              </div>
            </>
          )}
          {userRole === 'CW' && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                따뜻한 보금자리,
                <br />
                복지사를 위한 연결
              </h2>
              <p className="text-lg mb-8 text-white">
                복지사로 등록하고, 새로운 삶의 터전을 찾아보세요.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-[#95B1EE] hover:bg-[#7D9FE9] text-white font-medium px-6 py-3 rounded-button cursor-pointer whitespace-nowrap"
                  onClick={() => navigate('/request')}
                >
                  복지사 매칭 신청
                </button>
              </div>
            </>
          )}
          {userRole === 'guest' && (
            <>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                따뜻한 마을, 새로운 시작
                <br />
                "의성희망둥지"
              </h2>
              <p className="text-lg mb-8 text-white">
                빈집과 복지사를 연결하는 의성희망둥지에 오신 것을 환영합니다.
              </p>
              {/* 버튼 대신 공간 확보 */}
              <div style={{ height: 48 }} />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
