import React from 'react';
import img1_HeroSection from '../assets/img1_HeroSection.jpg';

const HeroSection: React.FC = () => (
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
      <div className="max-w-lg text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          빈집과 복지사를 연결하는
          <br />
          따뜻한 매칭 플랫폼
        </h2>
        <p className="text-lg mb-8">
          의성군의 빈집 문제 해결과 복지사 주거 안정을 동시에 지원하는 지역 기반
          서비스입니다.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="bg-[#E7F1A8] hover:bg-[#D9E68A] text-[#364C84] font-medium px-6 py-3 rounded-button cursor-pointer whitespace-nowrap">
            빈집 등록하기
          </button>
          <button className="bg-[#95B1EE] hover:bg-[#7D9FE9] text-white font-medium px-6 py-3 rounded-button cursor-pointer whitespace-nowrap">
            복지사 매칭 신청
          </button>
        </div>
      </div>
    </div>
  </section>
);

export default HeroSection;
