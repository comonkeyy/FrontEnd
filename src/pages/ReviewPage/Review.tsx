// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';
const Review: React.FC = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      houseTitle: '안계면 한옥 빈집',
      rating: 5,
      content:
        '10년간 방치되었던 한옥 빈집이 저의 새로운 보금자리로 재탄생했습니다. 시·군의 리모델링 지원으로 전통과 현대가 어우러진 주거 공간이 되었습니다. 주변 환경도 조용하고 이웃들도 친절해서 만족스럽습니다.',
      date: '2025-05-15',
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20renovated%20traditional%20Korean%20house%20with%20modern%20amenities%2C%20showing%20a%20transformation%20from%20abandoned%20to%20livable%20space.%20The%20image%20depicts%20a%20well-maintained%20exterior%20with%20traditional%20architectural%20elements%20and%20a%20garden%2C%20presented%20against%20a%20neutral%20background&width=400&height=300&seq=case1&orientation=landscape',
    },
    {
      id: 2,
      houseTitle: '단밀면 아파트',
      rating: 4.5,
      content:
        '서울에서 의성으로 이주하여 단밀면의 빈 아파트와 매칭되었습니다. 지역 어르신들을 위한 방문 복지 서비스를 제공하며 안정적으로 정착했습니다. 교통이 조금 불편하지만 전반적으로 만족합니다.',
      date: '2025-04-22',
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20modern%20apartment%20interior%20designed%20for%20a%20social%20worker%2C%20showing%20a%20comfortable%20living%20space%20with%20functional%20areas%20for%20work%20and%20relaxation.%20The%20image%20depicts%20a%20bright%2C%20clean%20environment%20with%20simple%20furnishings%20and%20personal%20touches%2C%20presented%20against%20a%20neutral%20background&width=400&height=300&seq=case2&orientation=landscape',
    },
    {
      id: 3,
      houseTitle: '의성읍 단독주택',
      rating: 4,
      content:
        '의성읍 중심가에 위치한 단독주택으로 매칭되어 편리한 생활을 하고 있습니다. 주변 편의시설이 가까워 생활하기 좋습니다. 다만 겨울철 난방비가 조금 부담스러운 점이 아쉽습니다.',
      date: '2025-03-10',
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20cozy%20single%20house%20in%20a%20small%20town%20center%20with%20convenient%20access%20to%20facilities%2C%20showing%20a%20comfortable%20living%20environment%20with%20a%20small%20garden.%20The%20image%20depicts%20a%20well-maintained%20house%20with%20modern%20amenities%20in%20a%20peaceful%20neighborhood%20setting%20against%20a%20neutral%20background&width=400&height=300&seq=case3&orientation=landscape',
    },
  ]);
  const [editingReview, setEditingReview] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newReview, setNewReview] = useState({
    houseTitle: '',
    rating: 5,
    content: '',
    date: new Date().toISOString().split('T')[0],
    imageUrl:
      'https://readdy.ai/api/search-image?query=A%20modern%20comfortable%20house%20interior%20with%20natural%20lighting%2C%20showing%20a%20well-designed%20living%20space%20with%20clean%20lines%20and%20minimal%20decoration%2C%20perfect%20for%20a%20social%20worker%20residence%2C%20presented%20against%20a%20neutral%20background&width=400&height=300&seq=new1&orientation=landscape',
  });
  const handleCreateReview = () => {
    const newId = Math.max(...reviews.map((r) => r.id)) + 1;
    setReviews([...reviews, { ...newReview, id: newId }]);
    setIsCreating(false);
    setNewReview({
      houseTitle: '',
      rating: 5,
      content: '',
      date: new Date().toISOString().split('T')[0],
      imageUrl:
        'https://readdy.ai/api/search-image?query=A%20modern%20comfortable%20house%20interior%20with%20natural%20lighting%2C%20showing%20a%20well-designed%20living%20space%20with%20clean%20lines%20and%20minimal%20decoration%2C%20perfect%20for%20a%20social%20worker%20residence%2C%20presented%20against%20a%20neutral%20background&width=400&height=300&seq=new1&orientation=landscape',
    });
  };
  const handleEditReview = (review: any) => {
    setEditingReview({ ...review });
    setIsEditing(true);
  };
  const handleDeleteReview = (id: number) => {
    if (window.confirm('정말로 이 후기를 삭제하시겠습니까?')) {
      setReviews(reviews.filter((review) => review.id !== id));
    }
  };
  const handleSaveReview = () => {
    if (editingReview) {
      setReviews(
        reviews.map((review) =>
          review.id === editingReview.id ? editingReview : review,
        ),
      );
      setIsEditing(false);
      setEditingReview(null);
    }
  };
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingReview(null);
  };
  const handleRatingChange = (newRating: number) => {
    if (editingReview) {
      setEditingReview({ ...editingReview, rating: newRating });
    }
  };
  return (
    <div className="min-h-screen bg-[#FFFDF5] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-[#364C84]">매칭 후기</h2>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-[#95B1EE] text-[#364C84] rounded-lg hover:bg-opacity-90 transition-colors duration-200 flex items-center !rounded-button cursor-pointer whitespace-nowrap"
            >
              <i className="fas fa-plus mr-2"></i>
              후기 작성하기
            </button>
          </div>
          {isCreating ? (
            <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-[#364C84] mb-4">
                새 후기 작성
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  매칭 주택
                </label>
                <input
                  type="text"
                  value={newReview.houseTitle}
                  onChange={(e) =>
                    setNewReview({ ...newReview, houseTitle: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE]"
                  placeholder="매칭된 주택의 이름을 입력하세요"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  평점
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className="text-2xl focus:outline-none cursor-pointer"
                    >
                      <i
                        className={`${star <= newReview.rating ? 'fas' : 'far'} fa-star ${star <= newReview.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      ></i>
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {newReview.rating}/5
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  후기 내용
                </label>
                <textarea
                  value={newReview.content}
                  onChange={(e) =>
                    setNewReview({ ...newReview, content: e.target.value })
                  }
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE]"
                  placeholder="매칭 경험에 대한 후기를 작성해주세요"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 !rounded-button cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  onClick={handleCreateReview}
                  className="px-4 py-2 bg-[#95B1EE] text-[#364C84] rounded-lg hover:bg-opacity-90 transition-colors duration-200 !rounded-button cursor-pointer whitespace-nowrap"
                >
                  작성완료
                </button>
              </div>
            </div>
          ) : null}
          {isEditing ? (
            <div className="bg-[#F8F9FA] rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-[#364C84] mb-4">
                후기 수정
              </h3>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  매칭 주택
                </label>
                <input
                  type="text"
                  value={editingReview?.houseTitle || ''}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      houseTitle: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE]"
                  disabled
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  평점
                </label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className="text-2xl focus:outline-none cursor-pointer"
                    >
                      <i
                        className={`${star <= editingReview?.rating ? 'fas' : 'far'} fa-star ${star <= editingReview?.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      ></i>
                    </button>
                  ))}
                  <span className="ml-2 text-gray-600">
                    {editingReview?.rating}/5
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  후기 내용
                </label>
                <textarea
                  value={editingReview?.content || ''}
                  onChange={(e) =>
                    setEditingReview({
                      ...editingReview,
                      content: e.target.value,
                    })
                  }
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE]"
                ></textarea>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors duration-200 !rounded-button cursor-pointer whitespace-nowrap"
                >
                  취소
                </button>
                <button
                  onClick={handleSaveReview}
                  className="px-4 py-2 bg-[#95B1EE] text-[#364C84] rounded-lg hover:bg-opacity-90 transition-colors duration-200 !rounded-button cursor-pointer whitespace-nowrap"
                >
                  저장하기
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-[#364C84]">
                        {review.houseTitle}
                      </h3>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditReview(review)}
                          className="text-gray-500 hover:text-[#364C84] transition-colors duration-200 cursor-pointer"
                        >
                          <i className="fas fa-edit"></i>
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-gray-500 hover:text-red-500 transition-colors duration-200 cursor-pointer"
                        >
                          <i className="fas fa-trash-alt"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center mb-3">
                      <div className="flex items-center text-yellow-500 mr-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i
                            key={star}
                            className={`${star <= Math.floor(review.rating) ? 'fas fa-star' : star <= review.rating ? 'fas fa-star-half-alt' : 'far fa-star'}`}
                          ></i>
                        ))}
                      </div>
                      <span className="text-gray-600">{review.rating}/5.0</span>
                    </div>
                    <p className="text-gray-700 mb-4">{review.content}</p>
                    <div className="flex justify-end text-sm text-gray-500">
                      <span className="bg-[#E7F1A8] text-[#364C84] px-3 py-1 rounded-full">
                        게시됨
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-xl font-bold text-[#364C84] mb-4">
            후기 작성 가이드
          </h3>
          <div className="bg-[#F8F9FA] rounded-lg p-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>
                  실제 거주 경험을 바탕으로 솔직한 후기를 작성해 주세요.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>
                  주택의 장점과 단점을 균형 있게 서술하면 다른 복지사들에게
                  도움이 됩니다.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>
                  개인정보 보호를 위해 연락처 등의 개인정보는 포함하지 마세요.
                </span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                <span>
                  부적절한 내용(비방, 욕설 등)이 포함된 후기는 관리자에 의해
                  삭제될 수 있습니다.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Review;
