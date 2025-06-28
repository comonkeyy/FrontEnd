// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from 'react';
import axiosInstance from '@/api/axiosInstance';

interface Review {
  id: number;
  author_id: number;
  content: string;
  created_at?: string;
}

const Review: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newContent, setNewContent] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [loading, setLoading] = useState(false);

  // 실제 로그인된 유저의 id를 받아와야 합니다. (예시로 1로 고정)
  const author_id = 1;

  // 리뷰 목록 조회
  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/reviews');
      setReviews(res.data.data || res.data);
    } catch {
      alert('리뷰 목록 조회 실패');
    }
    setLoading(false);
  };

  // 리뷰 상세 조회 (수정 버튼 클릭 시)
  const fetchReviewDetail = async (id: number) => {
    try {
      const res = await axiosInstance.get(`/reviews/${id}`);
      const review = res.data.data;
      setEditingContent(review.content);
    } catch {
      alert('리뷰 상세 조회 실패');
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // 리뷰 등록
  const handleCreateReview = async () => {
    if (!newContent.trim()) {
      alert('내용을 입력하세요.');
      return;
    }
    try {
      await axiosInstance.post('/reviews', {
        author_id,
        content: newContent,
      });
      setNewContent('');
      setIsCreating(false);
      fetchReviews();
    } catch {
      alert('리뷰 등록 실패');
    }
  };

  // 리뷰 수정 시작
  const handleEditClick = async (id: number) => {
    setEditingId(id);
    await fetchReviewDetail(id);
  };

  // 리뷰 수정 저장
  const handleSaveEdit = async (id: number) => {
    if (!editingContent.trim()) {
      alert('내용을 입력하세요.');
      return;
    }
    try {
      await axiosInstance.patch(`/reviews/${id}`, {
        content: editingContent,
      });
      setEditingId(null);
      setEditingContent('');
      fetchReviews();
    } catch {
      alert('리뷰 수정 실패');
    }
  };

  // 리뷰 삭제
  const handleDelete = async (id: number) => {
    if (!window.confirm('정말로 이 리뷰를 삭제하시겠습니까?')) return;
    try {
      await axiosInstance.delete(`/reviews/${id}`);
      fetchReviews();
    } catch {
      alert('리뷰 삭제 실패');
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDF5] p-6">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-[#364C84] mb-6">복지사 리뷰</h2>
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <button
            onClick={() => setIsCreating((v) => !v)}
            className="px-4 py-2 bg-[#95B1EE] text-[#364C84] rounded-lg hover:bg-opacity-90 transition-colors duration-200 mb-4"
          >
            {isCreating ? '작성 취소' : '리뷰 작성하기'}
          </button>
          {isCreating && (
            <div className="mb-4">
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#95B1EE] mb-2"
                placeholder="리뷰 내용을 입력하세요"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleCreateReview}
                  className="px-4 py-2 bg-[#364C84] text-white rounded-lg hover:bg-[#2A3B68] transition-colors duration-200"
                >
                  등록
                </button>
              </div>
            </div>
          )}
          <hr className="my-4" />
          {loading ? (
            <div className="text-center text-gray-400">로딩 중...</div>
          ) : reviews.length === 0 ? (
            <div className="text-center text-gray-400">
              아직 등록된 리뷰가 없습니다.
            </div>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="border-b pb-4">
                  <div className="flex items-center mb-1 justify-between">
                    <span className="font-semibold text-[#364C84] mr-2">
                      작성자 ID{review.author_id}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditClick(review.id)}
                        className="text-xs text-blue-600 hover:underline"
                      >
                        수정
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className="text-xs text-red-500 hover:underline"
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                  {editingId === review.id ? (
                    <div>
                      <textarea
                        value={editingContent}
                        onChange={(e) => setEditingContent(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(review.id)}
                          className="px-3 py-1 bg-[#364C84] text-white rounded hover:bg-[#2A3B68] text-xs"
                        >
                          저장
                        </button>
                        <button
                          onClick={() => {
                            setEditingId(null);
                            setEditingContent('');
                          }}
                          className="px-3 py-1 border border-gray-300 rounded text-xs"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-gray-700">{review.content}</div>
                  )}
                  {review.created_at && (
                    <div className="text-xs text-gray-400 mt-1">
                      {new Date(review.created_at).toLocaleString()}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
