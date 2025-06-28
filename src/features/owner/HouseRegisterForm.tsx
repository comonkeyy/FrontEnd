import React, { useState } from 'react';
import { registerHouse } from '../../api/house';
import { useNavigate } from 'react-router-dom';

const HouseRegisterForm = () => {
  const [form, setForm] = useState({
    address: '',
    region: '',
    size: '',
    floor: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await registerHouse(form);
      alert(res.data.message);
      navigate('/owner/mypage');
    } catch (err) {
      alert('빈집 등록 실패');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#FFFDF5] p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-[#364C84] mb-4">빈집 등록</h2>

      <div className="mb-4">
        <label className="block text-[#364C84] mb-2">주소</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="w-full p-2 border border-[#95B1EE] rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#364C84] mb-2">지역</label>
        <input
          name="region"
          value={form.region}
          onChange={handleChange}
          className="w-full p-2 border border-[#95B1EE] rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-[#364C84] mb-2">면적</label>
        <input
          name="size"
          value={form.size}
          onChange={handleChange}
          className="w-full p-2 border border-[#95B1EE] rounded"
          required
        />
      </div>

      <div className="mb-6">
        <label className="block text-[#364C84] mb-2">층수</label>
        <input
          name="floor"
          value={form.floor}
          onChange={handleChange}
          className="w-full p-2 border border-[#95B1EE] rounded"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#95B1EE] hover:bg-[#7D9FE9] text-white py-2 px-4 rounded-button"
      >
        등록하기
      </button>
    </form>
  );
};

export default HouseRegisterForm;
