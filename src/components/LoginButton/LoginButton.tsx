import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import './LogInButton.css';
interface LogInButtonProps {
  setUserRole: (role: 'owner' | 'worker' | 'guest' | 'admin') => void; // AppRouter에서 받을 prop
  onLogin: (role: 'owner' | 'worker' | 'admin') => void;
}

export default function LogInButton({
  setUserRole,
  onLogin,
}: LogInButtonProps) {
  // props로 setUserRole 받기
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="login-trigger-button"
        onClick={() => setIsModalOpen(true)}
      >
        로그인
      </button>
      <SignIn
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
        setUserRole={setUserRole} // SignIn 컴포넌트로 setUserRole 전달
        onLogin={onLogin}
      />
    </>
  );
}
