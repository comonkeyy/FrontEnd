import React from 'react';

const MatchRequestPage: React.FC = () => {
  // 저장 버튼 클릭 시 실행할 함수
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (window.confirm('매칭 조건을 저장하시겠습니까?')) {
      // 저장 로직이 있다면 여기에 작성
      console.log('매칭 조건 저장 완료');
    } else {
      // 취소 시 아무것도 하지 않음
      console.log('저장 취소');
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
            {/* 평수 범위 설정 */}
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
            {/* 건축 년도 설정 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-calendar-alt mr-2"></i>
                건축 년도
              </h3>
              <div className="relative">
                <select
                  id="constructionYear"
                  name="constructionYear"
                  className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] bg-white hover:border-[#95B1EE] transition-colors duration-200"
                  required
                >
                  <option value="">건축 년도 선택</option>
                  <option value="2020">2020년 이후</option>
                  <option value="2015">2015년 ~ 2019년</option>
                  <option value="2010">2010년 ~ 2014년</option>
                  <option value="2005">2005년 ~ 2009년</option>
                  <option value="2000">2000년 ~ 2004년</option>
                  <option value="1995">1995년 ~ 1999년</option>
                  <option value="1990">1990년 이전</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <i className="fas fa-chevron-down"></i>
                </div>
              </div>
            </div>
            {/* 입주 가능 시기 설정 */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                <i className="fas fa-home mr-2"></i>
                입주 희망 시기
              </h3>
              <div className="relative">
                <input
                  type="date"
                  id="moveInDate"
                  name="moveInDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
            </div>
            {/* 방 개수 및 화장실 개수 설정 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                  <i className="fas fa-bed mr-2"></i>방 개수
                </h3>
                <div className="relative">
                  <select
                    id="roomCount"
                    name="roomCount"
                    className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] bg-white hover:border-[#95B1EE] transition-colors duration-200"
                    required
                  >
                    <option value="">방 개수 선택</option>
                    <option value="1">1개</option>
                    <option value="2">2개</option>
                    <option value="3">3개</option>
                    <option value="4">4개 이상</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
                  <i className="fas fa-bath mr-2"></i>
                  화장실 개수
                </h3>
                <div className="relative">
                  <select
                    id="bathroomCount"
                    name="bathroomCount"
                    className="appearance-none w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] bg-white hover:border=[#95B1EE] transition-colors duration-200"
                    required
                  >
                    <option value="">화장실 개수 선택</option>
                    <option value="1">1개</option>
                    <option value="2">2개</option>
                    <option value="3">3개 이상</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <i className="fas fa-chevron-down"></i>
                  </div>
                </div>
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
