import React, { useRef, useState } from 'react';
import './SignUpPage.css';

function AddressInput() {
  const addressRef = useRef<HTMLInputElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const popupWrapRef = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    setModalOpen(true);

    setTimeout(() => {
      if (!popupWrapRef.current) return;
      // @ts-ignore
      new window.daum.Postcode({
        oncomplete: function (data: any) {
          if (addressRef.current) {
            addressRef.current.value = data.roadAddress;
          }
          setModalOpen(false);
        },
        onclose: function () {
          setModalOpen(false);
        },
        width: '100%',
        height: '100%',
      }).embed(popupWrapRef.current);
    }, 0);
  };

  return (
    <>
      <input
        id="address"
        ref={addressRef}
        type="text"
        placeholder="집 주소"
        onClick={handleClick}
        readOnly
        style={{ cursor: 'pointer' }}
      />
      {/* 모달 */}
      {modalOpen && (
        <>
          {/* 백드롭 */}
          <div className="modal-backdrop" onClick={() => setModalOpen(false)} />
          {/* 모달창 */}
          <div className="modal-address">
            <div ref={popupWrapRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </>
      )}
    </>
  );
}

export default function SignUpPage() {
  return (
    <div className="signup-page">
      <div className="signup-container">
        <section className="signup-info">
          <h1>회원가입</h1>
          <p>회원가입 페이지</p>
          <ul>
            <li>🏡 나에게 딱 맞는 빈집 정보 제공</li>
            <li>🤝 안전하고 신뢰할 수 있는 매칭 시스템</li>
            <li>📝 간편한 온라인 계약 및 관리 지원</li>
            <li>🛠 리모델링/정비 지원 정보 제공</li>
            <li>💬 전문가와 함께하는 분쟁 조정 서비스</li>
          </ul>
        </section>
        <form className="signup-form">
          <div className="signup-grid">
            <div className="signup-form-group">
              <label htmlFor="name">이름</label>
              <input id="name" type="text" placeholder="이름" />
            </div>
            <div className="signup-form-group">
              <label htmlFor="phone">휴대폰 번호</label>
              <input id="phone" type="text" placeholder="휴대폰 번호" />
            </div>
            <div className="signup-form-group">
              <label htmlFor="address">집 주소</label>
              <AddressInput />
            </div>
            <div className="signup-form-group">
              <label htmlFor="address2">상세 주소</label>
              <input id="address2" type="text" placeholder="상세 주소" />
            </div>
            <div className="signup-form-group full">
              <label htmlFor="userid">아이디</label>
              <input id="userid" type="text" placeholder="아이디" />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password">비밀번호</label>
              <input id="password" type="password" placeholder="비밀번호" />
            </div>
            <div className="signup-form-group">
              <label htmlFor="password2">비밀번호 확인</label>
              <input
                id="password2"
                type="password"
                placeholder="비밀번호 확인"
              />
            </div>
            <div className="signup-form-group full">
              <label htmlFor="email">이메일</label>
              <input id="email" type="email" placeholder="이메일" />
            </div>
            <div className="signup-form-group"></div>
          </div>
          <button type="submit" className="signup-btn">
            작성 완료 및 저장하기
          </button>
        </form>
      </div>
    </div>
  );
}
