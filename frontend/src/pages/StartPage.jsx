import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col relative w-full h-full min-h-screen items-center" style={{ backgroundColor: '#F5F5F0' }}>

      {/* Top Left Header */}
      <div className="absolute top-8 left-10 flex items-center gap-4 z-20">
        <h2 className="text-4xl text-black" style={{ fontFamily: 'var(--font-script)' }}>ScentStory</h2>
        <span className="text-black leading-tight text-[24px]" style={{ fontFamily: 'var(--font-single-day)' }}>
          Find your<br />scent.
        </span>
      </div>

      {/* Main Content Stack */}
      <div className="flex-1 flex flex-col items-center justify-between w-full max-w-7xl mx-auto z-10 pt-48 pb-10 px-6">

        <div className="flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-black text-center mb-8"
            style={{ fontFamily: 'var(--font-single-day)', fontSize: '64px', lineHeight: '1.2' }}
          >
            Ready to Find Your Scent?
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative cursor-pointer group mb-10 flex justify-center items-center"
            onClick={() => navigate('/quiz')}
          >
            {/* Pink Glow Button */}
            <div
              className="absolute bg-[#E7CDCD] transition-transform duration-300 group-hover:scale-110"
              style={{
                width: '180px',
                height: '73px',
                borderRadius: '200px',
                filter: 'blur(25.65px)'
              }}
            ></div>

            <span
              className="relative z-10 text-black group-hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-single-day)', fontSize: '48px' }}
            >
              start
            </span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex justify-center w-full mt-auto"
        >
          <img
            src="/assets/StartImagePerfume.png"
            alt="Perfume Bottle and Orchid"
            className="w-full max-w-[500px] h-auto object-contain mix-blend-multiply"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default StartPage;
