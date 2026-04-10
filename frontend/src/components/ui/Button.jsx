import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-8 py-3 rounded-md transition-all duration-300 font-medium tracking-wide border-2";
  
  const variants = {
    primary: "bg-accent border-accent text-white hover:bg-transparent hover:text-accent",
    secondary: "bg-transparent border-white text-white hover:bg-white hover:text-primary",
    outline: "bg-transparent border-accent text-accent hover:bg-accent hover:text-white"
  };

  return (
    <motion.button 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};
