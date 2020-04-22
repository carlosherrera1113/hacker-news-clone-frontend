import React from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';

import { useHistory } from 'react-router-dom';
import { useLogoutMutation } from '../../generated/graphql';
import { setAccessToken } from '../../utils/accessToken';
import useAuth from '../../customHooks/useAuth';

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

export const LOGOUT_MUTATION = gql`
  mutation Logout {
      logout {
          message
      }
  }
`;

const Logout = () => {
  const history = useHistory();
  const [logout, { client }] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    setAccessToken('');
    await client!.clearStore().then(() => {
      history.push('/');
    });
  };

  return (
    <div>
      <StyledButton onClick={handleLogout} type="button">Logout</StyledButton>
    </div>
  );
};

export default Logout;
