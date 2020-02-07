import React from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router';
import { gql } from 'apollo-boost';
import { useLoginMutation, MutationLoginArgs } from '../../generated/graphql';
import { setAccessToken } from '../../utils/accessToken';

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
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
    });

    if (response && response.data) {
      setAccessToken(response.data.login.token);
    }

    history.push('/');
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
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
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;