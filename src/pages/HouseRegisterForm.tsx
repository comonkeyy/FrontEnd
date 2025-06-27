import VacantHouseForm from '@/features/auth/vacant-house/VacantHouseForm';

const RegisterPage = () => {
  const handleRegisterSubmit = (data: any) => {
    // 등록 API 호출 또는 상태 업데이트
    alert('빈집이 등록되었습니다!');
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
