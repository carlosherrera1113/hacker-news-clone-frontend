import React from 'react';
import useForm from 'react-hook-form';
import { useHistory } from 'react-router';
import { gql } from 'apollo-boost';
import { useSignUpMutation, MutationSignUpArgs } from '../generated/graphql';

const SIGNUP_MUTATION = gql`
  mutation SignUp($email: String!, $password: String!, $name: String!) {
    signUp(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const SignUp: React.FC = () => {
  const { register, handleSubmit } = useForm<MutationSignUpArgs>();
  const history = useHistory();
  const [signUp] = useSignUpMutation(SIGNUP_MUTATION);

  const handleSignUp = async (data: MutationSignUpArgs): Promise<void> => {
    const { email, name, password } = data;
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

  return (
    <form
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
    </form>
  );
};

export default SignUp;
