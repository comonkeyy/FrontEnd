import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import LogInButton from '../LoginButton/LoginButton';
import SignupButton from '../SignUpButton/SignUpButton';

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
        <nav className="hidden md:flex items-center ml-auto">
          <nav className="space-x-6">
            {userRole === 'owner' && (
              <>
                <Link
                  to="/owner/register"
                  className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
                >
                  빈집 등록
                </Link>
                <Link
                  to="/owner/watinglist"
                  className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
                >
                  매칭 대기중인 빈집
                </Link>
                <Link
                  to="/owner/matchedlist"
                  className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
                >
                  매칭 완료된 빈집
                </Link>
                <Link
                  to="/owner/mypage"
                  className="bg-[#95B1EE] hover:bg-[#E7F1A8] text-[#364C84] px-4 py-2 rounded-button font-bold ml-4 transition-colors whitespace-nowrap"
                >
                  마이페이지
                </Link>
              </>
            )}
            {userRole === 'worker' && (
              <>
                <Link
                  to="/worker/match"
                  className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
                >
                  복지사 매칭
                </Link>
                <Link
                  to="/worker/review"
                  className="hover:text-[#E7F1A8] transition-colors whitespace-nowrap"
                >
                  리뷰
                </Link>
                <Link
                  to="/worker/mypage"
                  className="bg-[#95B1EE] hover:bg-[#E7F1A8] text-[#364C84] px-4 py-2 rounded-button font-bold ml-4 transition-colors whitespace-nowrap"
                >
                  마이페이지
                </Link>
              </>
            )}
          </nav>

          {userRole === 'guest' && (
            <>
              <LogInButton />
              <SignupButton />
            </>
          )}
        </nav>

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
            {userRole === 'owner' && (
              <>
                <Link
                  to="/owner/register"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  빈집 등록
                </Link>
                <Link
                  to="/owner/watinglist"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  매칭 대기중인 빈집
                </Link>
                <Link
                  to="/owner/matchedlist"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  매칭 완료된 빈집
                </Link>
                <Link
                  to="/owner/mypage"
                  className="bg-[#95B1EE] hover:bg-[#E7F1A8] text-[#364C84] px-4 py-2 rounded-button font-bold transition-colors text-center"
                >
                  마이페이지
                </Link>
              </>
            )}
            {userRole === 'worker' && (
              <>
                <Link
                  to="/worker/match"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  복지사 매칭
                </Link>
                <Link
                  to="/worker/review"
                  className="text-white hover:text-[#E7F1A8] transition-colors"
                >
                  리뷰
                </Link>
                <Link
                  to="/worker/mypage"
                  className="bg-[#95B1EE] hover:bg-[#E7F1A8] text-[#364C84] px-4 py-2 rounded-button font-bold transition-colors text-center"
                >
                  마이페이지
                </Link>
              </>
            )}
            {userRole === 'guest' && (
              <>
                <Link
                  to="/login"
                  className="bg-[#95B1EE] hover:bg-[#E7F1A8] text-[#364C84] px-4 py-2 rounded-button font-bold transition-colors text-center"
                >
                  로그인
                </Link>
                <Link
                  to="/signup"
                  className="bg-[#E7F1A8] hover:bg-[#95B1EE] text-[#364C84] px-4 py-2 rounded-button font-bold ml-0 transition-colors text-center"
                >
                  회원가입
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
