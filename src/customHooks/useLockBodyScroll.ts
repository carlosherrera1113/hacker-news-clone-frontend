import { useLayoutEffect } from 'react';

const useLockBodyScroll = () => {
    useLayoutEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, []);
};

export default useLockBodyScroll;
