import React, { useState } from 'react';

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

const MatchRequestPage: React.FC = () => {
  const [form, setForm] = useState({
    minSize: '', // 최소 면적 (minArea -> minSize)
    maxSize: '', // 최대 면적 (maxArea -> maxSize)
    floor: '', // 층수 (floorCount -> floor)
    regions: [] as string[], // 지역 (체크박스)
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 지역 체크박스 토글
  const toggleRegion = (region: string) => {
    setForm((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };

  // 저장 버튼 클릭 시 실행
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm('매칭 조건을 저장하시겠습니까?')) {
      alert('매칭 조건이 저장되었습니다.');
    }
  };

  return (
    <section className="py-16 px-6 bg-[#FFFDF5] min-h-screen flex flex-col items-center justify-center">
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
            {/* 면적 (최소/최대) */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-ruler-combined mr-2"></i>
                면적
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label
                    htmlFor="minSize" // minArea -> minSize
                    className="block text-gray-700 font-medium mb-2"
                  >
                    최소 면적
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="minSize" // minArea -> minSize
                      name="minSize" // minArea -> minSize
                      value={form.minSize} // form.minArea -> form.minSize
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                      placeholder="최소 면적"
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
                    htmlFor="maxSize" // maxArea -> maxSize
                    className="block text-gray-700 font-medium mb-2"
                  >
                    최대 면적
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="maxSize" // maxArea -> maxSize
                      name="maxSize" // maxArea -> maxSize
                      value={form.maxSize} // form.maxArea -> form.maxSize
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                      placeholder="최대 면적"
                      required
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      m²
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 층수 (기존대로) */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-building mr-2"></i>
                층수
              </h3>
              <div className="relative">
                <input
                  type="number"
                  id="floor" // floorCount -> floor
                  name="floor" // floorCount -> floor
                  value={form.floor} // form.floorCount -> form.floor
                  onChange={handleChange}
                  min="1"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                  placeholder="층수"
                  required
                />
              </div>
            </div>

            {/* 지역 선택 (체크박스 버튼) */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i>
                희망 지역
              </h3>
              <div className="flex flex-wrap gap-2">
                {REGION_LIST.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                      form.regions.includes(region)
                        ? 'bg-[#95B1EE] text-[#364C84] font-bold'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    {region}
                  </button>
                ))}
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

export default MatchRequestPage;
