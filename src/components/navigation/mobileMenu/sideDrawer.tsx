import React from 'react';
import styled from 'styled-components';
import { animated } from 'react-spring';

import NavAuthentication from '../navItems/navAuthentication';
import useLockBodyScroll from '../../../customHooks/useLockBodyScroll';

const BackgroundWrapper = styled(animated.div)`
  position: fixed;
  z-index: -1;
  top: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.secondary};
  width: 100%;
  max-width: 100vw;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  display: flex;
  transition: ${({ theme }) => theme.colors.secondary} 0.2s ease-out;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 6rem;
  padding: 2rem 1rem;
`;

interface SideDrawerProps {
  setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
  style: any;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ setMenuOpened, ...rest }) => {
  useLockBodyScroll();
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <BackgroundWrapper {...rest}>
      <Wrapper>
        <NavAuthentication
          mobile
          clicked={() => setMenuOpened(false)}
        />
      </Wrapper>
    </BackgroundWrapper>
  );
};

export default SideDrawer;
