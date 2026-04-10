import React, { createContext, useContext, useState } from 'react';

const QuizContext = createContext();

export const useQuiz = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });
  const [answers, setAnswers] = useState([]);

  const addScore = (vibeImpact, questionId, optionIndex) => {
    setScores((prev) => ({
      ...prev,
      [vibeImpact]: prev[vibeImpact] + 1,
    }));
    setAnswers((prev) => [...prev, { questionId, optionIndex }]);
  };

  const resetQuiz = () => {
    setScores({ A: 0, B: 0, C: 0, D: 0 });
    setAnswers([]);
  };

  return (
    <QuizContext.Provider value={{ scores, answers, addScore, resetQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
