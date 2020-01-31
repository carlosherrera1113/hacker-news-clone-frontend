import React, { useState, useEffect } from 'react';
import Routes from './components/routes';
import { setAccessToken } from './utils/accessToken';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:4000/refresh_token', {
      method: 'POST',
      credentials: 'include',
    }).then(async (x) => {
      const { accessToken } = await x.json();
      setAccessToken(accessToken);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div>token</div>;
  }
  return (<Routes />);
};

export default App;
