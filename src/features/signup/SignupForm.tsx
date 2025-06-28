import React, { useState } from 'react';
import { signup } from '../../api/signup';

export default function SignupForm() {
  const [userType, setUserType] = useState<'owner' | 'worker'>('owner');
  const [form, setForm] = useState({
    user_id: '',
    password: '',
    email: '',
    name: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTypeChange = (type: 'owner' | 'worker') => setUserType(type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload =
      userType === 'worker' ? { ...form, role: 'CW' } : { ...form };

    try {
      const res = await signup(payload);
      if (res.success) alert('회원가입 성공!');
      else alert('회원가입 실패');
    } catch {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button
          type="button"
          onClick={() => handleTypeChange('owner')}
          style={{ fontWeight: userType === 'owner' ? 'bold' : 'normal' }}
        >
          집 소유자
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('worker')}
          style={{ fontWeight: userType === 'worker' ? 'bold' : 'normal' }}
        >
          복지사
        </button>
      </div>
      <input
        name="user_id"
        value={form.user_id}
        onChange={handleChange}
        placeholder="아이디"
      />
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        placeholder="비밀번호"
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="이메일"
      />
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="이름"
      />
      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="전화번호"
      />
      <button type="submit">회원가입</button>
    </form>
  );
}
