import React from 'react';
import styled from 'styled-components';
import { useTrail, animated, config } from 'react-spring';

import NavItem from './navItem';

const StyledNav = styled.nav<any>`
  display: flex;
  overflow: hidden;
  flex: 1;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  justify-content: ${({ mobile }) => (mobile ? 'center' : 'flex-end')};
  align-items: center;
  @media ${({ theme }) => theme.mediaQueries.large} {
    margin-right: ${({ mobile }) => (mobile ? '0rem' : '4rem')};
  }
`;

interface NavItemsContainerProps {
    mobile: boolean;
    clicked?: () => void;
}

// eslint-disable-next-line max-len
const NavItemsContainer: React.FC<NavItemsContainerProps> = ({ mobile, clicked }) => {
  const links = ['New Links', 'Search', 'Sign Up', 'Login'];
  const routes = ['/', '/search', '/signUp', '/login'];

  const navItemsTrail = useTrail(links.length, {
    config: config.stiff,
    delay: 350,
    opacity: 1,
    transform: 'translateY(0px)',
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
  });

  return (
    <StyledNav mobile={mobile}>
      {navItemsTrail.map((props, index) => (
        <animated.div key={links[index]} style={props}>
          <NavItem
            key={links[index]}
            link={links[index]}
            clicked={clicked}
            route={routes[index]}
          />
        </animated.div>
      ))}
    </StyledNav>
  );
};

export default NavItemsContainer;
