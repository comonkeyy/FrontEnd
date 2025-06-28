import React, { useState } from 'react';
import { signIn } from '../../api/auth';

const LoginForm: React.FC = () => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn({ user_id, password });
      // 예: 토큰 저장, 상태 업데이트, 페이지 이동 등
      localStorage.setItem('token', res.data.token);
      setError('');
      alert('로그인 성공');
    } catch (err: any) {
      setError(err.response?.data?.message || '로그인 실패');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        value={user_id}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="이메일"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <button type="submit">로그인</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default LoginForm;
