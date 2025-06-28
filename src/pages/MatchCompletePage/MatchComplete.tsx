// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';

// 임시 데이터 타입 정의 (실제 API 데이터에 맞게 수정 필요)
interface House {
  id: number;
  title: string;
  status: string;
  address: string;
  imageUrl: string;
  details: string;
  monthlyRent: string;
  deposit: string;
  area: string;
  rooms: string;
  bathrooms: string;
  floor: string;
  features: string[];
  distance: string;
  condition: string;
  lastRenovated: string;
  selected: boolean;
}

const MatchCompletePage: React.FC = () => {
  // 실제로는 API로 데이터를 받아와야 합니다.
  const [houses, setHouses] = useState<House[]>([
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
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null);

  const handleAddToCart = async (houseId: number) => {
    const token = localStorage.getItem('accessToken');
    const currentUser = localStorage.getItem('currentUser');

    if (!token || !currentUser) {
      alert('카트에 담으려면 로그인이 필요합니다.');
      return;
    }

    const careworkerId = JSON.parse(currentUser).id;

    if (!window.confirm('이 매물을 카트에 담으시겠습니까?')) {
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/care-workers/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          careworker_id: careworkerId,
          house_id: houseId,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        alert(`매물이 카트에 담겼습니다. (카트 ID: ${result.id})`);
      } else {
        const errorMessage = result.message || '카트에 담는 데 실패했습니다. 이미 카트에 있는 매물일 수 있습니다.';
        throw new Error(errorMessage);
      }
    } catch (error: any) {
      console.error('카트 담기 오류:', error);
      alert(`오류가 발생했습니다: ${error.message}`);
    }
  };

  const handleViewDetails = (house: House) => {
    setSelectedHouse(house);
  };

  const handleBackToList = () => {
    setSelectedHouse(null);
  };

  const filteredHouses = houses.filter((house) => {
    const matchesSearch =
      house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.details.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedHouse ? (
          // 상세 보기 화면
          <div>
            <button
              onClick={handleBackToList}
              className="mb-6 flex items-center text-[#364C84] hover:text-[#4A62A3] transition-colors duration-200 font-semibold"
            >
              <i className="fas fa-arrow-left mr-2"></i>
              목록으로 돌아가기
            </button>
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <img
                    src={selectedHouse.imageUrl}
                    alt={selectedHouse.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">
                      {selectedHouse.title}
                    </h2>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium whitespace-nowrap">
                      입주 가능
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1 mb-6">
                    <i className="fas fa-map-marker-alt mr-2 text-gray-400"></i>
                    {selectedHouse.address}
                  </p>
                  <div className="grid grid-cols-2 gap-6 mb-6 text-center bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">면적</p>
                      <p className="text-lg text-gray-800 font-bold">
                        {selectedHouse.area}㎡
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">층수</p>
                      <p className="text-lg text-gray-800 font-bold">
                        {selectedHouse.floor}층
                      </p>
                    </div>
                  </div>
                  <div className="mt-auto flex justify-end">
                    <button
                      onClick={() => handleAddToCart(selectedHouse.id)}
                      className="px-6 py-3 bg-[#364C84] hover:bg-[#4A62A3] text-white rounded-lg transition-colors duration-200 font-bold flex items-center"
                    >
                      <i className="fas fa-cart-plus mr-2"></i>
                      카트에 담기
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // 목록 보기 화면
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-8">매물 현황</h1>
            {filteredHouses.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg shadow-md">
                <i className="fas fa-home text-gray-400 text-6xl mb-4"></i>
                <p className="text-gray-500 text-lg">
                  조건에 맞는 빈집이 없습니다.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHouses.map((house) => (
                  <div
                    key={house.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
                  >
                    <div className="relative">
                      <img
                        src={house.imageUrl}
                        alt={house.title}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-lg font-bold text-gray-800">
                        {house.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 mb-4">
                        <i className="fas fa-map-marker-alt mr-1 text-gray-400"></i>
                        {house.address}
                      </p>
                      <div className="mt-auto">
                        <button
                          onClick={() => handleViewDetails(house)}
                          className="w-full px-4 py-2 bg-[#364C84] text-white rounded-lg hover:bg-[#4A62A3] transition-colors duration-200 font-semibold"
                        >
                          상세 정보 보기
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchCompletePage;
