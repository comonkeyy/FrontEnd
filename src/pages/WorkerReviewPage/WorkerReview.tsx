import React, { useState } from 'react';

interface VacantHouse {
  id: string;
  name: string;
  address: string;
  status: '매칭대기' | '매칭진행중' | '매칭완료';
  registeredDate: string;
  image: string;
  description: string;
  size: string;
  facilities: string[];
}

export const WorkerReview: React.FC = () => {
  const [houses, setHouses] = useState<VacantHouse[]>([
    {
      id: '1',
      name: '전통한옥 스타일 주택',
      address: '경상북도 의성군 의성읍 중앙로 123',
      status: '매칭대기',
      registeredDate: '2025-06-01',
      image:
        'https://readdy.ai/api/search-image?query=A%20beautiful%20traditional%20Korean%20hanok%20house%20with%20modern%20amenities%2C%20well-maintained%20garden%2C%20and%20clean%20architectural%20lines.%20The%20house%20features%20wooden%20elements%2C%20photographed%20during%20golden%20hour%20with%20soft%20natural%20lighting&width=400&height=300&seq=house1&orientation=landscape',
      description:
        '리모델링 완료된 전통 한옥으로, 현대식 시설을 갖추고 있습니다.',
      size: '85㎡',
      facilities: ['주차장', '정원', '에어컨', '보안시설'],
    },
    {
      id: '2',
      name: '모던 스타일 단독주택',
      address: '경상북도 의성군 의성읍 후죽리 456',
      status: '매칭진행중',
      registeredDate: '2025-05-15',
      image:
        'https://readdy.ai/api/search-image?query=A%20modern%20Korean%20style%20house%20with%20minimalist%20design%2C%20large%20windows%2C%20and%20a%20small%20garden.%20The%20exterior%20combines%20traditional%20and%20contemporary%20elements%2C%20captured%20in%20bright%20daylight%20showing%20its%20clean%20lines%20and%20welcoming%20entrance&width=400&height=300&seq=house2&orientation=landscape',
      description: '2023년 리모델링 완료, 복지사 거주에 최적화된 구조',
      size: '95㎡',
      facilities: ['주차장', '테라스', '에어컨', '보안시설', '창고'],
    },
    {
      id: '3',
      name: '전원주택 스타일 빈집',
      address: '경상북도 의성군 의성읍 업리 789',
      status: '매칭완료',
      registeredDate: '2025-04-20',
      image:
        'https://readdy.ai/api/search-image?query=A%20countryside%20Korean%20house%20with%20a%20spacious%20yard%20and%20mountain%20view.%20The%20house%20combines%20modern%20comfort%20with%20rural%20charm%2C%20featuring%20a%20vegetable%20garden%20and%20outdoor%20seating%20area%2C%20photographed%20in%20warm%20afternoon%20light&width=400&height=300&seq=house3&orientation=landscape',
      description: '자연친화적인 환경, 텃밭 있음',
      size: '120㎡',
      facilities: ['주차장', '텃밭', '에어컨', '보안시설', '창고', '테라스'],
    },
  ]);

  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteHouse = (id: string) => {
    setSelectedHouseId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedHouseId) {
      setHouses(houses.filter((house) => house.id !== selectedHouseId));
      setShowDeleteModal(false);
      setSelectedHouseId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '매칭대기':
        return 'bg-yellow-100 text-yellow-800';
      case '매칭진행중':
        return 'bg-blue-100 text-blue-800';
      case '매칭완료':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FFFDF5] flex flex-col items-center justify-center py-8 px-4">
      <div className="w-full max-w-5xl">
        {/* 빈집 목록 타이틀 및 등록 버튼 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#364C84]">내 빈집 목록</h2>
          <button className="bg-[#364C84] hover:bg-[#2A3B68] text-white px-6 py-3 rounded-button flex items-center cursor-pointer whitespace-nowrap">
            <i className="fas fa-plus"></i>
            빈집 등록하기
          </button>
        </div>

        {/* 빈집 목록 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses.map((house) => (
            <div
              key={house.id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={house.image}
                  alt={house.name}
                  className="w-full h-full object-cover object-top"
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(house.status)}`}
                >
                  {house.status}
                </span>
              </div>
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-[#364C84] mb-2">
                  {house.name}
                </h3>
                <p className="text-gray-600 mb-4">{house.address}</p>
                <div className="mb-4">
                  <p className="text-sm text-gray-500">
                    등록일: {house.registeredDate}
                  </p>
                  <p className="text-sm text-gray-500">면적: {house.size}</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {house.facilities.map((facility, index) => (
                    <span
                      key={index}
                      className="bg-[#E7F1A8] text-[#364C84] text-sm px-3 py-1 rounded-full"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <button className="text-[#364C84] hover:text-[#2A3B68] font-medium flex items-center cursor-pointer whitespace-nowrap">
                    <i className="fas fa-edit mr-2"></i>
                    수정하기
                  </button>
                  <button
                    onClick={() => handleDeleteHouse(house.id)}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center cursor-pointer whitespace-nowrap"
                  >
                    <i className="fas fa-trash-alt mr-2"></i>
                    삭제하기
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 삭제 확인 모달 */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-[#364C84] mb-4">
                빈집 삭제 확인
              </h3>
              <p className="text-gray-600 mb-6">
                정말로 이 빈집을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-button cursor-pointer whitespace-nowrap"
                >
                  삭제하기
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
