import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { gql } from 'apollo-boost';
import { useSignUpMutation } from '../generated/graphql';

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();
  const [signUp] = useSignUpMutation(SIGNUP_MUTATION);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const response = await signUp({
          variables: {
            email,
            name,
            password,
          },
        });
        console.log(response);
        history.push('/');
      }}
    >
      <div>
        <input
          value={email}
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <input
          value={name}
          placeholder="Username"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
