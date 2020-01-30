import React from 'react';
import NavItemsContainer from './navItems/navItemsContainer';

interface DesktopMenuProps {
    mobile: boolean;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ mobile }) => {
  return (
    <NavItemsContainer mobile={mobile} />
  );
};

export default DesktopMenu;
