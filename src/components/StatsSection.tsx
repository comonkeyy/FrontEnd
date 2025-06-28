import React from 'react';

const StatsSection: React.FC = () => (
  <section className="py-16 bg-[#E7F1A8]/20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#364C84] mb-4">
          의성희망둥지 매칭 현황
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          꾸준히 증가하는 빈집 활용, 복지사 정착, 지역 활성화의 흐름을 숫자로
          보여드립니다.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            1
          </div>
          <h3 className="text-xl font-bold text-[#364C84] mb-3">등록된 빈집</h3>
          <p className="text-gray-600">2025년 3월 기준 250건</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            2
          </div>
          <h3 className="text-xl font-bold text-[#364C84] mb-3">
            매칭된 복지사
          </h3>
          <p className="text-gray-600">2024년 12월 기준 120명</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            3
          </div>
          <h3 className="text-xl font-bold text-[#364C84] mb-3">
            리모델링 지원
          </h3>
          <p className="text-gray-600">누적 98건</p>
        </div>
        <div className="bg-white rounded-lg p-6 shadow-md text-center">
          <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
            4
          </div>
          <h3 className="text-xl font-bold text-[#364C84] mb-3">누적 리뷰</h3>
          <p className="text-gray-600">실거주 후기 57건</p>
        </div>
      </div>
    </div>
  </section>
);

export default StatsSection;
