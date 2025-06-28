import React, { useState } from 'react';
import { createHouse } from '../../api/house';

const HouseForm: React.FC = () => {
  const [name, setName] = useState('');
  // ... 기타 입력값

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHouse({ name /*, ...*/ });
      alert('등록 성공');
      // 페이지 이동 또는 목록 새로고침
    } catch {
      alert('등록 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="빈집 이름"
      />
      {/* 기타 입력 필드 */}
      <button type="submit">등록</button>
    </form>
  );
};

export default HouseForm;
