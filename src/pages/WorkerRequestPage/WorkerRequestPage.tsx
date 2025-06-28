import React, { useState, useEffect } from 'react';

// API 응답 데이터에 대한 타입 정의
interface Matching {
  matching_id: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed'; // 다양한 상태 추가
  created_at: string;
  house_id: number;
  address: string;
  region: string;
  size: string;
  floor: string;
}

const WorkerRequestPage: React.FC = () => {
  const [matchings, setMatchings] = useState<Matching[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyMatchings = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken'); // SignIn에서 저장한 토큰 사용
        if (!token) {
          throw new Error('로그인이 필요합니다.');
        }

        const response = await fetch('http://localhost:3000/api/care-workers/myMatchings', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('매칭 현황을 불러오는 데 실패했습니다.');
        }

        const result = await response.json();
        if (result.success) {
          setMatchings(result.matchings);
        } else {
          throw new Error(result.message || '데이터 로딩 실패');
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyMatchings();
  }, []);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '승인 대기중';
      case 'approved': return '승인 완료';
      case 'rejected': return '승인 거절';
      case 'completed': return '입주 완료';
      default: return '알 수 없음';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600';
      case 'approved': return 'text-green-600';
      case 'rejected': return 'text-red-600';
      case 'completed': return 'text-blue-600';
      default: return 'text-gray-500';
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">매칭 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-500">오류: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5] p-4 sm:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#364C84] mb-8">나의 빈집 신청 현황</h1>
        
        {matchings.length === 0 ? (
          <p className="text-center text-gray-500 py-10">신청 내역이 없습니다.</p>
        ) : (
          <div className="space-y-4">
            {matchings.map((matching) => (
              <div key={matching.matching_id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{matching.address}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      {matching.region} | {matching.size} | {matching.floor}
                    </p>
                    <p className="text-sm text-gray-400 mt-2">
                      신청일: {new Date(matching.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`mt-4 sm:mt-0 text-lg font-bold ${getStatusColor(matching.status)}`}>
                    {getStatusText(matching.status)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerRequestPage;