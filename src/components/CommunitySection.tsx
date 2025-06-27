import React from 'react';

const CommunitySection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#364C84] mb-4">
          커뮤니티 & 후기
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          실제 이용자들의 생생한 경험과 후기를 확인해보세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 후기 1 */}
        <div className="bg-[#FFFDF5] rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#95B1EE] rounded-full flex items-center justify-center text-white font-bold mr-4">
              1
            </div>
            <div>
              <h3 className="font-bold text-[#364C84]">김복지</h3>
              <p className="text-sm text-gray-500">2025. 3</p>
            </div>
          </div>
          <p className="text-gray-600 mb-3">
            빈집 매칭을 통해 안정적으로 정착할 수 있었습니다. 관리와 지원이
            체계적이라 안심이 돼요!
          </p>
          <div className="flex text-yellow-400">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
        {/* 후기 2 */}
        <div className="bg-[#FFFDF5] rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#E7F1A8] rounded-full flex items-center justify-center text-[#364C84] font-bold mr-4">
              2
            </div>
            <div>
              <h3 className="font-bold text-[#364C84]">이소유</h3>
              <p className="text-sm text-gray-500">2024. 12</p>
            </div>
          </div>
          <p className="text-gray-600 mb-3">
            오랜 빈집을 복지사에게 임대해주고, 리모델링 지원도 받아 집이 새롭게
            태어났어요.
          </p>
          <div className="flex text-yellow-400">
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star-half-alt" />
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <button className="bg-[#95B1EE] hover:bg-[#7D9FE9] text-white px-6 py-3 rounded-button cursor-pointer whitespace-nowrap">
          더 많은 후기 보기
        </button>
      </div>
    </div>
  </section>
);

export default CommunitySection;
