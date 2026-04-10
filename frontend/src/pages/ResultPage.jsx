import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useQuiz } from '../context/QuizContext';

const ResultPage = () => {
  const { scores, resetQuiz } = useQuiz();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const determineResult = async () => {
      try {
        // Convert scores object { A: 2, B: 1, C: 0, D: 1 } into answers array ["A","A","B","D"]
        const answers = [];
        Object.entries(scores).forEach(([vibe, count]) => {
          for (let i = 0; i < count; i++) {
            answers.push(vibe);
          }
        });

        // If no answers were collected (direct navigation), redirect back
        if (answers.length === 0) {
          setError('No quiz answers found. Please take the quiz first.');
          setLoading(false);
          return;
        }

        const response = await axios.post('http://localhost:5001/api/fragrances/get-result', {
          answers
        });
        
        setResult(response.data.data);
      } catch (err) {
        console.error("Result error:", err);
        setError('Something went wrong. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    determineResult();
  }, [scores]);

  const handleRedoQuiz = () => {
    resetQuiz();
    navigate('/quiz');
  };

  if (loading) {
    return (
      <div 
        className="flex-1 flex flex-col items-center justify-center h-screen w-full"
        style={{ backgroundColor: '#F5F5F0' }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div 
            className="w-16 h-16 border-4 border-black/20 border-t-black rounded-full animate-spin"
          />
          <p 
            className="text-black text-3xl"
            style={{ fontFamily: 'var(--font-single-day)' }}
          >
            Revealing your signature...
          </p>
        </motion.div>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div 
        className="flex-1 flex flex-col items-center justify-center h-screen w-full gap-6"
        style={{ backgroundColor: '#F5F5F0' }}
      >
        <p 
          className="text-black text-2xl text-center px-8"
          style={{ fontFamily: 'var(--font-single-day)' }}
        >
          {error || 'No result found.'}
        </p>
        <button
          onClick={handleRedoQuiz}
          className="px-8 py-3 bg-black text-white rounded-full text-lg hover:bg-black/80 transition-colors"
          style={{ fontFamily: 'var(--font-single-day)' }}
        >
          Take the Quiz
        </button>
      </div>
    );
  }

  return (
    <div 
      className="flex-1 flex flex-col relative w-full min-h-screen overflow-x-hidden"
      style={{ backgroundColor: '#F5F5F0' }}
    >
      {/* Top Left Header */}
      <div className="absolute top-8 left-10 flex items-center gap-4 z-20">
        <h2 className="text-4xl text-black" style={{ fontFamily: 'var(--font-script)' }}>
          ScentStory
        </h2>
        <span 
          className="text-black leading-tight text-[24px]" 
          style={{ fontFamily: 'var(--font-single-day)' }}
        >
          Find your<br/>scent.
        </span>
      </div>

      {/* Top Right - Redo Quiz Button */}
      <div className="absolute top-8 right-10 z-20">
        <button
          onClick={handleRedoQuiz}
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/80 transition-colors cursor-pointer"
          style={{ fontFamily: 'var(--font-single-day)', fontSize: '24px' }}
        >
          Redo Quiz
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 w-full max-w-[1500px] mx-auto pt-36 px-10 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          {/* Archetype Name */}
          <h2 
            className="text-black mb-2"
            style={{ fontFamily: 'var(--font-single-day)', fontSize: '48px', lineHeight: '1.1' }}
          >
            {result.archetype}
          </h2>

          {/* Fragrance Name */}
          <h1 
            className="text-black mb-10"
            style={{ fontFamily: 'var(--font-single-day)', fontSize: '80px', lineHeight: '1.1' }}
          >
            {result.name}
          </h1>

          {/* Description + Image Row */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left: Description */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex-1 max-w-[480px]"
            >
              <p 
                className="text-black leading-relaxed"
                style={{ fontFamily: 'var(--font-single-day)', fontSize: '40px', lineHeight: '1.4' }}
              >
                {result.description || `${result.name} is a ${result.category?.toLowerCase() || 'unique'} fragrance that perfectly matches your scent profile. Its distinctive blend captures the essence of ${result.archetype?.toLowerCase() || 'your personality'}.`}
              </p>
            </motion.div>

            {/* Right: Fragrance Image */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-1 flex justify-center md:justify-end"
            >
              {result.photoUrl && (
                <img 
                  src={result.photoUrl} 
                  alt={result.name}
                  className="max-w-full max-h-[600px] w-auto h-auto object-contain drop-shadow-lg"
                />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative element - "Redo Quiz" anchor for mobile */}
      <div className="md:hidden flex justify-center pb-10">
        <button
          onClick={handleRedoQuiz}
          className="px-8 py-3 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
          style={{ fontFamily: 'var(--font-single-day)', fontSize: '24px' }}
        >
          Redo Quiz
        </button>
      </div>
    </div>
  );
};

export default ResultPage;
