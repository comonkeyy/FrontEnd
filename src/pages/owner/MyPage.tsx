// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import GeminiVoiceChatButton from '@/components/GeminiVoiceChatButton';
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import VacantHouseForm from '@/features/auth/vacant-house/VacantHouseForm';
import type { VacantHouseData } from '@/types/vacantHouse';
import { deleteHouse, updateHouse } from '@/api/house';
import { getMyHouses } from '@/api/house'; // getMyHouses를 사용합니다.

// 데이터 타입 정의 (API 응답에 맞춰)
interface User {
  name: string;
  email: string;
}

interface House {
  id: number;
  address: string;
  region: string;
  size: string;
  floor: string;
  status: string; // 'available', 'matched' 등의 값을 가집니다.
}

const MyPage: React.FC = () => {
  const navigate = useNavigate(); // navigate 훅 사용
  const [activeTab, setActiveTab] = useState<'waiting' | 'completed'>(
    'waiting',
  );
  const [houses, setHouses] = useState<House[]>([]); // 타입을 House[]로 변경

  useEffect(() => {
    const fetchMyHouses = async () => {
      try {
        const response = await getMyHouses();
        // API 응답이 배열 형태이므로 그대로 상태에 저장합니다.
        setHouses(response);
      } catch (err) {
        console.error('빈집 목록 조회 실패:', err);
        alert('빈집 목록 조회에 실패했습니다.');
      }
    };
    fetchMyHouses();
  }, []);

  // 탭 변경 핸들러는 유지합니다.
  const handleTabChange = (tab: 'waiting' | 'completed') => {
    setActiveTab(tab);
    // URL 변경 로직은 필요하다면 유지하고, 아니라면 이 줄을 삭제해도 됩니다.
    navigate(tab === 'waiting' ? '/owner/waitinglist' : '/owner/matchedlist');
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(null);
  const [editingHouse, setEditingHouse] = useState<House | null>(null); // 타입 House로 변경

  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDeleteHouse = (id: string) => {
    setSelectedHouseId(id);
    setShowDeleteModal(true);
  };
  const confirmDelete = async () => {
    if (selectedHouseId) {
      try {
        await deleteHouse(String(selectedHouseId)); // id를 string으로 변환
        setHouses(houses.filter((house) => house.id !== selectedHouseId));
        setShowDeleteModal(false);
        setSelectedHouseId(null);
      } catch (e) {
        alert('삭제 실패');
      }
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return '매칭대기';
      case 'matched':
        return '매칭완료';
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': // '매칭대기'를 'available'로 변경
        return 'bg-yellow-100 text-yellow-800';
      case 'matched': // '매칭완료'를 'matched'로 변경
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return (
    <div className="min-h-screen bg-[#FFFDF5]">
      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-[#364C84]">내 빈집 목록</h2>
            <button
              onClick={() => navigate('/register-property')}
              className="bg-[#364C84] hover:bg-[#2A3B68] text-white px-6 py-3 rounded-button flex items-center cursor-pointer whitespace-nowrap"
            >
              <i className="fas fa-plus mr-2"></i>
              빈집 등록하기
            </button>
          </div>

          <div className="flex space-x-4 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('waiting')}
              className={`py-3 px-6 font-medium whitespace-nowrap ${
                activeTab === 'waiting'
                  ? 'text-[#364C84] border-b-2 border-[#364C84]'
                  : 'text-gray-500 hover:text-[#364C84]'
              }`}
            >
              매칭 대기중인 빈집
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`py-3 px-6 font-medium whitespace-nowrap ${
                activeTab === 'completed'
                  ? 'text-[#364C84] border-b-2 border-[#364C84]'
                  : 'text-gray-500 hover:text-[#364C84]'
              }`}
            >
              매칭 완료된 빈집
            </button>
          </div>
        </div>
        {/* 빈집 목록 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {houses
            .filter(
              (house) =>
                activeTab === 'waiting'
                  ? house.status === 'available' // '매칭대기'를 'available'로 변경
                  : house.status === 'matched', // '매칭완료'를 'matched'로 변경
            )
            .map((house) => (
              <div
                key={house.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={
                      house.images && house.images[0]
                        ? house.images[0]
                        : '/no-image.jpg'
                    }
                    alt={house.name}
                    className="w-full h-full object-cover object-top"
                  />
                  <span
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(house.status)}`}
                  >
                    {getStatusText(house.status)}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#364C84] mb-2">
                    {house.address} {/* name 대신 address를 표시 */}
                  </h3>
                  <p className="text-gray-600 mb-4">{house.region}</p>{' '}
                  {/* address 대신 region 표시 */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">
                      {/* registeredDate 대신 다른 정보 표시 또는 삭제 */}
                      층수: {house.floor}
                    </p>
                    <p className="text-sm text-gray-500">면적: {house.size}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    {activeTab === 'waiting' ? (
                      <>
                        <button
                          onClick={() => {
                            setEditingHouse(house); // house는 map의 콜백 파라미터
                            setShowEditModal(true);
                          }}
                          className="text-[#364C84] hover:text-[#2A3B68] font-medium flex items-center cursor-pointer whitespace-nowrap"
                        >
                          <i className="fas fa-edit mr-2"></i>
                          수정하기
                        </button>
                        <button
                          onClick={() => handleDeleteHouse(house.id)} // house.id가 number이므로 그대로 전달
                          className="text-red-600 hover:text-red-700 font-medium flex items-center cursor-pointer whitespace-nowrap"
                        >
                          <i className="fas fa-trash-alt mr-2"></i>
                          삭제하기
                        </button>
                      </>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <i className="fas fa-check-circle mr-2"></i>
                        매칭 완료
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
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

      {showEditModal && editingHouse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto border border-[#95B1EE] mx-4 my-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#364C84]">
                빈집 정보 수정
              </h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <VacantHouseForm
              mode="edit"
              initialData={editingHouse}
              onSubmit={async (data) => {
                try {
                  if (!editingHouse?.id) return;
                  await updateHouse(String(editingHouse.id), data); // id를 string으로 변환
                  setHouses((prevHouses) =>
                    prevHouses.map((house) =>
                      house.id === editingHouse.id
                        ? { ...house, ...data }
                        : house,
                    ),
                  );
                  setShowEditModal(false);
                } catch (e) {
                  alert('수정 실패');
                }
              }}
              onCancel={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}

      <GeminiVoiceChatButton></GeminiVoiceChatButton>
    </div>
  );
};
export default MyPage;
