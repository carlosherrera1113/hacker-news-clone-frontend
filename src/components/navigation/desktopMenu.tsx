import React from 'react';

import NavAuthentication from './navItems/navAuthentication';

interface DesktopMenuProps {
    mobile: boolean;
    authenticated: boolean;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ mobile, authenticated }) => {
  return (
    <NavAuthentication mobile={mobile} authenticated={authenticated} />
  );
};

export default DesktopMenu;
