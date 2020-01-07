import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import Routes from './components/routes';
import { setAccessToken } from './accessToken';

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
}
html {
  box-sizing: border-box;
}
body {
  background-color: white;
  height: 100%;
}
`;


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
    return <div>loading...</div>;
  }
  return (
    <div>
      <GlobalStyle />
      <Routes />
    </div>
  );
};

export default App;
