import { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';

import { useMeQuery } from '../generated/graphql';

export const ME_QUERY = gql`
query Me {
  me {
    name
    email
  }
}`;

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const { data } = useMeQuery();

  if (data && isAuthenticated === false) {
    setAuthenticated(true);
  }

  const reloadPage = () => window.location.reload(false);

  useEffect(() => {
    window.addEventListener('isAuthenticated', reloadPage);
    return () => window.removeEventListener('isAuthenticated', reloadPage);
  }, []);

  return isAuthenticated;
};

export default useAuth;
