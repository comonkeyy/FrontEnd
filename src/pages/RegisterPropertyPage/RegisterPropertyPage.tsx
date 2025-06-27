import React from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import './MatchRequestPage.css';

type HouseInfo = {
  area: string;
  roomCount: string;
  yearBuilt: string;
  moveInDate: string;
  houseType: string; // 'apartment' | 'house'
};

const MatchRequestPage: React.FC = () => {
  const [houseInfo, setHouseInfo] = React.useState<HouseInfo>({
    area: '',
    roomCount: '',
    yearBuilt: '',
    moveInDate: '',
    houseType: '',
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setHouseInfo({
      ...houseInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('입력된 집 정보:', houseInfo);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="title">빈집 매칭 요청</h2>
        <div className="card">
          <div className="info-group">
            <div className="info-row">
              <span className="info-label">평수</span>
              <input
                className="info-input"
                name="area"
                value={houseInfo.area}
                onChange={handleChange}
                placeholder="평수 입력"
              />
            </div>
            <div className="info-row">
              <span className="info-label">방 수</span>
              <input
                className="info-input"
                name="roomCount"
                value={houseInfo.roomCount}
                onChange={handleChange}
                placeholder="방 수 입력"
              />
            </div>
            <div className="info-row">
              <span className="info-label">건축 연도</span>
              <select
                className="info-select"
                name="yearBuilt"
                value={houseInfo.yearBuilt}
                onChange={handleChange}
              >
                <option value="">연도 선택</option>
                {Array.from({ length: 30 }, (_, i) => 2025 - i).map((year) => (
                  <option key={year} value={year}>
                    {year}년
                  </option>
                ))}
              </select>
            </div>
            <div className="info-row">
              <span className="info-label">입주 가능 시기</span>
              <input
                className="info-input"
                name="moveInDate"
                type="date"
                value={houseInfo.moveInDate}
                onChange={handleChange}
              />
            </div>
            <div className="info-row">
              <span className="info-label">주거 형태</span>
              <select
                className="info-select"
                name="houseType"
                value={houseInfo.houseType}
                onChange={handleChange}
              >
                <option value="">선택</option>
                <option value="apartment">아파트</option>
                <option value="house">주택</option>
              </select>
            </div>
          </div>
        </div>
        <button className="submit-button" type="submit">
          정보 저장
        </button>
      </form>
    </div>
  );
};

export default MatchRequestPage;
