// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.

import React, { useState, useEffect } from 'react';

interface VacantHouse {
  id: string;
  name: string;
  address: string;
  status: '매칭대기' | '매칭진행중' | '매칭완료';
  registeredDate: string;
  image: string;
  description: string;
  size: string;
  facilities: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: '관리자' | '빈집소유주' | '복지사';
  status: '활성' | '비활성';
  registeredDate: string;
  lastLogin: string;
}

interface Matching {
  id: string;
  houseId: string;
  houseName: string;
  careWorkerId: string;
  careWorkerName: string;
  status: '신청' | '검토중' | '승인' | '거절' | '완료';
  applicationDate: string;
  approvalDate: string;
  contractStartDate: string;
  contractEndDate: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userRole: '빈집소유주' | '복지사';
  content: string;
  rating: number;
  date: string;
  status: '승인대기' | '승인' | '거절';
}

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  isImportant: boolean;
  viewCount: number;
}

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<
    'dashboard' | 'matchings' | 'houses' | 'reviews' | 'notices' | 'users'
  >('dashboard');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>(
    'success',
  );
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<
    'delete' | 'edit' | 'create' | 'view'
  >('view');
  const [modalTarget, setModalTarget] = useState<
    'matching' | 'house' | 'user' | 'review' | 'notice'
  >('matching');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  // Add fade-in-up animation
  const fadeInUpAnimation = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fadeInUp 0.3s ease-out;
    }
  `;

  useEffect(() => {
    // Add animation styles
    const styleSheet = document.createElement('style');
    styleSheet.innerText = fadeInUpAnimation;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  // Sample data
  const [houses, setHouses] = useState<VacantHouse[]>([
    {
      id: '1',
      name: '전통한옥 스타일 주택',
      address: '경상북도 의성군 의성읍 중앙로 123',
      status: '매칭대기',
      registeredDate: '2025-06-01',
      image:
        'https://readdy.ai/api/search-image?query=A%20beautiful%20traditional%20Korean%20hanok%20house%20with%20modern%20amenities%2C%20well-maintained%20garden%2C%20and%20clean%20architectural%20lines.%20The%20house%20features%20wooden%20elements%20and%20a%20tiled%20roof%2C%20photographed%20during%20golden%20hour%20with%20soft%20natural%20lighting&width=400&height=300&seq=house1&orientation=landscape',
      description:
        '리모델링 완료된 전통 한옥으로, 현대식 시설을 갖추고 있습니다.',
      size: '85㎡',
      facilities: ['주차장', '정원', '에어컨', '보안시설'],
    },
    {
      id: '2',
      name: '모던 스타일 단독주택',
      address: '경상북도 의성군 의성읍 후죽리 456',
      status: '매칭진행중',
      registeredDate: '2025-05-15',
      image:
        'https://readdy.ai/api/search-image?query=A%20modern%20Korean%20style%20house%20with%20minimalist%20design%2C%20large%20windows%2C%20and%20a%20small%20garden.%20The%20exterior%20combines%20traditional%20and%20contemporary%20elements%2C%20captured%20in%20bright%20daylight%20showing%20its%20clean%20lines%20and%20welcoming%20entrance&width=400&height=300&seq=house2&orientation=landscape',
      description: '2023년 리모델링 완료, 복지사 거주에 최적화된 구조',
      size: '95㎡',
      facilities: ['주차장', '테라스', '에어컨', '보안시설', '창고'],
    },
    {
      id: '3',
      name: '전원주택 스타일 빈집',
      address: '경상북도 의성군 의성읍 업리 789',
      status: '매칭완료',
      registeredDate: '2025-04-20',
      image:
        'https://readdy.ai/api/search-image?query=A%20countryside%20Korean%20house%20with%20a%20spacious%20yard%20and%20mountain%20view.%20The%20house%20combines%20modern%20comfort%20with%20rural%20charm%2C%20featuring%20a%20vegetable%20garden%20and%20outdoor%20seating%20area%2C%20photographed%20in%20warm%20afternoon%20light&width=400&height=300&seq=house3&orientation=landscape',
      description: '자연친화적인 환경, 텃밭 있음',
      size: '120㎡',
      facilities: ['주차장', '텃밭', '에어컨', '보안시설', '창고', '테라스'],
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: '김관리',
      email: 'admin@uiseong.kr',
      role: '관리자',
      status: '활성',
      registeredDate: '2024-01-15',
      lastLogin: '2025-06-27',
    },
    {
      id: '2',
      name: '박소유',
      email: 'owner@example.com',
      role: '빈집소유주',
      status: '활성',
      registeredDate: '2025-03-10',
      lastLogin: '2025-06-25',
    },
    {
      id: '3',
      name: '이복지',
      email: 'care@example.com',
      role: '복지사',
      status: '활성',
      registeredDate: '2025-04-05',
      lastLogin: '2025-06-26',
    },
    {
      id: '4',
      name: '최소유',
      email: 'owner2@example.com',
      role: '빈집소유주',
      status: '비활성',
      registeredDate: '2025-02-20',
      lastLogin: '2025-05-15',
    },
  ]);

  const [matchings, setMatchings] = useState<Matching[]>([
    {
      id: '1',
      houseId: '2',
      houseName: '모던 스타일 단독주택',
      careWorkerId: '3',
      careWorkerName: '이복지',
      status: '검토중',
      applicationDate: '2025-06-20',
      approvalDate: '',
      contractStartDate: '',
      contractEndDate: '',
    },
    {
      id: '2',
      houseId: '3',
      houseName: '전원주택 스타일 빈집',
      careWorkerId: '3',
      careWorkerName: '이복지',
      status: '완료',
      applicationDate: '2025-04-25',
      approvalDate: '2025-05-05',
      contractStartDate: '2025-05-15',
      contractEndDate: '2026-05-14',
    },
  ]);

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userId: '3',
      userName: '이복지',
      userRole: '복지사',
      content:
        '깨끗하고 아늑한 집이었습니다. 소유주분도 친절하셔서 만족스러웠습니다.',
      rating: 5,
      date: '2025-06-15',
      status: '승인',
    },
    {
      id: '2',
      userId: '2',
      userName: '박소유',
      userRole: '빈집소유주',
      content: '복지사분이 집을 잘 관리해주셔서 감사합니다.',
      rating: 4,
      date: '2025-06-10',
      status: '승인',
    },
    {
      id: '3',
      userId: '4',
      userName: '최소유',
      userRole: '빈집소유주',
      content: '매칭 시스템이 편리하고 효율적입니다.',
      rating: 5,
      date: '2025-06-05',
      status: '승인대기',
    },
  ]);

  const [notices, setNotices] = useState<Notice[]>([
    {
      id: '1',
      title: '시스템 업데이트 안내',
      content:
        '7월 1일부터 새로운 기능이 추가됩니다. 자세한 내용은 공지사항을 확인해주세요.',
      date: '2025-06-25',
      isImportant: true,
      viewCount: 156,
    },
    {
      id: '2',
      title: '여름철 빈집 관리 가이드',
      content:
        '여름철 빈집 관리에 대한 가이드를 제공합니다. 습기 관리와 통풍에 특히 신경써주세요.',
      date: '2025-06-20',
      isImportant: false,
      viewCount: 89,
    },
    {
      id: '3',
      title: '복지사 매칭 프로세스 개선 안내',
      content:
        '복지사 매칭 프로세스가 개선되었습니다. 이제 더 빠르고 정확한 매칭이 가능합니다.',
      date: '2025-06-15',
      isImportant: true,
      viewCount: 124,
    },
  ]);

  // Dashboard stats
  const dashboardStats = {
    totalHouses: houses.length,
    waitingHouses: houses.filter((h) => h.status === '매칭대기').length,
    inProgressHouses: houses.filter((h) => h.status === '매칭진행중').length,
    completedHouses: houses.filter((h) => h.status === '매칭완료').length,
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === '활성').length,
    totalMatchings: matchings.length,
    pendingMatchings: matchings.filter(
      (m) => m.status === '신청' || m.status === '검토중',
    ).length,
    completedMatchings: matchings.filter((m) => m.status === '완료').length,
    totalReviews: reviews.length,
    pendingReviews: reviews.filter((r) => r.status === '승인대기').length,
  };

  const showToastMessage = (
    message: string,
    type: 'success' | 'error' | 'info' = 'success',
  ) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const openModal = (
    type: 'delete' | 'edit' | 'create' | 'view',
    target: 'matching' | 'house' | 'user' | 'review' | 'notice',
    id?: string,
  ) => {
    setModalType(type);
    setModalTarget(target);
    if (id) setSelectedItemId(id);
    setShowModal(true);
  };

  const handleDelete = () => {
    if (!selectedItemId) return;

    switch (modalTarget) {
      case 'matching':
        setMatchings(matchings.filter((m) => m.id !== selectedItemId));
        showToastMessage('매칭이 삭제되었습니다.');
        break;
      case 'house':
        setHouses(houses.filter((h) => h.id !== selectedItemId));
        showToastMessage('빈집이 삭제되었습니다.');
        break;
      case 'user':
        setUsers(users.filter((u) => u.id !== selectedItemId));
        showToastMessage('사용자가 삭제되었습니다.');
        break;
      case 'review':
        setReviews(reviews.filter((r) => r.id !== selectedItemId));
        showToastMessage('후기가 삭제되었습니다.');
        break;
      case 'notice':
        setNotices(notices.filter((n) => n.id !== selectedItemId));
        showToastMessage('공지사항이 삭제되었습니다.');
        break;
    }

    setShowModal(false);
    setSelectedItemId(null);
  };

  const handleApproveReview = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, status: '승인' } : review,
      ),
    );
    showToastMessage('후기가 승인되었습니다.');
  };

  const handleRejectReview = (id: string) => {
    setReviews(
      reviews.map((review) =>
        review.id === id ? { ...review, status: '거절' } : review,
      ),
    );
    showToastMessage('후기가 거절되었습니다.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '매칭대기':
      case '신청':
      case '승인대기':
        return 'bg-yellow-100 text-yellow-800';
      case '매칭진행중':
      case '검토중':
        return 'bg-blue-100 text-blue-800';
      case '매칭완료':
      case '완료':
      case '승인':
        return 'bg-green-100 text-green-800';
      case '거절':
      case '비활성':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <i
            key={i}
            className={`fas ${i < rating ? 'fa-star' : 'fa-star-o'}`}
          ></i>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 관리자 헤더 */}
      <header className="bg-[#364C84] text-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">의성 빈집-복지사 매칭 관리자</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 cursor-pointer whitespace-nowrap">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#364C84] font-bold">
                  김
                </div>
                <span>김관리님</span>
                <i className="fas fa-chevron-down text-xs"></i>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-[#364C84] hover:bg-[#E7F1A8]/20"
                >
                  내 정보
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#364C84] hover:bg-[#E7F1A8]/20"
                >
                  설정
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#364C84] hover:bg-[#E7F1A8]/20"
                >
                  로그아웃
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* 사이드바 */}
        <aside className="w-64 bg-white shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-bold text-[#364C84] mb-6">
              관리자 메뉴
            </h2>
            <nav className="space-y-1">
              <button
                onClick={() => setActiveSection('dashboard')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap ${activeSection === 'dashboard' ? 'bg-[#E7F1A8]/30 text-[#364C84]' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fas fa-tachometer-alt"></i>
                <span>대시보드</span>
              </button>
              <button
                onClick={() => setActiveSection('matchings')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap ${activeSection === 'matchings' ? 'bg-[#E7F1A8]/30 text-[#364C84]' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fas fa-handshake"></i>
                <span>매칭 관리</span>
              </button>
              <button
                onClick={() => setActiveSection('houses')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap ${activeSection === 'houses' ? 'bg-[#E7F1A8]/30 text-[#364C84]' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fas fa-home"></i>
                <span>빈집 관리</span>
              </button>
              <button
                onClick={() => setActiveSection('reviews')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap ${activeSection === 'reviews' ? 'bg-[#E7F1A8]/30 text-[#364C84]' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fas fa-star"></i>
                <span>후기 관리</span>
              </button>
              <button
                onClick={() => setActiveSection('notices')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap ${activeSection === 'notices' ? 'bg-[#E7F1A8]/30 text-[#364C84]' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fas fa-bullhorn"></i>
                <span>공지사항/FAQ 관리</span>
              </button>
              <button
                onClick={() => setActiveSection('users')}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg cursor-pointer whitespace-nowrap ${activeSection === 'users' ? 'bg-[#E7F1A8]/30 text-[#364C84]' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <i className="fas fa-users"></i>
                <span>사용자 관리</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <main className="flex-1 p-8">
          {/* 대시보드 */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-[#364C84] mb-6">
                대시보드
              </h2>

              {/* 통계 카드 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      빈집 현황
                    </h3>
                    <div className="w-10 h-10 bg-[#E7F1A8]/30 rounded-full flex items-center justify-center text-[#364C84]">
                      <i className="fas fa-home"></i>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#364C84] mb-2">
                    {dashboardStats.totalHouses}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">
                      대기: {dashboardStats.waitingHouses}
                    </span>
                    <span className="text-blue-600">
                      진행중: {dashboardStats.inProgressHouses}
                    </span>
                    <span className="text-green-600">
                      완료: {dashboardStats.completedHouses}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      매칭 현황
                    </h3>
                    <div className="w-10 h-10 bg-[#E7F1A8]/30 rounded-full flex items-center justify-center text-[#364C84]">
                      <i className="fas fa-handshake"></i>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#364C84] mb-2">
                    {dashboardStats.totalMatchings}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">
                      대기: {dashboardStats.pendingMatchings}
                    </span>
                    <span className="text-green-600">
                      완료: {dashboardStats.completedMatchings}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      사용자 현황
                    </h3>
                    <div className="w-10 h-10 bg-[#E7F1A8]/30 rounded-full flex items-center justify-center text-[#364C84]">
                      <i className="fas fa-users"></i>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#364C84] mb-2">
                    {dashboardStats.totalUsers}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">
                      활성: {dashboardStats.activeUsers}
                    </span>
                    <span className="text-red-600">
                      비활성:{' '}
                      {dashboardStats.totalUsers - dashboardStats.activeUsers}
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">
                      후기 현황
                    </h3>
                    <div className="w-10 h-10 bg-[#E7F1A8]/30 rounded-full flex items-center justify-center text-[#364C84]">
                      <i className="fas fa-star"></i>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-[#364C84] mb-2">
                    {dashboardStats.totalReviews}
                  </p>
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-600">
                      승인대기: {dashboardStats.pendingReviews}
                    </span>
                    <span className="text-green-600">
                      승인완료:{' '}
                      {dashboardStats.totalReviews -
                        dashboardStats.pendingReviews}
                    </span>
                  </div>
                </div>
              </div>

              {/* 최근 활동 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    최근 매칭 신청
                  </h3>
                  <div className="space-y-4">
                    {matchings
                      .filter(
                        (m) => m.status === '신청' || m.status === '검토중',
                      )
                      .slice(0, 3)
                      .map((matching) => (
                        <div
                          key={matching.id}
                          className="flex items-center justify-between border-b pb-3"
                        >
                          <div>
                            <p className="font-medium text-[#364C84]">
                              {matching.houseName}
                            </p>
                            <p className="text-sm text-gray-500">
                              신청자: {matching.careWorkerName} |{' '}
                              {matching.applicationDate}
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(matching.status)}`}
                          >
                            {matching.status}
                          </span>
                        </div>
                      ))}
                    {matchings.filter(
                      (m) => m.status === '신청' || m.status === '검토중',
                    ).length === 0 && (
                      <p className="text-gray-500 text-center py-4">
                        최근 매칭 신청이 없습니다.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveSection('matchings')}
                    className="mt-4 text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap"
                  >
                    모든 매칭 보기 <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    승인 대기 후기
                  </h3>
                  <div className="space-y-4">
                    {reviews
                      .filter((r) => r.status === '승인대기')
                      .slice(0, 3)
                      .map((review) => (
                        <div
                          key={review.id}
                          className="flex items-start justify-between border-b pb-3"
                        >
                          <div>
                            <div className="flex items-center">
                              <p className="font-medium text-[#364C84] mr-2">
                                {review.userName}
                              </p>
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {review.userRole}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 my-1">
                              {review.content.length > 50
                                ? review.content.substring(0, 50) + '...'
                                : review.content}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                              {renderStars(review.rating)}
                              <span className="ml-2">{review.date}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleApproveReview(review.id)}
                              className="text-green-600 hover:text-green-700 cursor-pointer whitespace-nowrap"
                            >
                              <i className="fas fa-check"></i>
                            </button>
                            <button
                              onClick={() => handleRejectReview(review.id)}
                              className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    {reviews.filter((r) => r.status === '승인대기').length ===
                      0 && (
                      <p className="text-gray-500 text-center py-4">
                        승인 대기 중인 후기가 없습니다.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setActiveSection('reviews')}
                    className="mt-4 text-[#364C84] font-medium flex items-center cursor-pointer whitespace-nowrap"
                  >
                    모든 후기 보기 <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 매칭 관리 */}
          {activeSection === 'matchings' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#364C84]">매칭 관리</h2>
                <button
                  onClick={() => openModal('create', 'matching')}
                  className="bg-[#364C84] hover:bg-[#2A3B68] text-white px-4 py-2 rounded-button flex items-center cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-plus mr-2"></i>새 매칭 등록
                </button>
              </div>

              {/* 필터 및 검색 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 상태</option>
                      <option value="pending">신청</option>
                      <option value="reviewing">검토중</option>
                      <option value="approved">승인</option>
                      <option value="rejected">거절</option>
                      <option value="completed">완료</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 기간</option>
                      <option value="today">오늘</option>
                      <option value="week">이번 주</option>
                      <option value="month">이번 달</option>
                      <option value="year">올해</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="매칭 검색..."
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* 매칭 목록 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          빈집
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          복지사
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          신청일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          계약기간
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {matchings.map((matching) => (
                        <tr key={matching.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {matching.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[#364C84]">
                              {matching.houseName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {matching.careWorkerName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(matching.status)}`}
                            >
                              {matching.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {matching.applicationDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {matching.contractStartDate
                              ? `${matching.contractStartDate} ~ ${matching.contractEndDate}`
                              : '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  openModal('view', 'matching', matching.id)
                                }
                                className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                onClick={() =>
                                  openModal('edit', 'matching', matching.id)
                                }
                                className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() =>
                                  openModal('delete', 'matching', matching.id)
                                }
                                className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {matchings.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">등록된 매칭이 없습니다.</p>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#364C84] text-white cursor-pointer whitespace-nowrap">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* 빈집 관리 */}
          {activeSection === 'houses' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#364C84]">빈집 관리</h2>
                <button
                  onClick={() => openModal('create', 'house')}
                  className="bg-[#364C84] hover:bg-[#2A3B68] text-white px-4 py-2 rounded-button flex items-center cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-plus mr-2"></i>새 빈집 등록
                </button>
              </div>

              {/* 필터 및 검색 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 상태</option>
                      <option value="waiting">매칭대기</option>
                      <option value="inProgress">매칭진행중</option>
                      <option value="completed">매칭완료</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 지역</option>
                      <option value="uiseong">의성읍</option>
                      <option value="other">기타 지역</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="빈집 검색..."
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* 빈집 목록 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {houses.map((house) => (
                  <div
                    key={house.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={house.image}
                        alt={house.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <span
                        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(house.status)}`}
                      >
                        {house.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#364C84] mb-2">
                        {house.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{house.address}</p>
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">
                          등록일: {house.registeredDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          면적: {house.size}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {house.facilities.slice(0, 3).map((facility, index) => (
                          <span
                            key={index}
                            className="bg-[#E7F1A8] text-[#364C84] text-sm px-3 py-1 rounded-full"
                          >
                            {facility}
                          </span>
                        ))}
                        {house.facilities.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
                            +{house.facilities.length - 3}
                          </span>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => openModal('view', 'house', house.id)}
                          className="text-[#364C84] hover:text-[#2A3B68] font-medium flex items-center cursor-pointer whitespace-nowrap"
                        >
                          <i className="fas fa-eye mr-2"></i>
                          상세보기
                        </button>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => openModal('edit', 'house', house.id)}
                            className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() =>
                              openModal('delete', 'house', house.id)
                            }
                            className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                          >
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {houses.length === 0 && (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <p className="text-gray-500">등록된 빈집이 없습니다.</p>
                </div>
              )}

              {/* 페이지네이션 */}
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#364C84] text-white cursor-pointer whitespace-nowrap">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* 후기 관리 */}
          {activeSection === 'reviews' && (
            <div className="space-y-6 animate-fade-in-up">
              <h2 className="text-2xl font-bold text-[#364C84]">후기 관리</h2>

              {/* 필터 및 검색 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 상태</option>
                      <option value="pending">승인대기</option>
                      <option value="approved">승인</option>
                      <option value="rejected">거절</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 사용자</option>
                      <option value="owner">빈집소유주</option>
                      <option value="care">복지사</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="후기 검색..."
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* 후기 목록 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          작성자
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          역할
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          내용
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          평점
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          작성일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {reviews.map((review) => (
                        <tr key={review.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {review.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {review.userName}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {review.userRole}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-900 max-w-xs truncate">
                              {review.content}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex text-yellow-400">
                              {renderStars(review.rating)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {review.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}
                            >
                              {review.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  openModal('view', 'review', review.id)
                                }
                                className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              {review.status === '승인대기' && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleApproveReview(review.id)
                                    }
                                    className="text-green-600 hover:text-green-700 cursor-pointer whitespace-nowrap"
                                  >
                                    <i className="fas fa-check"></i>
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleRejectReview(review.id)
                                    }
                                    className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                                  >
                                    <i className="fas fa-times"></i>
                                  </button>
                                </>
                              )}
                              <button
                                onClick={() =>
                                  openModal('delete', 'review', review.id)
                                }
                                className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {reviews.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">등록된 후기가 없습니다.</p>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#364C84] text-white cursor-pointer whitespace-nowrap">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* 공지사항/FAQ 관리 */}
          {activeSection === 'notices' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#364C84]">
                  공지사항/FAQ 관리
                </h2>
                <button
                  onClick={() => openModal('create', 'notice')}
                  className="bg-[#364C84] hover:bg-[#2A3B68] text-white px-4 py-2 rounded-button flex items-center cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-plus mr-2"></i>새 공지사항 등록
                </button>
              </div>

              {/* 탭 */}
              <div className="flex space-x-4 border-b border-gray-200">
                <button className="py-3 px-6 font-medium text-[#364C84] border-b-2 border-[#364C84] whitespace-nowrap">
                  공지사항
                </button>
                <button className="py-3 px-6 font-medium text-gray-500 hover:text-[#364C84] whitespace-nowrap">
                  FAQ
                </button>
              </div>

              {/* 필터 및 검색 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 공지</option>
                      <option value="important">중요 공지</option>
                      <option value="normal">일반 공지</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 기간</option>
                      <option value="week">1주일</option>
                      <option value="month">1개월</option>
                      <option value="quarter">3개월</option>
                      <option value="year">1년</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="공지사항 검색..."
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* 공지사항 목록 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          제목
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          작성일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          중요도
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          조회수
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {notices.map((notice) => (
                        <tr key={notice.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {notice.id}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              {notice.isImportant && (
                                <span className="mr-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                  중요
                                </span>
                              )}
                              <div className="text-sm font-medium text-gray-900">
                                {notice.title}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {notice.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {notice.isImportant ? (
                              <span className="text-red-600">
                                <i className="fas fa-exclamation-circle"></i>{' '}
                                중요
                              </span>
                            ) : (
                              <span className="text-gray-500">일반</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {notice.viewCount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  openModal('view', 'notice', notice.id)
                                }
                                className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                onClick={() =>
                                  openModal('edit', 'notice', notice.id)
                                }
                                className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              <button
                                onClick={() =>
                                  openModal('delete', 'notice', notice.id)
                                }
                                className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {notices.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">등록된 공지사항이 없습니다.</p>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#364C84] text-white cursor-pointer whitespace-nowrap">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          )}

          {/* 사용자 관리 */}
          {activeSection === 'users' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-[#364C84]">
                  사용자 관리
                </h2>
                <button
                  onClick={() => openModal('create', 'user')}
                  className="bg-[#364C84] hover:bg-[#2A3B68] text-white px-4 py-2 rounded-button flex items-center cursor-pointer whitespace-nowrap"
                >
                  <i className="fas fa-plus mr-2"></i>새 관리자 등록
                </button>
              </div>

              {/* 필터 및 검색 */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 역할</option>
                      <option value="admin">관리자</option>
                      <option value="owner">빈집소유주</option>
                      <option value="care">복지사</option>
                    </select>
                    <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]">
                      <option value="all">모든 상태</option>
                      <option value="active">활성</option>
                      <option value="inactive">비활성</option>
                    </select>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="사용자 검색..."
                      className="w-full md:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#364C84]"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                  </div>
                </div>
              </div>

              {/* 사용자 목록 */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          이름
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          이메일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          역할
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          가입일
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          최근 로그인
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          관리
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-[#E7F1A8] rounded-full flex items-center justify-center text-[#364C84] font-bold mr-3">
                                {user.name.charAt(0)}
                              </div>
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.role === '관리자'
                                  ? 'bg-purple-100 text-purple-800'
                                  : user.role === '빈집소유주'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-green-100 text-green-800'
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.status === '활성'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                            >
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.registeredDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.lastLogin}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  openModal('view', 'user', user.id)
                                }
                                className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-eye"></i>
                              </button>
                              <button
                                onClick={() =>
                                  openModal('edit', 'user', user.id)
                                }
                                className="text-[#364C84] hover:text-[#2A3B68] cursor-pointer whitespace-nowrap"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                              {user.role !== '관리자' && (
                                <button
                                  onClick={() =>
                                    openModal('delete', 'user', user.id)
                                  }
                                  className="text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
                                >
                                  <i className="fas fa-trash-alt"></i>
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {users.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">등록된 사용자가 없습니다.</p>
                  </div>
                )}
              </div>

              {/* 페이지네이션 */}
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-left"></i>
                  </button>
                  <button className="px-3 py-1 rounded-lg bg-[#364C84] text-white cursor-pointer whitespace-nowrap">
                    1
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    2
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    3
                  </button>
                  <button className="px-3 py-1 rounded-lg border border-gray-300 text-gray-500 hover:bg-gray-50 cursor-pointer whitespace-nowrap">
                    <i className="fas fa-chevron-right"></i>
                  </button>
                </nav>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 삭제 확인 모달 */}
      {showModal && modalType === 'delete' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-[#364C84] mb-4">
              삭제 확인
            </h3>
            <p className="text-gray-600 mb-6">
              {modalTarget === 'matching' &&
                '이 매칭을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}
              {modalTarget === 'house' &&
                '이 빈집을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}
              {modalTarget === 'user' &&
                '이 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}
              {modalTarget === 'review' &&
                '이 후기를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}
              {modalTarget === 'notice' &&
                '이 공지사항을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.'}
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-700 font-medium cursor-pointer whitespace-nowrap"
              >
                취소
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-button cursor-pointer whitespace-nowrap"
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Message */}
      {showToast && (
        <div
          className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-up ${
            toastType === 'success'
              ? 'bg-green-500 text-white'
              : toastType === 'error'
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 text-white'
          }`}
        >
          <div className="flex items-center">
            <i
              className={`${
                toastType === 'success'
                  ? 'fas fa-check-circle'
                  : toastType === 'error'
                    ? 'fas fa-exclamation-circle'
                    : 'fas fa-info-circle'
              } mr-2`}
            ></i>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
