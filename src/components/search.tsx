import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';

import Links from './link';
import { FeedSearchDocument, FeedSearchQuery, FeedSearchQueryVariables } from '../generated/graphql';

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

const StyledHeading = styled.h1`
font-family: sans-serif;
margin: inherit;
font-weight: 700;
font-size: 2.75rem;
color: grey;
`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;

const FormWrapper = styled.div`
max-width: 70rem;
align-items: center;
padding: 8rem;
width: 100%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
border-radius: 2rem;
margin: 0 auto;
margin-bottom: 5rem;
background-color: ${({ theme }) => theme.colors.secondary};
`;

export const FEED_SEARCH_QUERY = gql`
  query FeedSearch($filter: String!) {
    feed(filter: $filter) {
      links {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
    }
  }
`;

const Search: React.FC = () => {
  const client = useApolloClient();
  const [data, setData] = useState<FeedSearchQuery | null>(null);
  const [filter, setFilter] = useState<string>('');

  const handleClick = async () => {
    const result = await client.query<FeedSearchQuery, FeedSearchQueryVariables>({
      query: FeedSearchDocument,
      variables: {
        filter,
      },
    });

    setData(result.data);
  };

  return (
    <div>
      <FormWrapper>
        <StyledForm>
          <StyledHeading>Search</StyledHeading>
          <StyledInput type="text" onChange={(e) => setFilter(e.target.value)} placeholder="Enter Search Keyword" />
          <StyledButton type="button" onClick={handleClick}>Ok</StyledButton>
        </StyledForm>
      </FormWrapper>
      <Links linkData={data} />
    </div>
  );
};

export default Search;
