import { Routes, Route } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';
import { AuthProvider } from './context/AuthContext';
import StartPage from './pages/StartPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import FragranceList from './pages/FragranceList';
import AdminDashboard from './pages/admin/AdminDashboard';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <div className="min-h-screen bg-primary text-secondary selection:bg-accent selection:text-white flex flex-col w-full">
          <main className="flex-grow flex flex-col">
            <Routes>
              <Route path="/" element={<StartPage />} />
              <Route path="/quiz" element={<QuizPage />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/fragrances" element={<FragranceList />} />
              <Route path="/admin/*" element={<AdminDashboard />} />
            </Routes>
          </main>
        </div>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
