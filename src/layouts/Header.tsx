import React from 'react';
import LoginButton from '../components/LoginButton/LoginButton';
import SignupButton from '../components/SignUpButton/SignUpButton';
import './Header.css';

export default function Header() {
  return (
    <header className="main-header">
      <div className="header-inner">
        {/* 로고 (나중에 이미지로 교체 가능) */}
        <a href="./">
          <div className="header-logo">의성프로젝트</div>
        </a>
        {/* 네비게이션: 주제가 정해지면 메뉴 추가 */}
        {/* <nav className="header-nav">
          <a href="/" className="nav-link active">홈</a>
          <a href="/about" className="nav-link">소개</a>
        </nav> */}
        <div className="header-cta">
          <LoginButton />
          <SignupButton />
        </div>
      </div>
    </header>
  );
}
