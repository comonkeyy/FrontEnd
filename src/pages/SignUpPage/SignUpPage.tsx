import GeminiVoiceChatButton from '@/components/GeminiVoiceChatButton';
import React, { useState, useRef } from 'react';

// 역할 선택 모달
function RoleSelectModal({
  isOpen,
  onSelect,
}: {
  isOpen: boolean;
  onSelect: (role: 'owner' | 'worker') => void;
}) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md">
      <div className="bg-[#FFFDF5] rounded-2xl shadow-2xl p-12 min-w-[420px] min-h-[320px] flex flex-col items-center">
        <h2 className="text-3xl font-bold text-[#364C84] mb-10">
          회원가입 유형 선택
        </h2>
        <button
          className="w-full mb-6 py-5 rounded-lg bg-[#4CAF50] text-white font-bold text-xl transition-colors hover:bg-[#388E3C] shadow"
          onClick={() => onSelect('owner')}
        >
          집 소유자로 회원가입하기
        </button>
        <button
          className="w-full py-5 rounded-lg bg-[#364C84] text-white font-bold text-xl transition-colors hover:bg-[#2A3B68] shadow"
          onClick={() => onSelect('worker')}
        >
          복지사로 회원가입하기
        </button>
      </div>
    </div>
  );
}

// 주소 입력 모달
function AddressInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
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
          onChange(data.roadAddress);
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
        value={value}
        onClick={handleClick}
        readOnly
        style={{ cursor: 'pointer' }}
        className="h-11 border-[1.5px] border-[#95B1EE] rounded-lg px-4 text-base bg-[#FFFDF5] text-[#364C84] transition-colors focus:border-[#364C84] outline-none font-bold"
      />
      {modalOpen && (
        <>
          <div className="modal-backdrop" onClick={() => setModalOpen(false)} />
          <div className="modal-address">
            <div ref={popupWrapRef} style={{ width: '100%', height: '100%' }} />
          </div>
        </>
      )}
    </>
  );
}

export default function SignUpPage() {
  const [role, setRole] = useState<'owner' | 'worker' | ''>('');
  const [roleModalOpen, setRoleModalOpen] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const passwordError = password && password2 && password !== password2;

  const isFormValid =
    !!role &&
    !!name &&
    !!phone &&
    !!userid &&
    !!password &&
    !!password2 &&
    !!email &&
    (role === 'owner' ? !!address : true) &&
    !passwordError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    if (!window.confirm('정말로 가입하겠습니까?')) return;

    // --- 더미 데이터 사용 부분 시작 ---
    try {
      // 2초 지연을 시뮬레이션하여 실제 네트워크 요청처럼 보이게 함
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 가상의 성공 응답
      const mockResponse = {
        success: true,
        message: '회원가입이 성공적으로 완료되었습니다.',
      };
      // 가상의 실패 응답 (주석 처리하고 싶을 때 활성화)
      // const mockResponse = { success: false, message: '더미 데이터: 이미 존재하는 아이디입니다.' };

      if (mockResponse.success) {
        alert(
          `${role === 'owner' ? '집 소유자' : '복지사'}로 회원가입 완료! (더미 데이터)`,
        );
        localStorage.setItem('userRole', role); // 로컬 스토리지에 역할 저장
        if (role === 'owner') {
          window.location.href = '/owner/mypage';
        } else {
          window.location.href = '/worker/main';
        }
      } else {
        alert(`회원가입 실패: ${mockResponse.message}`);
      }
    } catch (error) {
      console.error('더미 데이터 처리 오류:', error);
      alert('더미 데이터 처리 중 오류가 발생했습니다.');
    }
    // --- 더미 데이터 사용 부분 끝 ---

    // 실제 백엔드 연동 시 위의 더미 데이터 관련 코드를 제거하고 아래 주석을 해제하세요.
    /*
    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          user_id: userid,
          password,
          email,
          role: role === 'owner' ? 'owner' : 'worker',
          address: role === 'owner' ? address : undefined,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(`${role === 'owner' ? '집 소유자' : '복지사'}로 회원가입 완료!`);
        localStorage.setItem('userRole', role);
        if (role === 'owner') {
          window.location.href = '/owner/mypage';
        } else {
          window.location.href = '/worker/main';
        }
      } else {
        alert(`회원가입 실패: ${result.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      alert('회원가입 중 네트워크 오류가 발생했습니다.');
    }
    */
  };

  const infoTitle =
    role === 'owner'
      ? '집 소유자로 회원가입'
      : role === 'worker'
        ? '복지사로 회원가입'
        : '';
  const infoList =
    role === 'owner'
      ? [
          '🏡 빈집을 쉽고 빠르게 등록할 수 있습니다.',
          '🔍 등록된 빈집의 관리 현황을 한눈에 확인할 수 있습니다.',
          '🤝 복지사와의 매칭 및 입주 과정을 간편하게 관리할 수 있습니다.',
          '🛠 리모델링·정비 지원 및 각종 행정 안내를 받을 수 있습니다.',
          '📊 내 빈집의 통계와 피드백을 확인할 수 있습니다.',
        ]
      : [
          '🏠 다양한 빈집 정보를 한눈에 확인할 수 있습니다.',
          '🤝 집주인과 안전하고 신뢰할 수 있는 매칭 시스템 제공',
          '📝 간편한 온라인 입주 신청 및 관리 지원',
          '🛠 리모델링/정비 지원 정보 제공',
          '💬 전문가와 함께하는 분쟁 조정 서비스',
        ];

  return (
    <div className="signup-page flex min-h-screen items-center justify-center bg-[#FFFDF5]">
      <RoleSelectModal
        isOpen={roleModalOpen}
        onSelect={(selectedRole) => {
          setRole(selectedRole);
          setRoleModalOpen(false);
        }}
      />
      <div className="signup-container flex gap-14 bg-[#FFFDF5] rounded-[18px] shadow-lg border-2 border-[#95B1EE] px-14 py-12 my-10">
        <section className="signup-info min-w-[320px] flex flex-col justify-center text-[#364C84]">
          {role && (
            <div className="text-3xl font-extrabold mb-4 text-[#364C84]">
              {infoTitle}
            </div>
          )}
          <ul className="mt-6 space-y-3 text-base">
            {infoList.map((txt, i) => (
              <li className="font-bold" key={i}>
                {txt}
              </li>
            ))}
          </ul>
        </section>
        <form
          className="signup-form bg-[#FFFDF5] px-8 py-6 max-w-[540px] border-l-[1.5px] border-[#95B1EE33] flex flex-col gap-6 w-full"
          onSubmit={handleSubmit}
        >
          <div className="signup-grid grid grid-cols-2 gap-x-6 gap-y-4">
            <div className="signup-form-group flex flex-col gap-2">
              <label htmlFor="name" className="font-bold text-[#364C84]">
                이름
              </label>
              <input
                id="name"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 border-[1.5px] border-[#95B1EE] rounded-lg px-4 text-base bg-[#FFFDF5] text-[#364C84] transition-colors focus:border-[#364C84] outline-none font-bold"
              />
            </div>
            <div className="signup-form-group flex flex-col gap-2">
              <label htmlFor="phone" className="font-bold text-[#364C84]">
                휴대폰 번호
              </label>
              <input
                id="phone"
                type="text"
                placeholder="휴대폰 번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 border-[1.5px] border-[#95B1EE] rounded-lg px-4 text-base bg-[#FFFDF5] text-[#364C84] transition-colors focus:border-[#364C84] outline-none font-bold"
              />
            </div>
            {role === 'owner' && (
              <div className="signup-form-group full flex flex-col gap-2 col-span-2">
                <label htmlFor="address" className="font-bold text-[#364C84]">
                  집 주소
                </label>
                <AddressInput value={address} onChange={setAddress} />
              </div>
            )}
            <div className="signup-form-group full flex flex-col gap-2 col-span-2">
              <label htmlFor="userid" className="font-bold text-[#364C84]">
                아이디
              </label>
              <input
                id="userid"
                type="text"
                placeholder="아이디"
                value={userid}
                onChange={(e) => setUserid(e.target.value)}
                className="h-11 border-[1.5px] border-[#95B1EE] rounded-lg px-4 text-base bg-[#FFFDF5] text-[#364C84] transition-colors focus:border-[#364C84] outline-none font-bold"
              />
            </div>
            <div className="signup-form-group flex flex-col gap-2">
              <label htmlFor="password" className="font-bold text-[#364C84]">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11 border-[1.5px] border-[#95B1EE] rounded-lg px-4 text-base bg-[#FFFDF5] text-[#364C84] transition-colors focus:border-[#364C84] outline-none font-bold"
              />
            </div>
            <div className="signup-form-group flex flex-col gap-2">
              <label htmlFor="password2" className="font-bold text-[#364C84]">
                비밀번호 확인
              </label>
              <input
                id="password2"
                type="password"
                placeholder="비밀번호 확인"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                className="h-11 border-[1.5px] border-[#95B1EE] rounded-lg px-4 text-base bg-[#FFFDF5] text-[#364C84] transition-colors focus:border-[#364C84] outline-none font-bold"
              />
              {passwordError && (
                <span className="text-red-500 text-sm font-semibold mt-1">
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </div>
            <div className="signup-form-group full flex flex-col gap-2 col-span-2">
              <label htmlFor="email" className="font-bold text-[#364C84]">
                이메일
              </label>
              <input
                id="email"
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-[1.5px] border-[#95B1EE] rounded-lg px-4 text-base bg-[#FFFDF5] text-[#364C84] transition-colors focus:border-[#364C84] outline-none font-bold"
              />
            </div>
          </div>
          <input type="hidden" name="role" value={role} />
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full mt-4 py-3 rounded-lg font-bold text-lg border-2 transition-colors shadow
              ${
                isFormValid
                  ? 'bg-[#364C84] text-white border-[#364C84] hover:bg-[#2A3B68]'
                  : 'bg-[#95B1EE] text-white border-[#95B1EE] cursor-not-allowed'
              }
            `}
          >
            작성 완료 및 저장하기
          </button>
        </form>
        <GeminiVoiceChatButton></GeminiVoiceChatButton>
      </div>

      <style>{`
          .modal-backdrop {
            position: fixed;
            z-index: 1999;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(54, 76, 132, 0.10);
          }
          .modal-address {
            position: fixed;
            z-index: 2000;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            width: 500px;
            max-width: 95vw;
            height: 600px;
            background: #FFFDF5;
            border-radius: 16px;
            box-shadow: 0 8px 32px rgba(54, 76, 132, 0.12);
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }
        `}</style>
    </div>
  );
}
