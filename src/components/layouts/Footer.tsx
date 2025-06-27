import React from 'react';

const Footer: React.FC = () => (
  <footer className="bg-[#364C84] text-white py-12">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">의성 빈집-복지사 매칭</h3>
          <p className="mb-4">
            빈집과 복지사를 연결하는 지역 기반 플랫폼입니다.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-[#E7F1A8] cursor-pointer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-[#E7F1A8] cursor-pointer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-[#E7F1A8] cursor-pointer"
            >
              <i className="fab fa-youtube"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-[#E7F1A8] cursor-pointer"
            >
              <i className="fab fa-kakao"></i>
            </a>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">서비스</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                빈집 등록
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                복지사 매칭
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                리모델링 지원
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                커뮤니티
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">고객지원</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                자주 묻는 질문
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                이용 가이드
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                문의하기
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#E7F1A8] cursor-pointer">
                공지사항
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-4">연락처</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <i className="fas fa-map-marker-alt mr-2"></i> 경상북도 의성군
              의성읍
            </li>
            <li className="flex items-center">
              <i className="fas fa-phone mr-2"></i> 054-123-4567
            </li>
            <li className="flex items-center">
              <i className="fas fa-envelope mr-2"></i> info@uiseong-match.kr
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-600 mt-8 pt-8 text-center text-sm">
        <p>&copy; 2025 의성 빈집-복지사 매칭 플랫폼. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
