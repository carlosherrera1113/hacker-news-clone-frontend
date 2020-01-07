import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  /** The `Upload` scalar type represents a file upload. */
  Upload: any,
};


export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type Feed = {
   __typename?: 'Feed',
  links: Array<Link>,
  count: Scalars['Int'],
};

export type Link = {
   __typename?: 'Link',
  id: Scalars['ID'],
  createdAt: Scalars['DateTime'],
  description: Scalars['String'],
  url: Scalars['String'],
  postedBy?: Maybe<User>,
  votes?: Maybe<Array<Vote>>,
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
   __typename?: 'Mutation',
  post: Link,
  signUp: AuthPayload,
  login: AuthPayload,
  vote: Vote,
};


export type MutationPostArgs = {
  url: Scalars['String'],
  description: Scalars['String']
};


export type MutationSignUpArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  name: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationVoteArgs = {
  linkId: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  feed: Feed,
};


export type QueryFeedArgs = {
  filter?: Maybe<Scalars['String']>,
  skip?: Maybe<Scalars['Int']>,
  first?: Maybe<Scalars['Int']>,
  orderBy?: Maybe<LinkOrderByInput>
};

export type Subscription = {
   __typename?: 'Subscription',
  newLink: Link,
  newVote: Vote,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  name: Scalars['String'],
  email: Scalars['String'],
  links?: Maybe<Array<Link>>,
};

export type Vote = {
   __typename?: 'Vote',
  id: Scalars['ID'],
  link?: Maybe<Link>,
  user?: Maybe<User>,
};

export type PostMutationVariables = {
  description: Scalars['String'],
  url: Scalars['String']
};


export type PostMutation = (
  { __typename?: 'Mutation' }
  & { post: (
    { __typename?: 'Link' }
    & Pick<Link, 'url' | 'createdAt' | 'id' | 'description'>
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
      & Pick<Link, 'id' | 'description' | 'url'>
      & { votes: Maybe<Array<(
        { __typename?: 'Vote' }
        & { user: Maybe<(
          { __typename?: 'User' }
          & Pick<User, 'name'>
        )> }
      )>> }
    )> }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);

export type SignUpMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  name: Scalars['String']
};


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
  ) }
);


export const PostDocument = gql`
    mutation Post($description: String!, $url: String!) {
  post(description: $description, url: $url) {
    url
    createdAt
    id
    description
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
export const EntireFeedDocument = gql`
    query EntireFeed {
  feed {
    links {
      id
      description
      url
      votes {
        user {
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
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
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