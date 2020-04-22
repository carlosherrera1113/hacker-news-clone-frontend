import { useState, useEffect } from 'react';
import { gql } from 'apollo-boost';

import { useMeQuery } from '../generated/graphql';

export const ME_QUERY = gql`
query Me {
  me {
    name
  }
}`;

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const { loading, error, data, refetch, client } = useMeQuery({ fetchPolicy: 'network-only' });
  const me = data ? data.me : null;

  useEffect(() => {
    if (data && !isAuthenticated) {
      setAuthenticated(true);
    }
  }, [data]);

  return { isAuthenticated, setAuthenticated, loading, error, data, refetch, me, client };
};

export default useAuth;
