import React, { useState } from 'react';
import SignIn from '../SignIn/SignIn';
import './LogInButton.css';

export default function LogInButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        className="login-trigger-button"
        onClick={() => setIsModalOpen(true)}
      >
        로그인
      </button>
      <SignIn isOpen={isModalOpen} close={() => setIsModalOpen(false)} />
    </>
  );
}
