import React from 'react';
import './MyPageWorker.css';

// 임시 매칭 데이터 타입
type MatchInfo = {
  id: number;
  address: string;
  size: string; // area -> size
  roomCount: string;
  yearBuilt: string;
  moveInDate: string;
  houseType: string;
  status: '매칭 완료' | '매칭 대기';
};

const MyPageWorker: React.FC = () => {
  // 임시 매칭 데이터
  const matches: MatchInfo[] = [
    {
      id: 1,
      address: '의성군 의성읍 동문로 123',
      size: '25평', // area -> size
      roomCount: '3',
      yearBuilt: '2010',
      moveInDate: '2025-08-01',
      houseType: '아파트',
      status: '매칭 완료',
    },
    {
      id: 2,
      address: '의성군 단촌면 산성길 45',
      size: '30평', // area -> size
      roomCount: '2',
      yearBuilt: '2015',
      moveInDate: '2025-07-15',
      houseType: '주택',
      status: '매칭 대기',
    },
  ];

  // 나중에 API로 받아올 데이터를 state로 관리하면 됩니다.
  // 예시: const [matches, setMatches] = useState<MatchInfo[]>([]);

  return (
    <div className="container">
      <h2 className="title">복지사 마이페이지</h2>
      <div className="status-summary">
        <div className="status-card">
          <span className="status-label">매칭 완료</span>
          <span className="status-count">
            {matches.filter((m) => m.status === '매칭 완료').length}건
          </span>
        </div>
        <div className="status-card">
          <span className="status-label">매칭 대기</span>
          <span className="status-count">
            {matches.filter((m) => m.status === '매칭 대기').length}건
          </span>
        </div>
      </div>
      <div className="match-list">
        {matches.map((match) => (
          <div key={match.id} className="match-card">
            <div className="match-header">
              <span className="match-status">{match.status}</span>
              <span className="match-address">{match.address}</span>
            </div>
            <div className="match-info">
              <span>평수: {match.size}</span>
              <span>방 수: {match.roomCount}</span>
              <span>건축 연도: {match.yearBuilt}년</span>
              <span>입주 가능 시기: {match.moveInDate}</span>
              <span>주거 형태: {match.houseType}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPageWorker;
