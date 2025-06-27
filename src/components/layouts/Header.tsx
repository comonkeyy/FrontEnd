import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogInButton from '../LoginButton/LoginButton';
import SignupButton from '../SignUpButton/SignUpButton';
import logo from '../../assets/logo.png';

type HeaderProps = {
  userRole: 'owner' | 'worker' | 'guest';
};

const Header: React.FC<HeaderProps> = ({ userRole }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-[#364C84] text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <Link to="/">
            <img
              src={logo}
              alt="의성희망둥지 로고"
              className="h-auto w-16 md:w-48 mr-2 transition-transform duration-200 hover:scale-110"
              style={{ objectFit: 'contain' }}
            />
          </Link>
        </div>

        {/* 데스크탑 메뉴 */}
        {userRole === 'guest' ? (
          <nav className="hidden md:flex items-center space-x-4 ml-auto">
            <LogInButton />
            <SignupButton />
          </nav>
        ) : (
          <nav className="hidden md:flex items-center space-x-4 ml-auto">
            <a
              href="#"
              className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
            >
              빈집 등록/조회
            </a>
            <a
              href="#"
              className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
            >
              복지사 매칭
            </a>
            <a
              href="#"
              className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
            >
              리뷰
            </a>
            <div className="relative group">
              <button className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap flex items-center">
                더보기 <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-[#364C84] hover:bg-[#E7F1A8]/20"
                >
                  자주 묻는 질문
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#364C84] hover:bg-[#E7F1A8]/20"
                >
                  분쟁 조정
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#364C84] hover:bg-[#E7F1A8]/20"
                >
                  복지사 커뮤니티
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-[#364C84] hover:bg-[#E7F1A8]/20"
                >
                  리모델링 지원
                </a>
              </div>
            </div>
            <LogInButton />
            <SignupButton />
          </nav>
        )}

        {/* 모바일 메뉴 버튼 */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white cursor-pointer whitespace-nowrap"
          >
            <i
              className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}
            />
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#364C84] py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            {userRole !== 'guest' && (
              <>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  빈집 등록/조회
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  복지사 매칭
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  리뷰
                </a>
                <div className="border-t border-gray-600 my-2"></div>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  자주 묻는 질문
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  분쟁 조정
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  복지사 커뮤니티
                </a>
                <a
                  href="#"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  리모델링 지원
                </a>
                <div className="border-t border-gray-600 my-2"></div>
              </>
            )}
            <LogInButton />
            <SignupButton />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
