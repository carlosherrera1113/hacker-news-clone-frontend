import React from 'react';
import { useTransition, config } from 'react-spring';

import HamburgerToggler from './hamburgerToggle';
import SideDrawer from './sideDrawer';

interface MobileMenuProps {
    menuOpened: boolean;
    setMenuOpened: React.Dispatch<React.SetStateAction<boolean>>;
    authenticated: boolean;
}

// eslint-disable-next-line max-len
const MobileMenu: React.FC<MobileMenuProps> = ({ menuOpened, setMenuOpened, authenticated }) => {
  const SideDrawerTransition = useTransition(menuOpened, null, {
    config: config.stiff,
    from: { opacity: 0, transform: 'translateX(-50%)' },
    enter: { opacity: 1, transform: 'translateX(0%)' },
    leave: { opacity: 0, transform: 'translateX(50%)' },
  });
  return (
    <>
      <HamburgerToggler
        menuOpened={menuOpened}
        toggleChange={() => setMenuOpened(!menuOpened)}
      />
      {SideDrawerTransition.map(
        ({ item, key, props }) => item && (
          <SideDrawer
            authenticated={authenticated}
            key={key}
            style={props}
            setMenuOpened={() => setMenuOpened(false)}
          />
        ),
      )}
    </>
  );
};

export default MobileMenu;
