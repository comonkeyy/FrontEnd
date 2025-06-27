import React, { useState } from 'react';
const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* 히어로 섹션 */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=A%20warm%20and%20welcoming%20rural%20Korean%20village%20scene%20with%20traditional%20houses%20and%20modern%20elements%2C%20showing%20empty%20houses%20being%20renovated.%20The%20image%20has%20soft%20lighting%20with%20a%20gentle%20gradient%20from%20light%20blue%20to%20warm%20yellow%2C%20creating%20a%20hopeful%20atmosphere%20for%20community%20revival%20and%20care%20worker%20housing%20program&width=1440&height=600&seq=hero-image-1&orientation=landscape"
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
              의성군의 빈집 문제 해결과 복지사 주거 안정을 동시에 지원하는 지역
              기반 서비스입니다.
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
      {/* 서비스 소개 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#364C84] mb-4">
              서비스 소개
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              빈집 소유주와 복지사를 연결하여 지역사회에 활력을 불어넣고, 복지
              인프라를 강화합니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 카드 1 */}
            <div className="bg-[#FFFDF5] rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20vacant%20traditional%20Korean%20house%20with%20modern%20elements%20being%20registered%20in%20a%20system%2C%20showing%20a%20tablet%20with%20house%20details%20and%20location%20information.%20The%20image%20has%20a%20clean%2C%20minimalist%20background%20with%20soft%20lighting%20to%20emphasize%20the%20house%20registration%20process&width=400&height=200&seq=service-1&orientation=landscape"
                  alt="빈집 등록 및 관리"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#364C84] mb-3">
                  빈집 등록 및 관리
                </h3>
                <p className="text-gray-600 mb-4">
                  빈집 소유주는 쉽게 자신의 빈집을 등록하고 관리할 수 있습니다.
                  위치, 상태, 임대 가능 여부 등 상세 정보를 입력하세요.
                </p>
                <button className="text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap">
                  자세히 보기 <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
            {/* 카드 2 */}
            <div className="bg-[#FFFDF5] rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=A%20care%20worker%20being%20matched%20with%20a%20house%20in%20a%20rural%20Korean%20village%2C%20showing%20a%20digital%20interface%20with%20profile%20matching%20and%20house%20details.%20The%20scene%20has%20warm%20lighting%20with%20a%20soft%20color%20palette%2C%20emphasizing%20the%20human%20connection%20in%20the%20matching%20process&width=400&height=200&seq=service-2&orientation=landscape"
                  alt="복지사 맞춤형 매칭"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#364C84] mb-3">
                  복지사 맞춤형 매칭
                </h3>
                <p className="text-gray-600 mb-4">
                  복지사의 필요와 선호도에 맞는 빈집을 연결해 드립니다. 지역,
                  크기, 시설 등 다양한 조건으로 검색이 가능합니다.
                </p>
                <button className="text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap">
                  자세히 보기 <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
            {/* 카드 3 */}
            <div className="bg-[#FFFDF5] rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
              <div className="h-48 overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=Workers%20renovating%20and%20remodeling%20a%20traditional%20Korean%20house%2C%20showing%20interior%20and%20exterior%20improvements.%20The%20scene%20has%20natural%20lighting%20highlighting%20the%20transformation%20process%20with%20modern%20amenities%20being%20installed%20while%20preserving%20traditional%20elements&width=400&height=200&seq=service-3&orientation=landscape"
                  alt="리모델링 및 정비 지원"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#364C84] mb-3">
                  리모델링 및 정비 지원
                </h3>
                <p className="text-gray-600 mb-4">
                  빈집의 상태를 개선하기 위한 리모델링, 정비, 안전 점검 등을
                  지원합니다. 전문가의 도움을 받아보세요.
                </p>
                <button className="text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap">
                  자세히 보기 <i className="fas fa-arrow-right ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 이용 절차 섹션 */}
      <section className="py-16 bg-[#E7F1A8]/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#364C84] mb-4">
              이용 절차
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              간단한 절차로 빈집-복지사 매칭 서비스를 이용해 보세요.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 단계 1 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-[#364C84] mb-3">
                회원가입
              </h3>
              <p className="text-gray-600">
                빈집 소유주 또는 복지사로 간편하게 회원가입을 진행합니다.
              </p>
            </div>
            {/* 단계 2 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-[#364C84] mb-3">
                정보 등록
              </h3>
              <p className="text-gray-600">
                빈집 정보 또는 복지사 프로필을 상세히 등록합니다.
              </p>
            </div>
            {/* 단계 3 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-[#364C84] mb-3">
                매칭 진행
              </h3>
              <p className="text-gray-600">
                시스템이 최적의 매칭을 제안하고 중간 관리자가 확인합니다.
              </p>
            </div>
            {/* 단계 4 */}
            <div className="bg-white rounded-lg p-6 shadow-md text-center">
              <div className="w-16 h-16 bg-[#364C84] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold text-[#364C84] mb-3">
                계약 및 입주
              </h3>
              <p className="text-gray-600">
                안전한 계약 체결 후 복지사가 빈집에 입주합니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* 통계 섹션 */}
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
      {/* 커뮤니티 섹션 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#364C84] mb-4">커뮤니티</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              의성 빈집-복지사 매칭 서비스 이용자들의 생생한 이야기를
              들어보세요.
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
                  <p className="text-sm text-gray-500">
                    복지사 | 2025년 3월 입주
                  </p>
                </div>
              </div>
              <p className="text-gray-600 mb-3">
                "의성에서 일하게 되었을 때 주거 문제가 가장 걱정이었는데, 이
                서비스를 통해 깨끗하게 리모델링된 집을 찾을 수 있었습니다. 지역
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
                플랫폼을 통해 지역에 필요한 복지사분께 제공할 수 있어
                보람찹니다. 관리도 잘 해주셔서 만족스럽습니다."
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
          <div className="text-center mt-8">
            <button className="bg-[#95B1EE] hover:bg-[#7D9FE9] text-white px-6 py-3 rounded-button cursor-pointer whitespace-nowrap">
              더 많은 이야기 보기
            </button>
          </div>
        </div>
      </section>
      {/* CTA 섹션 */}
      <section className="py-16 bg-[#E7F1A8]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#364C84] mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            의성 빈집-복지사 매칭 서비스로 지역사회에 기여하고 더 나은 미래를
            함께 만들어가요.
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
      {/* 푸터 */}
      <footer className="bg-[#364C84] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">의성 빈집-복지사 매칭</h3>
              <p className="mb-4">
                빈집과 복지사를 연결하는 지역 기반 플랫폼입니다.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] cursor-pointer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] cursor-pointer"
                >
                  <i className="fab fa-kakao"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">서비스</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    빈집 등록
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    복지사 매칭
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    리모델링 지원
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    커뮤니티
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">고객지원</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    자주 묻는 질문
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    이용 가이드
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    문의하기
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                    공지사항
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">연락처</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i> 경상북도 의성군
                  의성읍
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone mr-2"></i> 054-123-4567
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope mr-2"></i> info@uiseong-match.kr
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm">
            <p>
              &copy; 2025 의성 빈집-복지사 매칭 플랫폼. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      {/* Gemini AI 음성 챗봇 버튼 */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#364C84] hover:bg-[#2A3B68] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer whitespace-nowrap group relative">
          <i className="fas fa-microphone text-xl group-hover:hidden"></i>
          <i className="fas fa-comments text-xl hidden group-hover:block"></i>
          <span className="absolute -top-10 right-0 bg-white text-[#364C84] px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap hidden group-hover:block">
            AI 음성 상담
          </span>
        </button>
      </div>
    </div>
  );
};
export default App;
