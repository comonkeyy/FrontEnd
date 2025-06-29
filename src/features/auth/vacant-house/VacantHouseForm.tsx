// src/features/auth/vacant-house/VacantHouseForm.tsx
import React, { useState, useRef, useEffect } from 'react';

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
        placeholder="도로명 주소를 검색하세요"
        readOnly
        onClick={openModal}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
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

interface VacantHouseFormProps {
  initialData?: VacantHouseData; // 통합 인터페이스 사용
  onSubmit: (data: VacantHouseData) => void;
  mode: 'register' | 'edit';
  onCancel?: () => void;
}

const VacantHouseForm: React.FC<VacantHouseFormProps> = ({
  initialData,
  onSubmit,
  mode,
  onCancel,
}) => {
  const [form, setForm] = useState({
    address: initialData?.address || '',
    detailAddress: initialData?.detailAddress || '',
    size: initialData?.size || '', // area -> size
    floor: initialData?.floor || '', // floorCount -> floor
    region: initialData?.region || '',
    description: initialData?.description || '',
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>(
    initialData?.images || [],
  );
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (initialData) {
      setForm({
        address: initialData.address || '',
        detailAddress: initialData.detailAddress || '',
        size: initialData.size || '', // area -> size
        floor: initialData.floor || '', // floorCount -> floor
        region: initialData.region || '',
        description: initialData.description || '',
      });
      setImagePreviews(initialData.images || []);
      setImageFiles([]);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (addr: string) => {
    setForm((prev) => ({ ...prev, address: addr }));
  };

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

  const handleImageDelete = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index]);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFiles = imageFiles.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);
    setImageFiles(newFiles);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };
  const handleDragEnd = () => setDraggedIndex(null);
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...form,
      images: imagePreviews,
      imageFiles,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
          <i className="fas fa-map-marker-alt mr-2"></i>주소
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              도로명 주소
            </label>
            <AddressInput value={form.address} onChange={handleAddressChange} />
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
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
          <i className="fas fa-ruler-combined mr-2"></i>평수
        </h3>
        <div className="relative">
          <input
            type="number"
            id="size"
            name="size" // area -> size
            value={form.size} // form.area -> form.size
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
            placeholder="평수를 입력하세요"
            required
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            m²
          </span>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
          <i className="fas fa-map-marker-alt mr-2"></i>희망 지역
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
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-7">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
          <i className="fas fa-building mr-2"></i>층수
        </h3>
        <div className="relative">
          <select
            id="floor"
            name="floor" // floorCount -> floor
            value={form.floor} // form.floorCount -> form.floor
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
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-7">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
          <i className="fas fa-camera mr-2"></i>사진 등록
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
            <p className="text-gray-600 mb-2">클릭하여 사진을 등록하세요</p>
            <p className="text-gray-400 text-sm">(최대 5장, 파일당 5MB 이하)</p>
          </label>
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
                  <div className="absolute top-2 left-2 bg-[#364C84] text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                    {idx + 1}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleImageDelete(idx)}
                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md transition-colors"
                    aria-label={`이미지 ${idx + 1} 삭제`}
                  >
                    ×
                  </button>
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white rounded p-1">
                    <i className="fas fa-grip-vertical text-xs"></i>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-bold text-[#364C84] mb-4 flex items-center">
          <i className="fas fa-align-left mr-2"></i>상세 설명
        </h3>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] hover:border-[#95B1EE] transition-colors duration-200"
          rows={4}
          placeholder="상세 설명을 입력하세요"
          required
        />
      </div>
      <div className="flex justify-end space-x-4">
        {mode === 'edit' && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-button cursor-pointer whitespace-nowrap"
          >
            취소
          </button>
        )}
        <button
          type="submit"
          className="w-full bg-[#95B1EE] text-[#364C84] py-3 rounded-lg font-bold hover:bg-opacity-90 transition-all duration-200 !rounded-button cursor-pointer whitespace-nowrap flex items-center justify-center"
        >
          {mode === 'register' ? '빈 집 등록하기' : '수정 완료'}
        </button>
      </div>
    </form>
  );
};

export default VacantHouseForm;
