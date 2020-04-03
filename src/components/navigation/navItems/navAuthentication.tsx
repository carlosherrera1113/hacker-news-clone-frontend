import React from 'react';
import NavItemsContainerAuthenticated from './navItemsContainerAuthenticated';
import NavItemsContainer from './navItemsContainer';

interface NavAuthenticationProps {
  mobile: boolean;
  authenticated: boolean;
  clicked?: () => void;
}

// eslint-disable-next-line max-len
const NavAuthentication: React.FC<NavAuthenticationProps> = ({ mobile, authenticated, clicked }) => {
  if (authenticated) {
    return (
      <NavItemsContainerAuthenticated mobile={mobile} clicked={clicked} />
    );
  }
  return (
    <NavItemsContainer mobile={mobile} clicked={clicked} />
  );
};

export default NavAuthentication;
