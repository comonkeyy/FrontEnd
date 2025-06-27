import React from 'react';

const ServiceIntroSection: React.FC = () => (
  <section className="py-16 bg-white">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#364C84] mb-4">서비스 소개</h2>
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
              복지사의 필요와 선호도에 맞는 빈집을 연결해 드립니다. 지역, 크기,
              시설 등 다양한 조건으로 검색이 가능합니다.
            </p>
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
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ServiceIntroSection;
