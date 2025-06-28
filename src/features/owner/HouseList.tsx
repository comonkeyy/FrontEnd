import React, { useState, useEffect } from 'react';
import { getMyHouses, deleteHouse, updateHouse } from '../../api/house';

interface House {
  id: number;
  address: string;
  region: string;
  size: string;
  floor: string;
  status: string;
  created_at: string;
}

const HouseList = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [editingHouse, setEditingHouse] = useState<House | null>(null);
  const [editForm, setEditForm] = useState({
    address: '',
    region: '',
    size: '',
    floor: '',
    status: '',
  });

  useEffect(() => {
    fetchHouses();
  }, []);

  const fetchHouses = async () => {
    try {
      const res = await getMyHouses();
      setHouses(res.data);
    } catch {
      alert('빈집 목록 조회 실패');
    }
  };

  const handleDelete = async (houseId: number) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      await deleteHouse(houseId);
      fetchHouses();
    }
  };

  const startEditing = (house: House) => {
    setEditingHouse(house);
    setEditForm({
      address: house.address,
      region: house.region,
      size: house.size,
      floor: house.floor,
      status: house.status,
    });
  };

  const handleEditChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const submitEdit = async () => {
    if (!editingHouse) return;

    try {
      await updateHouse(editingHouse.id, editForm);
      fetchHouses();
      setEditingHouse(null);
    } catch {
      alert('수정 실패');
    }
  };

  return (
    <div className="bg-[#FFFDF5] p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-[#364C84] mb-4">내 빈집 목록</h2>

      {houses.length === 0 ? (
        <p className="text-[#95B1EE]">등록된 빈집이 없습니다</p>
      ) : (
        <ul className="space-y-4">
          {houses.map((house) => (
            <li key={house.id} className="border-b border-[#95B1EE] pb-4">
              {editingHouse?.id === house.id ? (
                <div className="space-y-3">
                  <input
                    name="address"
                    value={editForm.address}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-[#95B1EE] rounded"
                  />
                  <input
                    name="region"
                    value={editForm.region}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-[#95B1EE] rounded"
                  />
                  <input
                    name="size"
                    value={editForm.size}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-[#95B1EE] rounded"
                  />
                  <input
                    name="floor"
                    value={editForm.floor}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-[#95B1EE] rounded"
                  />
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                    className="w-full p-2 border border-[#95B1EE] rounded"
                  >
                    <option value="available">매칭 대기</option>
                    <option value="matched">매칭 완료</option>
                  </select>
                  <div className="flex space-x-2">
                    <button
                      onClick={submitEdit}
                      className="bg-[#95B1EE] text-white px-3 py-1 rounded"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingHouse(null)}
                      className="bg-gray-500 text-white px-3 py-1 rounded"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-bold text-[#364C84]">{house.address}</p>
                  <p className="text-[#95B1EE]">
                    {house.region} · {house.size} · {house.floor}
                  </p>
                  <p
                    className={`font-bold ${
                      house.status === 'available'
                        ? 'text-[#E7F1A8]'
                        : 'text-[#95B1EE]'
                    }`}
                  >
                    {house.status === 'available' ? '매칭 대기' : '매칭 완료'}
                  </p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => startEditing(house)}
                      className="bg-[#95B1EE] text-white px-3 py-1 rounded"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDelete(house.id)}
                      className="bg-[#E7F1A8] text-[#364C84] px-3 py-1 rounded"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HouseList;
