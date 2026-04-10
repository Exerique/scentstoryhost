import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ current, total }) => {
  const progress = (current / total) * 100;

  return (
    <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mt-8 max-w-sm mx-auto">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-full bg-accent"
      />
    </div>
  );
};
