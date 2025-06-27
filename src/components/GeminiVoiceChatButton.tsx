import React, { useState } from 'react';

const GeminiVoiceChatButton: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        className="bg-[#364C84] hover:bg-[#2A3B68] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg cursor-pointer whitespace-nowrap group relative"
        onClick={() => setIsActive(!isActive)}
        aria-label="AI 음성 챗봇 열기"
      >
        <i
          className={`fas ${isActive ? 'fa-comments' : 'fa-microphone'} text-xl`}
        />
        <span className="absolute -top-10 right-0 bg-white text-[#364C84] px-3 py-1 rounded-lg shadow-md text-sm whitespace-nowrap hidden group-hover:block">
          AI 음성 안내
        </span>
      </button>
      {isActive && (
        <div className="fixed bottom-24 right-6 bg-white rounded-lg shadow-lg p-6 w-80 z-50">
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#364C84] font-bold">Gemini AI 챗봇</span>
            <button
              onClick={() => setIsActive(false)}
              className="text-[#364C84] font-bold text-lg"
            >
              &times;
            </button>
          </div>
          <div className="text-[#364C84] mb-4 text-sm">
            궁금한 점을 음성 또는 텍스트로 물어보세요.
            <br />
            (예: 빈집 등록 방법, 매칭 절차 등)
          </div>
          {/* 실제 음성/텍스트 챗봇 연동 부분은 추후 구현 */}
          <div className="bg-[#E7F1A8] rounded p-3 text-[#364C84] text-center">
            Gemini AI 음성 안내 기능 준비 중!
          </div>
        </div>
      )}
    </div>
  );
};

export default GeminiVoiceChatButton;
