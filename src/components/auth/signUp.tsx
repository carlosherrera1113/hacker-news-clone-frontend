import React from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { useSignUpMutation, MutationSignUpArgs } from '../../generated/graphql';
import { setAccessToken } from '../../utils/accessToken';

const StyledForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50%;
`;

export const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<MutationSignUpArgs>();
  const history = useHistory();
  const [signUp] = useSignUpMutation();

  const handleSignUp = async (data: MutationSignUpArgs): Promise<void> => {
    const { email, name, password } = data;
    const response = await signUp({
      variables: {
        email,
        name,
        password,
      },
    });
    if (response && response.data) {
      setAccessToken(response.data.signUp.token);
    }
    history.push('/');
  };

  return (
    <StyledForm
      onSubmit={handleSubmit(handleSignUp)}
    >
      <div>
        <input
          name="email"
          ref={register({
            required: true,
            minLength: 5,
            maxLength: 320,
          })}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          name="password"
          ref={register({
            required: true,
            minLength: 8,
          })}
        />
      </div>
      <div>
        <input
          placeholder="Username"
          name="name"
          ref={register({
            required: true,
            minLength: 3,
            maxLength: 36,
          })}
        />
      </div>
      <button type="submit">Submit</button>
    </StyledForm>
  );
};

export default SignUp;
