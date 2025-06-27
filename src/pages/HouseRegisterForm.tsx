import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

type HouseRegistration = {
  name: string;
  type: '단독주택' | '아파트' | '빌라' | '다세대주택' | '한옥';
  address: string;
  detailAddress: string;
  size: number;
  rooms: number;
  bathrooms: number;
  constructionYear: number;
  availableDate: string;
  description: string;
  images: FileList | null;
  facilities: string[];
};

const FACILITY_LIST = [
  '주차장',
  '에어컨',
  '세탁기',
  '냉장고',
  '인터넷',
  '전자레인지',
  '가스레인지',
  '보안시설',
];

// 주소 입력 컴포넌트 (입력칸 클릭 시 모달)
const AddressInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const popupWrapRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setModalOpen(true);
    setTimeout(() => {
      if (!popupWrapRef.current) return;
      // @ts-ignore
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          onChange(data.roadAddress);
          setModalOpen(false);
        },
        onclose: function () {
          setModalOpen(false);
        },
        width: '100%',
        height: '100%',
      }).embed(popupWrapRef.current);
    }, 0);
  };

  return (
    <>
      <input
        type="text"
        value={value}
        placeholder="주소"
        readOnly
        onClick={openModal}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84] bg-[#ffffff] text-[#364C84] cursor-pointer"
        required
      />
      {modalOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setModalOpen(false)}
          />
          <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl w-[95vw] max-w-xl h-[500px] flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <span className="font-bold text-[#364C84]">도로명 주소 검색</span>
              <button
                className="text-gray-400 hover:text-gray-700 text-xl"
                onClick={() => setModalOpen(false)}
                aria-label="닫기"
              >
                &times;
              </button>
            </div>
            <div ref={popupWrapRef} className="flex-1" />
          </div>
        </>
      )}
    </>
  );
};

const HouseRegisterForm: React.FC = () => {
  const [form, setForm] = useState<HouseRegistration>({
    name: '',
    type: '단독주택',
    address: '',
    detailAddress: '',
    size: 0,
    rooms: 1,
    bathrooms: 1,
    constructionYear: new Date().getFullYear(),
    availableDate: '',
    description: '',
    images: null,
    facilities: [],
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }));
  };

  const handleFacilityChange = (facility: string, checked: boolean) => {
    setForm((prev) => ({
      ...prev,
      facilities: checked
        ? [...prev.facilities, facility]
        : prev.facilities.filter((f) => f !== facility),
    }));
  };

  // 사진 추가 (누적)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files);
      const newUrls = newFiles.map((file) => URL.createObjectURL(file));

      // 기존 파일들과 새 파일들을 합침 (누적)
      const updatedFiles = [...imageFiles, ...newFiles];
      const updatedPreviews = [...imagePreviews, ...newUrls];

      setImageFiles(updatedFiles);
      setImagePreviews(updatedPreviews);

      // FileList 업데이트
      const dt = new DataTransfer();
      updatedFiles.forEach((file) => dt.items.add(file));

      setForm((prev) => ({
        ...prev,
        images: dt.files,
      }));
    }

    // input value 초기화 (같은 파일 다시 선택 가능)
    e.target.value = '';
  };

  // 사진 삭제
  const handleImageDelete = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);

    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);

    setImagePreviews(newPreviews);
    setImageFiles(newFiles);

    const dt = new DataTransfer();
    newFiles.forEach((file) => dt.items.add(file));

    setForm((prev) => ({
      ...prev,
      images: dt.files,
    }));
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

    // 배열 요소 위치 변경
    const draggedFile = newFiles[draggedIndex];
    const draggedPreview = newPreviews[draggedIndex];

    newFiles.splice(draggedIndex, 1);
    newPreviews.splice(draggedIndex, 1);

    newFiles.splice(dropIndex, 0, draggedFile);
    newPreviews.splice(dropIndex, 0, draggedPreview);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);

    // FileList 업데이트
    const dt = new DataTransfer();
    newFiles.forEach((file) => dt.items.add(file));

    setForm((prev) => ({
      ...prev,
      images: dt.files,
    }));

    setDraggedIndex(null);
  };

  const handleAddressChange = (addr: string) => {
    setForm((prev) => ({
      ...prev,
      address: addr,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!window.confirm('정말로 등록하겠습니까?')) return;
    alert('등록이 완료되었습니다.');
    navigate('/owner/mypage');
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mt-12 mb-12">
      <h2 className="text-2xl font-bold text-[#364C84] mb-6">빈집 등록</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#364C84] mb-4">
            기본 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">건물 이름</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                placeholder="건물 이름"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">건물 유형</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                required
              >
                <option value="단독주택">단독주택</option>
                <option value="아파트">아파트</option>
                <option value="빌라">빌라</option>
                <option value="다세대주택">다세대주택</option>
                <option value="한옥">한옥</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">주소</label>
              <AddressInput
                value={form.address}
                onChange={handleAddressChange}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">상세 주소</label>
              <input
                type="text"
                name="detailAddress"
                value={form.detailAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                placeholder="상세 주소"
                required
              />
            </div>
          </div>
        </div>
        {/* 상세 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#364C84] mb-4">
            상세 정보
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">평수</label>
              <input
                type="number"
                name="size"
                value={form.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                min="0"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">방 개수</label>
              <input
                type="number"
                name="rooms"
                value={form.rooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                min="1"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">화장실 개수</label>
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                min="1"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">건축 년도</label>
              <input
                type="number"
                name="constructionYear"
                value={form.constructionYear}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">입주 가능 시기</label>
              <input
                type="date"
                name="availableDate"
                value={form.availableDate}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>
        </div>
        {/* 시설 정보 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#364C84] mb-4">
            시설 정보
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FACILITY_LIST.map((facility) => (
              <label
                key={facility}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={form.facilities.includes(facility)}
                  onChange={(e) =>
                    handleFacilityChange(facility, e.target.checked)
                  }
                  className="form-checkbox h-5 w-5 text-[#364C84]"
                />
                <span className="text-gray-700">{facility}</span>
              </label>
            ))}
          </div>
        </div>
        {/* 사진 등록 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#364C84] mb-4">
            사진 등록
          </h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="house-images"
              required={imagePreviews.length === 0}
            />
            <label htmlFor="house-images" className="cursor-pointer">
              <div className="space-y-4">
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                <p className="text-gray-600">클릭하여 사진을 업로드하세요</p>
                <p className="text-sm text-gray-500">(드래그로 순서 변경)</p>
              </div>
            </label>
            {/* 미리보기 영역 - 1:1 사이즈 + 삭제 기능 + 드래그앤드롭 */}
            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center mt-6">
                {imagePreviews.map((url, idx) => (
                  <div
                    key={idx}
                    className={`relative cursor-move select-none ${
                      draggedIndex === idx ? 'opacity-50' : ''
                    }`}
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
        {/* 상세 설명 */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-[#364C84] mb-4">
            상세 설명
          </h3>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
            rows={5}
            placeholder="빈집에 대한 상세한 설명을 입력해주세요..."
            required
          ></textarea>
        </div>
        {/* 제출 버튼 */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-button cursor-pointer whitespace-nowrap"
          >
            취소
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-[#364C84] hover:bg-[#2A3B68] text-white rounded-button cursor-pointer whitespace-nowrap"
          >
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default HouseRegisterForm;
