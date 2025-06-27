import React from 'react';

const ServiceIntroSection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#364C84] mb-4">
          서비스 주요 기능
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          빈집 등록부터 복지사 매칭, 리모델링 지원까지 한 번에!
          <br />
          의성 빈집-복지사 매칭 플랫폼의 핵심 서비스를 소개합니다.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* 1 */}
        <div className="bg-[#FFFDF5] rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="h-48 overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=A%20vacant%20traditional%20Korean%20house%20with%20modern%20elements%20being%20registered%20in%20a%20system%2C%20showing%20a%20tablet%20with%20house%20details%20and%20location%20information.&width=400&height=200&seq=service-1&orientation=landscape"
              alt="빈집 등록"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#364C84] mb-3">
              빈집 정보 등록
            </h3>
            <p className="text-gray-600 mb-4">
              빈집 소유주가 위치, 상태, 임대 조건 등 정보를 쉽고 빠르게 등록할
              수 있습니다.
            </p>
            <button className="text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap">
              더 알아보기 <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
        {/* 2 */}
        <div className="bg-[#FFFDF5] rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="h-48 overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=A%20care%20worker%20being%20matched%20with%20a%20house%20in%20a%20rural%20Korean%20village%2C%20showing%20a%20digital%20interface%20with%20profile%20matching%20and%20house%20details.&width=400&height=200&seq=service-2&orientation=landscape"
              alt="복지사 매칭"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#364C84] mb-3">
              복지사 매칭
            </h3>
            <p className="text-gray-600 mb-4">
              복지사가 원하는 조건에 맞는 빈집과 신속하게 매칭되고, 임대
              계약까지 지원합니다.
            </p>
            <button className="text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap">
              더 알아보기 <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
        {/* 3 */}
        <div className="bg-[#FFFDF5] rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg hover:-translate-y-1">
          <div className="h-48 overflow-hidden">
            <img
              src="https://readdy.ai/api/search-image?query=Workers%20renovating%20and%20remodeling%20a%20traditional%20Korean%20house%2C%20showing%20interior%20and%20exterior%20improvements.&width=400&height=200&seq=service-3&orientation=landscape"
              alt="리모델링 지원"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-[#364C84] mb-3">
              리모델링 및 정비 지원
            </h3>
            <p className="text-gray-600 mb-4">
              빈집 리모델링, 정비, 안전 점검 등 실질적 지원으로 주거 품질을
              높입니다.
            </p>
            <button className="text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap">
              더 알아보기 <i className="fas fa-arrow-right ml-2"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ServiceIntroSection;
