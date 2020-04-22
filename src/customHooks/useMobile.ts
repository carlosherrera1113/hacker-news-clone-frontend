import { useState, useEffect } from 'react';

const useMobile = () => {
  const [isMobile, setMobile] = useState(false);

  const changeMobile = () => {
    // eslint-disable-next-line no-unused-expressions
    window.matchMedia('(max-width: 37.5em)').matches
      ? setMobile(true)
      : setMobile(false);
  };

  useEffect(() => {
    changeMobile();
    window.addEventListener('resize', changeMobile);
    return () => window.removeEventListener('resize', changeMobile);
  }, []);

  return isMobile;
};

export default useMobile;
