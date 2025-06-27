import React, { useState, useRef } from 'react';

const HouseRegisterForm: React.FC = () => {
  const [form, setForm] = useState({
    address: '',
    detailAddress: '',
    minArea: '',
    maxArea: '',
    floorCount: '',
    region: '',
    description: '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const REGION_LIST = [
    '의성읍',
    '단촌면',
    '점곡면',
    '옥산면',
    '사곡면',
    '춘산면',
    '가음면',
    '금성면',
    '봉양면',
    '비안면',
    '구천면',
    '단밀면',
    '단북면',
    '안계면',
    '다인면',
    '신평면',
    '안평면',
    '안사면',
  ];

  // 입력값 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 사진 추가 (누적)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));
      const updatedFiles = [...imageFiles, ...newFiles];
      const updatedPreviews = [...imagePreviews, ...newUrls];
      setImageFiles(updatedFiles);
      setImagePreviews(updatedPreviews);
      e.target.value = '';
    }
  };

  // 사진 삭제
  const handleImageDelete = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);
  };

  // 드래그 시작
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  // 드래그 종료
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // 드롭 허용
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // 드롭 처리
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    const newFiles = [...imageFiles];
    const newPreviews = [...imagePreviews];
    const draggedFile = newFiles[draggedIndex];
    const draggedPreview = newPreviews[draggedIndex];
    newFiles.splice(draggedIndex, 1);
    newPreviews.splice(draggedIndex, 1);
    newFiles.splice(dropIndex, 0, draggedFile);
    newPreviews.splice(dropIndex, 0, draggedPreview);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    setDraggedIndex(null);
  };

  // 저장 버튼 클릭 시 확인창
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm('매칭 조건을 저장하시겠습니까?')) return;
    alert('매칭 조건이 저장되었습니다.');
    // 여기에 저장 로직 추가
  };

  return (
    <section className="py-16 px-6 bg-[#FFFDF5] min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#364C84] mb-4">
            복지사 매칭 조건 설정
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            원하시는 주거 조건을 설정해 주세요. 조건에 맞는 빈집을 매칭해
            드립니다.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <form onSubmit={handleSubmit}>
            {/* 주소/상세주소 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                주소
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="address"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    기본 주소
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                    placeholder="기본 주소를 입력하세요"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="detailAddress"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    상세 주소
                  </label>
                  <input
                    type="text"
                    id="detailAddress"
                    name="detailAddress"
                    value={form.detailAddress}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                    placeholder="상세 주소를 입력하세요"
                    required
                  />
                </div>
              </div>
            </div>
            {/* 평수 범위 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-ruler-combined mr-2"></i>
                희망 평수 범위
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="minArea"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    최소 평수
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="minArea"
                      name="minArea"
                      value={form.minArea}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                      placeholder="최소 평수"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      m²
                    </span>
                  </div>
                </div>
                <span className="text-gray-500 text-xl">~</span>
                <div className="flex-1">
                  <label
                    htmlFor="maxArea"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    최대 평수
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="maxArea"
                      name="maxArea"
                      value={form.maxArea}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                      placeholder="최대 평수"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      m²
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* 지역 선택 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                희망 지역
              </h3>
              <div className="relative">
                <select
                  id="region"
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] bg-white hover:border-[#95B1EE] transition-colors duration-200"
                  required
                >
                  <option value="">지역을 선택하세요</option>
                  {REGION_LIST.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
            {/* 층수 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-building mr-2"></i>
                층수
              </h3>
              <div className="relative">
                <select
                  id="floorCount"
                  name="floorCount"
                  value={form.floorCount}
                  onChange={handleChange}
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] bg-white hover:border-[#95B1EE] transition-colors duration-200"
                  required
                >
                  <option value="">층수 선택</option>
                  <option value="1">1층</option>
                  <option value="2">2층</option>
                  <option value="3">3층</option>
                  <option value="4">4층 이상</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
            {/* 사진 등록 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-camera mr-2"></i>
                사진 등록
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#95B1EE] transition-colors duration-200">
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label htmlFor="photos" className="cursor-pointer">
                  <div className="mb-4">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                  </div>
                  <p className="text-gray-600 mb-2">
                    클릭하여 사진을 등록하세요
                  </p>
                  <p className="text-gray-400 text-sm">
                    (최대 5장, 파일당 5MB 이하)
                  </p>
                </label>
                {/* 미리보기 영역 - 드래그앤드롭 및 삭제 기능 */}
                {imagePreviews.length > 0 && (
                  <div className="flex flex-wrap gap-4 justify-center mt-6">
                    {imagePreviews.map((url, idx) => (
                      <div
                        key={idx}
                        className={`relative cursor-move select-none ${draggedIndex === idx ? 'opacity-50' : ''}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, idx)}
                        onDragEnd={handleDragEnd}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, idx)}
                      >
                        <img
                          src={url}
                          alt={`미리보기 ${idx + 1}`}
                          className="w-32 h-32 object-cover rounded shadow aspect-square border-2 border-gray-200"
                        />
                        {/* 순서 표시 */}
                        <div className="absolute top-2 left-2 bg-[#364C84] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                          {idx + 1}
                        </div>
                        {/* 삭제 버튼 */}
                        <button
                          type="button"
                          onClick={() => handleImageDelete(idx)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md transition-colors"
                          aria-label={`이미지 ${idx + 1} 삭제`}
                        >
                          ×
                        </button>
                        {/* 드래그 아이콘 */}
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white rounded p-1">
                          <i className="fas fa-grip-vertical text-xs"></i>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#95B1EE] text-[#364C84] py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 !rounded-button cursor-pointer whitespace-nowrap flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i>
              매칭 조건 저장하기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HouseRegisterForm;
