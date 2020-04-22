import React from 'react';

import NavAuthentication from './navItems/navAuthentication';

interface DesktopMenuProps {
    mobile: boolean;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ mobile }) => {
  return (
    <NavAuthentication mobile={mobile} />
  );
};

export default DesktopMenu;
