import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

const ScrollFadeIn = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const elementOffsetTop = document.getElementById('scroll-fade-in').offsetTop;

    if (scrollTop > elementOffsetTop - windowHeight + 100) {
      setIsVisible(true);
    }
  };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

  const fadeClasses = classNames('opacity-0', {
    'opacity-100': isVisible,
  });

  return <div id="scroll-fade-in" onScroll={()=>handleScroll()} className={fadeClasses}>{children}</div>;
};

export default ScrollFadeIn;
