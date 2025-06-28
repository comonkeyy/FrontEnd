import React, { useState, useEffect } from 'react';
import { getOwnerHome } from '../../api/house';
import HouseList from '../../features/owner/HouseList';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [houses, setHouses] = useState<any[]>([]);

  useEffect(() => {
    const fetchMyHouses = async () => {
      try {
        const response = await getOwnerHome();
        // API 응답 객체에서 'houses' 배열을 추출하여 상태에 저장합니다.
        if (response.success) {
          // API 응답에서 사용자 정보와 집 목록을 각각 상태에 저장합니다.
          setUserInfo(response.user);
          setHouses(response.houses || []); // houses가 없으면 빈 배열로 설정
        }
      } catch (err) {
        console.error('마이페이지 데이터 조회 실패:', err);
        alert('데이터 조회에 실패했습니다.');
      }
    };
    fetchMyHouses();
  }, []);

  return (
    <div className="bg-[#FFFDF5] min-h-[calc(100vh-160px)] p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#364C84] mb-8">마이페이지</h1>

        {/* 사용자 정보 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-[#364C84] mb-4">내 정보</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-[#95B1EE]">이름</p>
              <p className="font-bold">{userInfo.name}</p>
            </div>
            <div>
              <p className="text-[#95B1EE]">전화번호</p>
              <p className="font-bold">{userInfo.phone}</p>
            </div>
            <div>
              <p className="text-[#95B1EE]">이메일</p>
              <p className="font-bold">{userInfo.email}</p>
            </div>
          </div>
        </div>

        {/* 빈집 목록 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#364C84]">내 빈집 목록</h2>
          </div>
          <HouseList houses={houses} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
