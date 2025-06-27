import React from 'react';

const ProcessSection: React.FC = () => (
  <section className="py-16 bg-[#364C84] text-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">매칭 절차</h2>
        <p className="text-lg text-[#E7F1A8] max-w-2xl mx-auto">
          빈집 소유주와 복지사가 안전하게 연결되는 과정을 한눈에 확인하세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold mb-2">1</h3>
          <p className="text-xl">빈집 정보 등록</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-2">2</h3>
          <p className="text-xl">복지사 매칭 신청</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-2">3</h3>
          <p className="text-xl">매칭 및 계약 지원</p>
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
