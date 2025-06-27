// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const MatchCompletePage: React.FC = () => {
  const [houses] = useState([
    {
      id: 1,
      title: '안계면 한옥 빈집',
      status: 'available',
      address: '경상북도 의성군 안계면 용기9길 17',
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20beautiful%20traditional%20Korean%20hanok%20house%20with%20wooden%20structure%20and%20peaceful%20garden%2C%20showing%20perfect%20harmony%20between%20tradition%20and%20contemporary%20living.%20Clean%20and%20well%20maintained%20exterior%20with%20natural%20lighting%20against%20a%20simple%20background&width=400&height=300&seq=house1&orientation=landscape',
      details: '전통 한옥 구조, 2층, 마당 있음',
      monthlyRent: '300,000',
      deposit: '1,000,000',
      area: '85',
      rooms: '3',
      bathrooms: '2',
      floor: '2',
      features: ['주차장', '마당', '창고'],
      distance: '1.5km',
      condition: '양호',
      lastRenovated: '2023년',
      selected: false,
    },
    {
      id: 2,
      title: '단밀면 아파트',
      status: 'available',
      address: '경상북도 의성군 단밀면 단밀로 123',
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20modern%20apartment%20interior%20in%20a%20rural%20area%2C%20bright%20and%20spacious%20living%20space%20with%20contemporary%20furniture%20and%20large%20windows%20offering%20natural%20light.%20Clean%20minimalist%20design%20with%20warm%20accents%20against%20a%20simple%20background&width=400&height=300&seq=house2&orientation=landscape',
      details: '방 3개, 화장실 2개, 주차장 있음',
      monthlyRent: '450,000',
      deposit: '5,000,000',
      area: '95',
      rooms: '3',
      bathrooms: '2',
      floor: '5',
      features: ['엘리베이터', '주차장', '보안시스템'],
      distance: '2.3km',
      condition: '최상',
      lastRenovated: '2024년',
      selected: false,
    },
    {
      id: 3,
      title: '의성읍 단독주택',
      status: 'available',
      address: '경상북도 의성군 의성읍 문소3길 45',
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20standalone%20house%20in%20a%20small%20town%20with%20modern%20design%2C%20featuring%20a%20small%20garden%20and%20parking%20space.%20Well%20maintained%20exterior%20with%20clean%20lines%20and%20neutral%20colors%20against%20a%20simple%20background&width=400&height=300&seq=house3&orientation=landscape',
      details: '단독주택, 마당 있음, 창고 있음',
      monthlyRent: '400,000',
      deposit: '3,000,000',
      area: '110',
      rooms: '4',
      bathrooms: '2',
      floor: '2',
      features: ['마당', '창고', '테라스'],
      distance: '0.8km',
      condition: '양호',
      lastRenovated: '2022년',
      selected: false,
    },
    {
      id: 4,
      title: '금성면 다가구주택',
      status: 'available',
      address: '경상북도 의성군 금성면 청화로 78',
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20multi-family%20residential%20building%20in%20a%20rural%20area%20with%20a%20modest%20but%20functional%20design%2C%20showing%20a%20well-maintained%20property%20with%20basic%20amenities%20and%20a%20small%20communal%20area.%20Clean%20exterior%20with%20simple%20landscaping%20against%20a%20neutral%20background&width=400&height=300&seq=house4&orientation=landscape',
      details: '다가구주택, 1층, 주차공간 있음',
      monthlyRent: '350,000',
      deposit: '2,000,000',
      area: '75',
      rooms: '2',
      bathrooms: '1',
      floor: '1',
      features: ['주차장', 'CCTV', '공용정원'],
      distance: '3.2km',
      condition: '보통',
      lastRenovated: '2021년',
      selected: false,
    },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHouse, setSelectedHouse] = useState<any>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedHouses, setSelectedHouses] = useState<number[]>([]);
  const handleSelectHouse = (id: number) => {
    if (selectedHouses.includes(id)) {
      setSelectedHouses(selectedHouses.filter((houseId) => houseId !== id));
    } else {
      setSelectedHouses([...selectedHouses, id]);
    }
  };
  const handleViewDetails = (house: any) => {
    setSelectedHouse(house);
  };
  const handleBackToList = () => {
    setSelectedHouse(null);
  };

  const filteredHouses = houses.filter((house) => {
    // Search term filter
    const matchesSearch =
      house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-800">빈집 목록</h1>
            </div>
            {selectedHouse ? (
              <div>
                <button
                  onClick={handleBackToList}
                  className="mb-4 flex items-center text-[#364C84] hover:text-[#4A62A3] transition-colors duration-200 cursor-pointer"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  목록으로 돌아가기
                </button>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <div className="rounded-lg overflow-hidden shadow-md">
                        <img
                          src={selectedHouse.imageUrl}
                          alt={selectedHouse.title}
                          className="w-full h-80 object-cover object-top"
                        />
                      </div>
                      <div className="mt-6">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">
                          위치 정보
                        </h3>
                        <div className="bg-white border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-2">
                            <i className="fas fa-map-marker-alt text-red-500 mr-2"></i>
                            <span className="text-gray-700">
                              {selectedHouse.address}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-1/2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-800">
                            {selectedHouse.title}
                          </h2>
                          <p className="text-gray-600 mt-1">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            {selectedHouse.address}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          입주 가능
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">면적</p>
                          <p className="text-gray-700 font-medium">
                            {selectedHouse.area}㎡
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">층수</p>
                          <p className="text-gray-700 font-medium">
                            {selectedHouse.floor}층
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-3">
                        <button
                          onClick={() => handleSelectHouse(selectedHouse.id)}
                          className="px-4 py-2 bg-[#364C84] hover:bg-[#4A62A3] text-white rounded-lg transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                        >
                          신청하기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  {filteredHouses.length === 0 ? (
                    <div className="text-center py-10 bg-white rounded-lg shadow-md">
                      <i className="fas fa-home text-gray-400 text-5xl mb-4"></i>
                      <p className="text-gray-500">
                        검색 조건에 맞는 빈집이 없습니다.
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredHouses.map((house) => (
                        <div
                          key={house.id}
                          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                        >
                          <div className="relative">
                            <img
                              src={house.imageUrl}
                              alt={house.title}
                              className="w-full h-48 object-cover object-top"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="text-lg font-medium text-gray-800">
                                {house.title}
                              </h3>
                              <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                                입주 가능
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                              <i className="fas fa-map-marker-alt mr-1"></i>
                              {house.address}
                            </p>
                            <div className="flex justify-between mb-3">
                              <div>
                                <p className="text-sm text-gray-500">면적</p>
                                <p className="font-medium">{house.area}㎡</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">층수</p>
                                <p className="font-medium">{house.floor}층</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleViewDetails(house)}
                              className="w-full px-4 py-2 bg-[#364C84] text-white rounded-lg hover:bg-[#4A62A3] transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                            >
                              상세 정보 보기
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">매칭 확정</h2>
            <p className="text-gray-600 mb-6">
              선택하신 {selectedHouses.length}개의 빈집에 대한 매칭을
              확정하시겠습니까? 확정 후에는 담당자가 연락을 드립니다.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                취소
              </button>
              <button
                onClick={() => {
                  alert(
                    '매칭이 확정되었습니다. 담당자가 빠른 시일 내에 연락드릴 예정입니다.',
                  );
                  setShowConfirmModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 !rounded-button whitespace-nowrap cursor-pointer"
              >
                확정
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default MatchCompletePage;
