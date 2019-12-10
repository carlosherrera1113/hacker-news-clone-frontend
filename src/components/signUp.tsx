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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
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
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <div>
        <input
          value={email}
          placeholder="Email"
          onChange={handleEmailChange}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <div>
        <input
          value={name}
          placeholder="Username"
          onChange={handleNameChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignUp;
