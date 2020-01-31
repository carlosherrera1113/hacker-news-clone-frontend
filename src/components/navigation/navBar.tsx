import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring, config } from 'react-spring';
import DesktopMenu from './desktopMenu';
import MobileMenu from './mobileMenu/mobileMenu';
import useMobile from '../../customHooks/useMobile';

const Title = styled.h1`
margin: 2rem;
color: darkorange;
font-size: 3.5rem;
font-weight: 500;
@media ${({ theme }) => theme.mediaQueries.small} {
  font-size: 3rem;
  }
@media ${({ theme }) => theme.mediaQueries.smallest} {
  font-size: 2.5rem;
  }
`;

const StyledHeader = styled(animated.header)`
  position: fixed;
  width: 100%;
  max-width: 100vw;
  top: 0;
  left: 0;
  z-index: 20;
  background: white;
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.1);
  transition: --background 0.2s ease-out;
`;

const Wrapper = styled.div<any>`
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: space-between;
  transition: all 0.2s ease-out;
  user-select: none;
  height: ${({ isMobile }) => (isMobile ? '6rem' : '7rem')};
  @media ${({ theme }) => theme.mediaQueries.small} {
    position: relative;
  }
`;

const Contained = styled.div`
  max-width: 124rem;
  z-index: 2;
  padding: 0 4rem;
  margin: 0 auto;
  width: 100%;
  @media ${(props) => props.theme.mediaQueries.small} {
    padding: 0 3rem;
  }
  @media ${(props) => props.theme.mediaQueries.smaller} {
    padding: 0 2rem;
  }
`;


const NavBar: React.FC = () => {
  const isMobile = useMobile();
  const [menuOpened, setMenuOpened] = useState(false);

  const NavBarSpring = useSpring({
    config: config.slow,
    opacity: 1,
    height: isMobile ? '6rem' : '7rem',
    from: {
      opacity: 0,
      height: '0rem',
    },
  });

  return (
    <StyledHeader style={NavBarSpring}>
      <Contained>
        <Wrapper isMobile={isMobile}>
          <Title>Hacker News Clone</Title>
          {isMobile ? (
            <MobileMenu
              menuOpened={menuOpened}
              setMenuOpened={setMenuOpened}
            />
          ) : (
            <DesktopMenu mobile={isMobile} />
          )}
        </Wrapper>
      </Contained>
    </StyledHeader>
  );
};

export default NavBar;
