import VacantHouseForm from '@/features/auth/vacant-house/VacantHouseForm';
import { registerHouse } from '@/api/house'; // 1. registerHouse 함수 import
import { useNavigate } from 'react-router-dom'; // 2. useNavigate import

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data: any) => {
    try {
      // API를 통해 서버에 빈집 정보 전송
      const response = await registerHouse(data);
      console.log('등록 성공:', response);
      alert('빈집이 성공적으로 등록되었습니다!');
      navigate('/owner/mypage'); // 등록 후 마이페이지로 이동
    } catch (error) {
      alert('빈집 등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <section className="py-16 px-6 bg-[#FFFDF5] min-h-screen flex flex-col justify-center">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#364C84] mb-4">빈 집 등록</h2>
        </div>
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
          <VacantHouseForm mode="register" onSubmit={handleRegisterSubmit} />
        </div>
      </div>
    </section>
  );
};
export default RegisterPage;
