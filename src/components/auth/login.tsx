import React from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router';
import { gql } from 'apollo-boost';
import styled from 'styled-components';

import { useLoginMutation, MutationLoginArgs, MeQuery, MeDocument } from '../../generated/graphql';
import { setAccessToken } from '../../utils/accessToken';

const FormWrapper = styled.div`
max-width: 70rem;
align-items: center;
padding: 8rem;
width: 100%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
border-radius: 2rem;
margin: 0 auto;
background-color: ${({ theme }) => theme.colors.secondary};
`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;

const StyledHeading = styled.h1`
font-family: sans-serif;
margin: inherit;
font-weight: 700;
font-size: 2.75rem;
color: grey;
`;

const StyledInput = styled.input`
width: 100%;
padding: 1.2rem 2rem;
font-family: sans-serif;
font-size: 1.4rem;
border-radius: 0.5rem;
border: 0.2rem solid rgba(255, 170, 0, 0.25);
margin-top: 3.5rem;
background-color: ${({ theme }) => theme.colors.secondary};
transition: all 300ms;
color: grey;
text-align: start;
&:focus {
    outline: none;
}
&::placeholder {
    color: grey;
    text-align: start;
}
&:hover {
    transform: translateY(-0.1rem) scale(1.01);
    box-shadow: 0rem 0.75rem 2.5rem rgba(255, 170, 0, 0.25);
}
`;

const StyledButton = styled.button`
font-family: sans-serif;
font-size: 1.4rem;
color: white;
background-color: ${({ theme }) => theme.colors.primary};
text-align: center;
padding:  0.5rem 3rem 0.5rem 3rem;
cursor: pointer;
border-style: none;
margin: 10%;
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

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        name
      }
    }
  }
`;

const Login: React.FC = () => {
  const { register, handleSubmit } = useForm<MutationLoginArgs>();
  const history = useHistory();
  const [login] = useLoginMutation();

  const handleLogin = async (data: MutationLoginArgs): Promise<void> => {
    const { email, password } = data;
    const response = await login({
      variables: {
        email,
        password,
      },
      // eslint-disable-next-line consistent-return
      update: (cache, { data }) => {
        if (!data) return null;

        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: {
            me: data.login.user,
          },
        });
      },
    });
    // this sets token on global variable
    if (response && response.data) {
      setAccessToken(response.data.login.token);
    }
    history.push('/create');
  };

  return (
    <FormWrapper>
      <StyledForm onSubmit={handleSubmit(handleLogin)}>
        <StyledHeading>Log into Hacker News Clone</StyledHeading>
        <StyledInput
          name="email"
          ref={register({
            required: true,
            minLength: 5,
            maxLength: 320,
          })}
          placeholder="Email"
        />
        <StyledInput
          type="password"
          placeholder="Password"
          name="password"
          ref={register({
            required: true,
            minLength: 8,
          })}
        />
        <StyledButton type="submit">Login</StyledButton>
      </StyledForm>
    </FormWrapper>
  );
};

export default Login;
