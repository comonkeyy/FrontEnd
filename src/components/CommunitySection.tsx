import React from 'react';

const CommunitySection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#364C84] mb-4">커뮤니티</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          의성희망둥지 서비스 이용자들의 생생한 이야기를 들어보세요.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 후기 1 */}
        <div className="bg-[#FFFDF5] rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#95B1EE] rounded-full flex items-center justify-center text-white font-bold mr-4">
              김
            </div>
            <div>
              <h3 className="font-bold text-[#364C84]">김미영</h3>
              <p className="text-sm text-gray-500">복지사 | 2025년 3월 입주</p>
            </div>
          </div>
          <p className="text-gray-600 mb-3">
            "의성에서 일하게 되었을 때 주거 문제가 가장 걱정이었는데, 이
            서비스를 통해 깨끗하고 합리적인 집을 찾을 수 있었습니다. 지역
            주민들과도 잘 어울려 살고 있어요."
          </p>
          <div className="flex text-yellow-400">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
        </div>
        {/* 후기 2 */}
        <div className="bg-[#FFFDF5] rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-[#E7F1A8] rounded-full flex items-center justify-center text-[#364C84] font-bold mr-4">
              박
            </div>
            <div>
              <h3 className="font-bold text-[#364C84]">박정호</h3>
              <p className="text-sm text-gray-500">
                빈집 소유주 | 2024년 12월 등록
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-3">
            "오랫동안 비어있던 부모님 집을 어떻게 활용할지 고민이었는데, 이
            플랫폼을 통해 지역에 필요한 복지사분께 제공할 수 있어 보람찹니다.
            아주 만족스럽습니다."
          </p>
          <div className="flex text-yellow-400">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star-half-alt"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CommunitySection;
