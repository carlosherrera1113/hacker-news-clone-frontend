import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Feed = {
  __typename?: 'Feed';
  links: Array<Link>;
  count: Scalars['Int'];
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  description: Scalars['String'];
  url: Scalars['String'];
  postedBy?: Maybe<User>;
  votes?: Maybe<Array<Vote>>;
};

export enum LinkOrderByInput {
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC'
}

export type Mutation = {
  __typename?: 'Mutation';
  post: Link;
  signUp: AuthPayload;
  login: AuthPayload;
  logout?: Maybe<SuccessMessage>;
  vote: Vote;
};


export type MutationPostArgs = {
  url: Scalars['String'];
  description: Scalars['String'];
};


export type MutationSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationVoteArgs = {
  linkId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  feed: Feed;
  me?: Maybe<User>;
};


export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<LinkOrderByInput>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newLink: Link;
  newVote: Vote;
};

export type SuccessMessage = {
  __typename?: 'SuccessMessage';
  message?: Maybe<Scalars['String']>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  links?: Maybe<Array<Link>>;
};

export type Vote = {
  __typename?: 'Vote';
  id: Scalars['ID'];
  link?: Maybe<Link>;
  user?: Maybe<User>;
};

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'name'>
    ) }
  ) }
);

export type SignUpMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  name: Scalars['String'];
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type PostMutationVariables = {
  description: Scalars['String'];
  url: Scalars['String'];
};


export type PostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'description' | 'createdAt' | 'url'>
  ) }
);

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )> }
);

export type VoteMutationMutationVariables = {
  linkId: Scalars['ID'];
};


export type VoteMutationMutation = (
  { __typename?: 'Mutation' }
  & { vote: (
    { __typename?: 'Vote' }
    & Pick<Vote, 'id'>
    & { link?: Maybe<(
      { __typename?: 'Link' }
      & Pick<Link, 'id'>
      & { votes?: Maybe<Array<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'id'>
        & { user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id'>
        )> }
      )>> }
    )>, user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id'>
    )> }
  ) }
);

export type EntireFeedQueryVariables = {};


export type EntireFeedQuery = (
  { __typename?: 'Query' }
  & { feed: (
    { __typename?: 'Feed' }
    & Pick<Feed, 'count'>
    & { links: Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'id' | 'description' | 'createdAt' | 'url'>
      & { postedBy?: Maybe<(
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name'>
      )>, votes?: Maybe<Array<(
        { __typename?: 'Vote' }
        & Pick<Vote, 'id'>
        & { user?: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'id' | 'name'>
        )> }
      )>> }
    )> }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout?: Maybe<(
    { __typename?: 'SuccessMessage' }
    & Pick<SuccessMessage, 'message'>
  )> }
);


export const LoginDocument = gql`
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
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($email: String!, $password: String!, $name: String!) {
  signUp(email: $email, password: $password, name: $name) {
    token
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const PostDocument = gql`
    mutation Post($description: String!, $url: String!) {
  post(description: $description, url: $url) {
    id
    description
    createdAt
    url
  }
}
    `;
export type PostMutationFn = ApolloReactCommon.MutationFunction<PostMutation, PostMutationVariables>;

/**
 * __usePostMutation__
 *
 * To run a mutation, you first call `usePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMutation, { data, loading, error }] = usePostMutation({
 *   variables: {
 *      description: // value for 'description'
 *      url: // value for 'url'
 *   },
 * });
 */
export function usePostMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PostMutation, PostMutationVariables>) {
        return ApolloReactHooks.useMutation<PostMutation, PostMutationVariables>(PostDocument, baseOptions);
      }
export type PostMutationHookResult = ReturnType<typeof usePostMutation>;
export type PostMutationResult = ApolloReactCommon.MutationResult<PostMutation>;
export type PostMutationOptions = ApolloReactCommon.BaseMutationOptions<PostMutation, PostMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    name
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const VoteMutationDocument = gql`
    mutation VoteMutation($linkId: ID!) {
  vote(linkId: $linkId) {
    id
    link {
      votes {
        id
        user {
          id
        }
      }
      id
    }
    user {
      id
    }
  }
}
    `;
export type VoteMutationMutationFn = ApolloReactCommon.MutationFunction<VoteMutationMutation, VoteMutationMutationVariables>;

/**
 * __useVoteMutationMutation__
 *
 * To run a mutation, you first call `useVoteMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutationMutation, { data, loading, error }] = useVoteMutationMutation({
 *   variables: {
 *      linkId: // value for 'linkId'
 *   },
 * });
 */
export function useVoteMutationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteMutationMutation, VoteMutationMutationVariables>) {
        return ApolloReactHooks.useMutation<VoteMutationMutation, VoteMutationMutationVariables>(VoteMutationDocument, baseOptions);
      }
export type VoteMutationMutationHookResult = ReturnType<typeof useVoteMutationMutation>;
export type VoteMutationMutationResult = ApolloReactCommon.MutationResult<VoteMutationMutation>;
export type VoteMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteMutationMutation, VoteMutationMutationVariables>;
export const EntireFeedDocument = gql`
    query EntireFeed {
  feed {
    links {
      id
      description
      createdAt
      url
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
          name
        }
      }
    }
    count
  }
}
    `;

/**
 * __useEntireFeedQuery__
 *
 * To run a query within a React component, call `useEntireFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntireFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntireFeedQuery({
 *   variables: {
 *   },
 * });
 */
export function useEntireFeedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EntireFeedQuery, EntireFeedQueryVariables>) {
        return ApolloReactHooks.useQuery<EntireFeedQuery, EntireFeedQueryVariables>(EntireFeedDocument, baseOptions);
      }
export function useEntireFeedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EntireFeedQuery, EntireFeedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EntireFeedQuery, EntireFeedQueryVariables>(EntireFeedDocument, baseOptions);
        }
export type EntireFeedQueryHookResult = ReturnType<typeof useEntireFeedQuery>;
export type EntireFeedLazyQueryHookResult = ReturnType<typeof useEntireFeedLazyQuery>;
export type EntireFeedQueryResult = ApolloReactCommon.QueryResult<EntireFeedQuery, EntireFeedQueryVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    message
  }
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;