import { Routes, Route } from 'react-router-dom';
import Header from './layouts/Header';
import MainPage from './pages/MainPage/MainPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          {/* 다른 페이지 Route 추가 */}
        </Routes>
      </main>
    </>
  );
}

export default App;
