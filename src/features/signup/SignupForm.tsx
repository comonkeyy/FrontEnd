import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup, SignupPayload } from '../../api/signup';

export default function SignupForm() {
  const [form, setForm] = useState<SignupPayload>({
    user_id: '',
    password: '',
    role: 'CW', // 복지사
    email: '',
    name: '',
    phone: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signup(form);
      if (res.success) {
        alert('회원가입 성공!');
        navigate('/signin');
      } else {
        alert('회원가입 실패');
      }
    } catch (err) {
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      {/* role은 'CW'로 고정 */}
      <button type="submit">회원가입</button>
    </form>
  );
}
