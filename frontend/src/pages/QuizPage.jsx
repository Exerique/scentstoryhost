import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addScore } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch from backend
    axios.get('https://scentstory-backend.vercel.app/api/questions')
      .then(res => {
        setQuestions(res.data.data || res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching questions:", err);
        setLoading(false);
      });
  }, []);

  const handleOptionSelect = (vibeImpact, optionIndex) => {
    const question = questions[currentIndex];
    addScore(vibeImpact, question._id, optionIndex);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      navigate('/result');
    }
  };

  if (loading) {
    return <div className="flex-1 flex items-center justify-center text-black text-2xl h-screen w-full" style={{ backgroundColor: '#F5F5F0', fontFamily: 'var(--font-single-day)' }}>Loading the essence...</div>;
  }

  if (questions.length === 0) {
    return <div className="flex-1 flex items-center justify-center text-black text-2xl h-screen w-full" style={{ backgroundColor: '#F5F5F0', fontFamily: 'var(--font-single-day)' }}>No questions found.</div>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex-1 flex flex-col relative w-full h-full min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F5F5F0' }}>
      
      {/* Top Left Header */}
      <div className="absolute top-8 left-10 flex items-center gap-4 z-20">
        <h2 className="text-4xl text-black" style={{ fontFamily: 'var(--font-script)' }}>ScentStory</h2>
        <span className="text-black leading-tight text-[24px]" style={{ fontFamily: 'var(--font-single-day)' }}>
          Find your<br/>scent.
        </span>
      </div>

      <div className="flex-1 w-full max-w-[1500px] mx-auto pt-36 px-10 pb-20 flex flex-col items-center">
        
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="w-full flex flex-col items-center"
          >
            
            {/* Header / Titles wrapper */}
            <div className="w-full max-w-[1300px] mb-12 flex flex-col">
              <h1 
                className="text-black leading-none mb-2"
                style={{ fontFamily: 'var(--font-single-day)', fontSize: '96px' }}
              >
                {currentIndex + 1}. {currentQuestion.storyTitle}
              </h1>
              <p 
                className="text-black leading-tight text-right w-full mt-[-10px]"
                style={{ fontFamily: 'var(--font-single-day)', fontSize: '48px' }}
              >
                {currentQuestion.storyText}
              </p>
            </div>

            {/* Polaroid Cards row */}
            <div className="w-full flex flex-row flex-wrap justify-center items-center gap-[61px]">
              {currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option.vibeImpact, idx)}
                  className="group relative overflow-hidden bg-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] hover:scale-[1.03] transition-all duration-300 flex-shrink-0"
                  style={{ width: '293px', height: '455px', borderRadius: '50px' }}
                >
                  {/* Background Image */}
                  {option.imageUrl && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${option.imageUrl})` }}
                    />
                  )}
                  {/* Overlay for readability */}
                  <div className="absolute inset-0 bg-white/20 group-hover:bg-white/40 transition-colors duration-300" />
                  
                  {/* Text Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center p-6 text-center z-10">
                     <p 
                       className="text-black leading-snug tracking-wide" 
                       style={{ 
                         fontFamily: 'var(--font-single-day)', 
                         fontSize: '34px',
                         textShadow: '-2px -2px 0 #FFF, 2px -2px 0 #FFF, -2px 2px 0 #FFF, 2px 2px 0 #FFF, -3px 0 0 #FFF, 3px 0 0 #FFF, 0 -3px 0 #FFF, 0 3px 0 #FFF, 0 4px 8px rgba(255,255,255,0.8)'
                       }}
                     >
                       {option.text}
                     </p>
                  </div>
                </button>
              ))}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default QuizPage;
