import React, { useEffect, useState } from 'react';
import Routes from './components/routes';
import { setAccessToken } from './utils/accessToken';

const App: React.FC = () => {
  const [loading, setloading] = useState(true);
  // This allows the global variable 'accessToken' to be refreshed when the user refreshes
  // the page after login
  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setloading(false);
    });
  }, []);

  if (loading) return null;

  return (<Routes />);
};

export default App;
