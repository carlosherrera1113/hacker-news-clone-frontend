import React from 'react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import NavItemsContainerAuthenticated from './navItemsContainerAuthenticated';
import NavItemsContainer from './navItemsContainer';
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql';
import { setAccessToken } from '../../../utils/accessToken';

const StyledButton = styled.button`
font-family: sans-serif;
font-size: 1.3rem;
color: white;
background-color: ${({ theme }) => theme.colors.primary};
text-align: center;
padding:  0.5rem 3rem 0.5rem 3rem;
cursor: pointer;
border-style: none;
margin: 1rem;
border-radius: 6.25rem;
outline: none;
transition: all 0.2s ease-out;
&:focus {
    outline: none;
}
&:hover {
    transform: translateY(-1px) scale(1.01);
    background: ${({ theme }) => theme.colors.tertiary};
    box-shadow: 0rem 0.75rem 2.5rem rgba(255, 170, 0, 0.25);
}
`;

interface NavAuthenticationProps {
  mobile: boolean;
  clicked?: () => void;
}

export const LOGOUT_MUTATION = gql`
  mutation Logout {
      logout {
          message
      }
  }
`;

export const ME_QUERY = gql`
query Me {
  me {
    name
  }
}`;

// eslint-disable-next-line max-len
const NavAuthentication: React.FC<NavAuthenticationProps> = ({ mobile, clicked }) => {
  const { loading, data } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    setAccessToken('');
    await client!.resetStore();
    history.push('/');
  };

  return (
    <div>
      { !loading && data && data.me
        ? (
          <>
            <StyledButton onClick={handleLogout} type="button">Logout</StyledButton>
            <NavItemsContainerAuthenticated
              mobile={mobile}
              clicked={clicked}
            />
          </>
        )
        : (
          <NavItemsContainer
            mobile={mobile}
            clicked={clicked}
          />
        )}
    </div>
  );
};

export default NavAuthentication;
