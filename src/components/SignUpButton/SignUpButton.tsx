import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUpButton.css';

export default function SignupButton() {
  const navigate = useNavigate();
  return (
    <button className="signup-btn" onClick={() => navigate('/signup')}>
      회원가입
    </button>
  );
}
