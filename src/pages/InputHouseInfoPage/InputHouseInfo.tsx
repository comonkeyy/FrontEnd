import React from "react";
import type { ChangeEvent, FormEvent } from "react";
import "./InputHouseInfo.css";

type HouseInfo = {
  image: File | null;
  minArea: string; // 최소 평수
  maxArea: string; // 최대 평수
  houseType: string; // 'apartment' | 'house'
  moveInDate: string;
  yearBuilt: string;
  roomCount: string;
  imagePreview: string | null;
};

const InputHouseInfo: React.FC = () => {
  const [houseInfo, setHouseInfo] = React.useState<HouseInfo>({
    image: null,
    minArea: "",
    maxArea: "",
    houseType: "",
    moveInDate: "",
    yearBuilt: "",
    roomCount: "",
    imagePreview: null,
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setHouseInfo({
        ...houseInfo,
        image: file,
        imagePreview: previewUrl,
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setHouseInfo({
      ...houseInfo,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("등록된 집 정보:", houseInfo);
    // TODO: API 전송 등
  };

  return (
    <div className="container">
      <h2 className="title">빈 집 등록</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="card">
          <div className="image-upload">
            <label htmlFor="houseImage" className="image-label">
              {houseInfo.imagePreview ? (
                <img
                  src={houseInfo.imagePreview}
                  alt="집 사진 미리보기"
                  className="image-preview"
                />
              ) : (
                <div className="image-placeholder">
                  <span>집 사진을 등록해주세요</span>
                </div>
              )}
            </label>
            <input
              id="houseImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="image-input"
            />
          </div>
          <div className="info-group">
            <div className="info-row">
              <label className="info-label">평수</label>
              <div className="area-range-vertical">
                <div className="input-with-unit">
                  <input
                    className="info-input"
                    name="minArea"
                    value={houseInfo.minArea}
                    onChange={handleChange}
                    placeholder="최소 평수"
                    required
                  />
                  <span className="unit">m²</span>
                </div>
                <div className="input-with-unit">
                  <input
                    className="info-input"
                    name="maxArea"
                    value={houseInfo.maxArea}
                    onChange={handleChange}
                    placeholder="최대 평수"
                    required
                  />
                  <span className="unit">m²</span>
                </div>
              </div>
            </div>
            <div className="info-row">
              <label className="info-label">주거 형태</label>
              <select
                className="info-select"
                name="houseType"
                value={houseInfo.houseType}
                onChange={handleChange}
                required
              >
                <option value="">선택</option>
                <option value="apartment">아파트</option>
                <option value="house">주택</option>
              </select>
            </div>
            <div className="info-row">
              <label className="info-label">입주 가능 시기</label>
              <div className="date-input-wrapper">
                <input
                  className="info-input date-input"
                  type="date"
                  name="moveInDate"
                  value={houseInfo.moveInDate}
                  onChange={handleChange}
                  required
                />
                <span className="date-icon">📅</span>
              </div>
            </div>
            <div className="info-row">
              <label className="info-label">건축 연도</label>
              <select
                className="info-select"
                name="yearBuilt"
                value={houseInfo.yearBuilt}
                onChange={handleChange}
                required
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
              <label className="info-label">방 수</label>
              <input
                className="info-input"
                name="roomCount"
                value={houseInfo.roomCount}
                onChange={handleChange}
                placeholder="방 수 입력"
                type="number"
                min="0"
                required
              />
            </div>
          </div>
        </div>
        <button className="submit-button" type="submit">
          등록 완료
        </button>
      </form>
    </div>
  );
};

export default InputHouseInfo;
