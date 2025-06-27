import React from 'react';

const ProcessSection: React.FC = () => (
  <section className="py-16 bg-[#364C84] text-white">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-4xl font-bold mb-2">250+</h3>
          <p className="text-xl">등록된 빈집</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-2">120+</h3>
          <p className="text-xl">매칭된 복지사</p>
        </div>
        <div>
          <h3 className="text-4xl font-bold mb-2">98%</h3>
          <p className="text-xl">사용자 만족도</p>
        </div>
      </div>
    </div>
  </section>
);

export default ProcessSection;
