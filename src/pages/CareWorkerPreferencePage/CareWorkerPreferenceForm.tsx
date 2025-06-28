import React, { useState, useEffect } from 'react';

interface PreferenceData {
  region: string;
  size: string;
  floor: string;
}

const CareWorkerPreferenceForm: React.FC = () => {
  const [preference, setPreference] = useState<PreferenceData>({
    region: '',
    size: '',
    floor: '',
  });
  const [preferenceId, setPreferenceId] = useState<number | null>(null);
  const careworkerId = 3; // 예시 ID, 실제로는 로그인 정보 등에서 가져와야 합니다.
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksInVzZXJfaWQiOiLsobDsnqztmIEiLCJyb2xlIjoiQ1ciLCJpYXQiOjE3NTEwOTgzNTUsImV4cCI6MTc1MTE4NDc1NX0.1SrxaLt4MxJAyPQxlhWVPghgzW-1dlaiw_NZSRGlOYE';

  // 컴포넌트 로드 시 기존 정보 불러오기 (수정을 위해)
  // 이 예제에서는 ID를 직접 지정했지만, 실제로는 동적으로 ID를 받아와야 합니다.
  useEffect(() => {
    const fetchPreference = async (id: number) => {
      try {
        const response = await fetch(`http://localhost:3000/api/care-workers/house-preferences/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.success && result.data) {
          setPreference({
            region: result.data.region,
            size: result.data.size,
            floor: result.data.floor,
          });
          setPreferenceId(result.data.id);
        }
      } catch (error) {
        console.error('Error fetching preference:', error);
      }
    };
    // 예시로 ID 9번을 조회합니다.
    // fetchPreference(9); 
  }, [token]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPreference(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = preferenceId 
      ? `http://localhost:3000/api/care-workers/house-preferences/${preferenceId}`
      : 'http://localhost:3000/api/care-workers/house-preferences';
      
    const method = preferenceId ? 'PUT' : 'POST';

    const body = preferenceId 
      ? JSON.stringify(preference)
      : JSON.stringify({ ...preference, careworker_id: careworkerId });

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: body,
      });

      const result = await response.json();

      if (result.success) {
        alert(`희망 정보가 성공적으로 ${preferenceId ? '수정' : '제출'}되었습니다.`);
        if (result.id) {
          setPreferenceId(result.id);
        }
      } else {
        alert('오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (!preferenceId) return;

    if (window.confirm('정말로 이 정보를 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/care-workers/house-preferences/${preferenceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (result.success) {
          alert('정보가 성공적으로 삭제되었습니다.');
          setPreference({ region: '', size: '', floor: '' });
          setPreferenceId(null);
        } else {
          alert('삭제 중 오류가 발생했습니다.');
        }
      } catch (error) {
        console.error('Error deleting preference:', error);
        alert('네트워크 오류가 발생했습니다.');
      }
    }
  };

  // 여기에 폼 UI를 구성하면 됩니다.
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-[#FFFDF5] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#364C84]">
            희망 주택 정보 {preferenceId ? '수정' : '등록'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="region" className="sr-only">희망 지역</label>
              <input id="region" name="region" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-[#364C84] focus:border-[#364C84] focus:z-10 sm:text-sm" placeholder="희망 지역 (예: 성남시 분당구)" value={preference.region} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="size" className="sr-only">희망 면적</label>
              <input id="size" name="size" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-[#364C84] focus:border-[#364C84] focus:z-10 sm:text-sm" placeholder="희망 면적 (예: 84㎡ 이상)" value={preference.size} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="floor" className="sr-only">희망 층수</label>
              <input id="floor" name="floor" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-[#364C84] focus:border-[#364C84] focus:z-10 sm:text-sm" placeholder="희망 층수 (예: 1층 또는 엘리베이터 있음)" value={preference.floor} onChange={handleChange} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#364C84] hover:bg-[#2A3B68] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#364C84]">
              {preferenceId ? '수정하기' : '제출하기'}
            </button>
            {preferenceId && (
              <button type="button" onClick={handleDelete} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-3">
                삭제하기
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CareWorkerPreferenceForm;