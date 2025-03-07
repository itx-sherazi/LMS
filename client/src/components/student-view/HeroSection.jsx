import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const slides = [
  {
    img: 'https://hellomds.com/wp-content/uploads/2024/12/home-1.jpg',
    title: 'Welcome to Education Spark!',
    text: 'Your Gateway to Quality Learning',
    description: 'We provide top-notch educational services, helping students and professionals enhance their skills through structured learning paths.'
  },
  {
    img: 'https://hellomds.com/wp-content/uploads/2024/12/home-2-1.jpg',
    title: 'Learn, Grow, Succeed!',
    text: 'Transform Your Future with Us',
    description: 'Join our interactive courses, expert-led training, and a thriving community to accelerate your learning journey.'
  }
];

const HeroSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000); // 4 seconds transition time
      return () => clearInterval(interval);
    }, [currentIndex]);
  
    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };
  return (
    <div className=' p-5 flex justify-center relative'>
    <div className='w-full h-[600px] relative overflow-hidden rounded-3xl'>
      {/* Image Animation */}
      <motion.img
        key={currentIndex}
        src={slides[currentIndex].img}
        alt='slide'
        initial={{ scale: 1.5, opacity: 0, x: 100,y: -100 }}
        animate={{ scale: 1, opacity: 1, x: 0, y: 0 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 5 }}
        className='absolute inset-0 w-full h-full object-cover z-0'
      />
    </div>
    <div className='absolute left-8 top-1/2 transform -translate-y-1/2 text-white z-20'>
      <div className='pt-4 pl-28 space-y-8 flex flex-col'>

        <div className='w-20 h-20 border border-white rounded-full flex items-center justify-center 
                        group relative overflow-hidden hover:bg-white hover:bg-opacity-20 transition-all'>
          <i className="ri-arrow-right-long-line text-4xl relative z-10"></i>
        </div>

        <div className='w-20 h-20 border border-white rounded-full flex items-center justify-center 
                        group relative overflow-hidden hover:bg-white hover:bg-opacity-20 transition-all'>
          <i className="ri-arrow-left-long-line text-4xl relative z-10"></i>
        </div>

      </div>
    </div>
    {/* Text Content */}
    <div className='absolute top-1/2 left-72 transform -translate-y-1/2 z-20'>
      <motion.h1
        key={currentIndex + "-title"}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className='text-2xl font-bold text-white'
      >
        {slides[currentIndex].title}
      </motion.h1>

      <motion.p
        key={currentIndex + "-text"}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
        className='text-5xl font-bold text-white'
      >
        {slides[currentIndex].text}
      </motion.p>

      <motion.hr
        key={currentIndex + "-line"}
        initial={{ width: "0%" }}
        animate={{ width: "40%" }}
        transition={{ duration: 1.5 }}
        className='w-48 border-2 border-white my-8'
      />

      <motion.p
        key={currentIndex + "-desc"}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        className='text-white max-w-lg'
      >
        {slides[currentIndex].description}
      </motion.p>
    </div>
  </div>
  )
}

export default HeroSection