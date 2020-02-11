import React, { useEffect } from 'react';
import Routes from './components/routes';
import { setAccessToken } from './utils/accessToken';

const App: React.FC = () => {
  // This allows the global variable 'accessToken' to be refreshed when the user refreshes
  // the page after login
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { refreshToken } = await x.json();
      setAccessToken(refreshToken);
    });
  }, []);

  return (<Routes />);
};

export default App;
