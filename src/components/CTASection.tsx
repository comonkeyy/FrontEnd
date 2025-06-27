import React from 'react';

const CTASection: React.FC = () => (
  <section className="py-16 bg-[#E7F1A8]">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-[#364C84] mb-4">
        의성 빈집-복지사 매칭, 지금 시작하세요!
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
        빈집 소유주, 복지사 모두에게 열려있는 새로운 주거·복지 플랫폼.
        <br />
        지금 바로 등록하고, 더 나은 지역사회를 만들어보세요.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <button className="bg-[#364C84] hover:bg-[#2A3B68] text-white font-medium px-6 py-3 rounded-button cursor-pointer whitespace-nowrap">
          빈집 등록하기
        </button>
        <button className="bg-[#95B1EE] hover:bg-[#7D9FE9] text-white font-medium px-6 py-3 rounded-button cursor-pointer whitespace-nowrap">
          복지사 매칭 신청
        </button>
      </div>
    </div>
  </section>
);

export default CTASection;
