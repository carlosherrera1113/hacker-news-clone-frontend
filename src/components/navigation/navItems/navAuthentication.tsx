import React from 'react';
import gql from 'graphql-tag';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { useSpring, animated } from 'react-spring';

import NavItemsContainerAuthenticated from './navItemsContainerAuthenticated';
import NavItemsContainer from './navItemsContainer';
import { useLogoutMutation, useMeQuery } from '../../../generated/graphql';
import { setAccessToken } from '../../../utils/accessToken';

const StyledButton = styled.button`
font-family: inherit;
font-size: 1.75rem;
color: white;
background-color: ${({ theme }) => theme.colors.primary};
text-align: center;
padding:  0.5rem 3rem 0.5rem 3rem;
cursor: pointer;
border-style: none;
margin: 4rem;
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

const Wrapper = styled.div<any>`
display: flex;
align-items: center;
position: relative;
margin-top: ${({ mobile }) => (mobile ? '6rem' : '0rem')};
flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
justify-content: ${({ mobile }) => (mobile ? 'center' : 'flex-end')};
@media ${({ theme }) => theme.mediaQueries.large} {
    margin-right: ${({ mobile }) => (mobile ? '0rem' : '4rem')};
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

  const props = useSpring({
    delay: 550,
    opacity: 1,
    transform: 'translateX(0px)',
    from: {
      opacity: 0,
      transform: 'translateX(20px)',
    },
  });

  const handleLogout = async () => {
    await logout();
    setAccessToken('');
    await client!.resetStore();
    history.push('/');
  };

  return (
    <>
      { !loading && data && data.me
        ? (
          <Wrapper mobile={mobile}>
            <animated.div style={props}>
              <StyledButton onClick={handleLogout} type="button">Logout</StyledButton>
            </animated.div>
            <NavItemsContainerAuthenticated
              mobile={mobile}
              clicked={clicked}
            />
          </Wrapper>
        )
        : (
          <Wrapper mobile={mobile}>
            <NavItemsContainer
              mobile={mobile}
              clicked={clicked}
            />
          </Wrapper>
        )}
    </>
  );
};

export default NavAuthentication;
