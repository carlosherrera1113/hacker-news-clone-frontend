import { useState } from 'react';
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
  const { data } = useMeQuery();

  if (data && isAuthenticated === false) {
    setAuthenticated(true);
  }

  return isAuthenticated;
};

export default useAuth;
