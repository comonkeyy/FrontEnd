import React from "react";
import "./MatchComplete.css";

type House = {
  id: number;
  imageUrl: string;
  address: string;
  roomCount: string;
  area: string;
  houseType: string; // '아파트' 또는 '주택'
  yearBuilt: string; // '2020년' 등
  moveInDate: string; // '2025-08-01' 등
};

const MatchCompletePage: React.FC = () => {
  // 임시 데이터 (API 연동 시 state로 변경)
  const matchedHouses: House[] = [
    {
      id: 1,
      imageUrl: "https://via.placeholder.com/200",
      address: "의성군 의성읍 동문로 123",
      roomCount: "3개",
      area: "25평 (약 83㎡)",
      houseType: "아파트",
      yearBuilt: "2010년",
      moveInDate: "2025-08-01",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/200",
      address: "의성군 단촌면 산성길 45",
      roomCount: "2개",
      area: "30평 (약 99㎡)",
      houseType: "주택",
      yearBuilt: "2015년",
      moveInDate: "2025-07-15",
    },
    {
      id: 3,
      imageUrl: "https://via.placeholder.com/200",
      address: "의성군 안사면 장터길 78",
      roomCount: "4개",
      area: "35평 (약 116㎡)",
      houseType: "아파트",
      yearBuilt: "2018년",
      moveInDate: "2025-09-01",
    },
  ];

  return (
    <div className="container">
      <h2 className="title">매칭 완료된 집</h2>
      <div className="houses-container">
        {matchedHouses.map((house) => (
          <div key={house.id} className="house-card">
            <div className="house-image">
              <img src={house.imageUrl} alt="집 사진" />
            </div>
            <div className="house-info">
              <h3 className="house-address">{house.address}</h3>
              <div className="house-detail">
                <span>방 수: {house.roomCount}</span>
                <span>평수: {house.area}</span>
                <span>주거 형태: {house.houseType}</span>
                <span>건축 연도: {house.yearBuilt}</span>
                <span>입주 시기: {house.moveInDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatchCompletePage;
