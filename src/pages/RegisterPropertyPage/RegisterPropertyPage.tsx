import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHouse } from '@/api/house';
import type { VacantHouseData } from '@/@types/vacantHouse';
import './MatchRequestPage.css';

const RegisterPropertyPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<VacantHouseData>>({
    address: '',
    detailAddress: '',
    region: '',
    size: '',
    floor: '',
    description: '',
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.address || !formData.size || !formData.floor) {
      alert('주소, 평수, 층수는 필수 입력 항목입니다.');
      return;
    }
    try {
      const response = await createHouse(formData);
      alert(`빈집 등록 성공! (ID: ${response.houseId})`);
      navigate('/owner/mypage'); // 등록 후 마이페이지로 이동
    } catch (error) {
      console.error('빈집 등록 실패:', error);
      alert('빈집 등록에 실패했습니다.');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">빈집 매칭 요청</h2>
        <div className="card">
          <div className="info-group">
            <div className="info-row">
              <span className="info-label">주소 (필수)</span>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div className="info-row">
              <span className="info-label">상세주소</span>
              <input
                type="text"
                id="detailAddress"
                name="detailAddress"
                value={formData.detailAddress}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="info-row">
              <span className="info-label">지역</span>
              <input
                type="text"
                id="region"
                name="region"
                value={formData.region}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="info-row">
                <span className="info-label">평수 (필수)</span>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="info-row">
                <span className="info-label">층수 (필수)</span>
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  value={formData.floor}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>
            <div className="info-row">
              <span className="info-label">상세설명</span>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
        >
          등록하기
        </button>
      </form>
    </div>
  );
};

export default RegisterPropertyPage;
