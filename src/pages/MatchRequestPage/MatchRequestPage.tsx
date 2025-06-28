import React, { useState } from 'react';

const REGION_LIST = [
  '의성읍', '단촌면', '점곡면', '옥산면', '사곡면', '춘산면', '가음면',
  '금성면', '봉양면', '비안면', '구천면', '단밀면', '단북면', '안계면',
  '다인면', '신평면', '안평면', '안사면',
];

const MatchRequestPage: React.FC = () => {
  const [form, setForm] = useState({
    minSize: '',
    maxSize: '',
    floor: '',
    regions: [] as string[],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRegion = (region: string) => {
    setForm((prev) => ({
      ...prev,
      regions: prev.regions.includes(region)
        ? prev.regions.filter((r) => r !== region)
        : [...prev.regions, region],
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = localStorage.getItem('accessToken');
    const currentUser = localStorage.getItem('currentUser');

    if (!token || !currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }

    if (form.regions.length === 0) {
      alert('하나 이상의 희망 지역을 선택해주세요.');
      return;
    }

    if (!window.confirm('매칭 조건을 저장하시겠습니까?')) {
      return;
    }

    const careworkerId = JSON.parse(currentUser).id;

    try {
      const requests = form.regions.map(region => {
        // 1. API 명세에 맞게 'size' 필드를 위한 문자열 생성
        let sizeString = '전체';
        const min = form.minSize.trim();
        const max = form.maxSize.trim();

        if (min && max) {
          sizeString = `${min}㎡ ~ ${max}㎡`;
        } else if (min) {
          sizeString = `${min}㎡ 이상`;
        } else if (max) {
          sizeString = `${max}㎡ 이하`;
        }

        // 2. API 명세에 맞게 'floor' 필드를 위한 문자열 생성
        const floorString = form.floor.trim() || '전체';

        // 3. API 명세에 맞는 데이터 객체 생성
        const dataToSend = {
          careworker_id: careworkerId,
          region: region,
          size: sizeString,
          floor: floorString,
        };

        return fetch('http://localhost:3000/api/care-workers/house-preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        });
      });

      const responses = await Promise.all(requests);
      const allSuccess = responses.every(res => res.ok);

      if (allSuccess) {
        alert('선택한 모든 지역의 매칭 조건이 성공적으로 저장되었습니다.');
      } else {
        throw new Error('일부 조건 저장에 실패했습니다. 서버 응답을 확인해주세요.');
      }
    } catch (error: any) {
      console.error('매칭 조건 저장 오류:', error);
      alert(`오류가 발생했습니다: ${error.message}`);
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
            원하시는 주거 조건을 설정해 주세요. 조건에 맞는 빈집을 매칭해 드립니다.
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <form onSubmit={handleSubmit}>
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-ruler-combined mr-2"></i> 면적
              </h3>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label htmlFor="minSize" className="block text-gray-700 font-medium mb-2">
                    최소 면적
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="minSize"
                      name="minSize"
                      value={form.minSize}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                      placeholder="최소 면적"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m²</span>
                  </div>
                </div>
                <span className="text-gray-500 text-xl">~</span>
                <div className="flex-1">
                  <label htmlFor="maxSize" className="block text-gray-700 font-medium mb-2">
                    최대 면적
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      id="maxSize"
                      name="maxSize"
                      value={form.maxSize}
                      onChange={handleChange}
                      min="0"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                      placeholder="최대 면적"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">m²</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-building mr-2"></i> 층수
              </h3>
              <div className="relative">
                <input
                  type="text"
                  id="floor"
                  name="floor"
                  value={form.floor}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                  placeholder="예: 1층, 엘리베이터 있는 곳"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i> 희망 지역
              </h3>
              <div className="flex flex-wrap gap-2">
                {REGION_LIST.map((region) => (
                  <button
                    key={region}
                    type="button"
                    onClick={() => toggleRegion(region)}
                    className={`px-4 py-2 border rounded-lg transition-colors duration-200 ${
                      form.regions.includes(region)
                        ? 'bg-[#95B1EE] text-white font-bold border-[#95B1EE]'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-[#95B1EE]'
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#95B1EE] text-white py-3 rounded-lg font-bold hover:bg-[#7c99d5] transition-all duration-200 cursor-pointer whitespace-nowrap flex items-center justify-center"
            >
              <i className="fas fa-search mr-2"></i> 매칭 조건 저장하기
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default MatchRequestPage;
