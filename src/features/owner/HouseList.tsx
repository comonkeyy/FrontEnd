// 예시: src/features/owner/HouseList.tsx

import React, { useEffect, useState } from 'react';
import { getMyHouses, deleteHouse, updateHouse } from '../../api/house';

const HouseList: React.FC = () => {
  const [houses, setHouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 서버에서 빈집 목록을 받아오는 함수
  const fetchHouses = () => {
    setLoading(true);
    getMyHouses()
      .then((res) => setHouses(res.data))
      .catch(() => alert('빈집 목록 조회 실패'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  // 삭제
  const handleDelete = async (houseId: string) => {
    await deleteHouse(houseId); // 서버에 삭제 요청
    fetchHouses(); // 삭제 후 목록을 다시 불러옴
  };

  // 수정
  const handleUpdate = async (houseId: string, updateData: any) => {
    await updateHouse(houseId, updateData); // 서버에 수정 요청
    fetchHouses(); // 수정 후 목록을 다시 불러옴
  };

  return (
    <div>
      <h2>내 빈집 목록</h2>
      <ul>
        {houses.map((house) => (
          <li key={house.id}>
            {house.name}
            <button
              onClick={() =>
                handleUpdate(house.id, {
                  /*수정데이터*/
                })
              }
            >
              수정하기
            </button>
            <button onClick={() => handleDelete(house.id)}>삭제하기</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HouseList;
