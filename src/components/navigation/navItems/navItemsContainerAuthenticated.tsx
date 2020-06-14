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

const authenticatedLinks = ['New Links', 'Submit Link', 'Search'];
const authenticatedRoutes = ['/', '/create', '/search'];

// eslint-disable-next-line max-len
const NavItemsContainerAuthenticated: React.FC<NavItemsContainerProps> = ({ mobile, clicked }) => {
  const navItemsTrail = useTrail(authenticatedLinks.length, {
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
        <animated.div key={authenticatedLinks[index]} style={props}>
          <NavItem
            key={authenticatedLinks[index]}
            link={authenticatedLinks[index]}
            clicked={clicked}
            route={authenticatedRoutes[index]}
          />
        </animated.div>
      ))}
    </StyledNav>
  );
};

export default NavItemsContainerAuthenticated;
