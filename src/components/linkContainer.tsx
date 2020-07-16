import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useParams, useHistory } from 'react-router-dom';

import { useEntireFeedQuery, EntireFeedQuery, OnNewLinkaddedDocument } from '../generated/graphql';
import Links from './link';
import Spinner from './spinner';
import getQueryVariables from '../utils/getQueryVariables';

const StyledError = styled.div`
display: flex;
flex-direction: column;
max-width: 60rem;
align-items: center;
justify-content: center;
background-color: white;
color: #cb2431;
border: 0.05rem solid rgba(215, 58, 73, 1);
border-radius: 0.7rem;
padding: 10rem 10rem 10rem 10rem;
margin: 10rem;
box-shadow: 0rem 0.5rem 3.5rem rgba(0,0,0,0.2);
`;

const StyledButton = styled.button`
width: 5rem;
height: 2rem;
font-family: sans-serif;
font-size: 1rem;
color: white;
background-color: ${({ theme }) => theme.colors.primary};
padding:  0.5rem 1rem 0.5rem 1rem;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
border-style: none;
margin: 0 auto;
margin-top: 2rem;
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

export const FEED_QUERY = gql`
query EntireFeed($first: Int, $skip: Int, $orderBy: LinkOrderByInput) {
  feed(first: $first, skip: $skip, orderBy: $orderBy) {
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
        }
      }
    }
    count
  }
}`;

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription onNewLinkadded {
    newLink {
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
        }
      }
    }
  }
`;

const LinkContainer: React.FC = () => {
  const { page } = useParams();
  const history = useHistory();

  const { loading, error, data: queryData, subscribeToMore } = useEntireFeedQuery({
    variables: {
      ...getQueryVariables(),
    },
  });

  const nextPage = (queryData: EntireFeedQuery | undefined) => {
    if (parseInt(page, 10) <= queryData!.feed.count / 5) {
      const nextPage: number = parseInt(page, 10) + 1;
      history.push(`/new/${nextPage}`);
    }
  };

  const previousPage = () => {
    if (parseInt(page, 10) > 1) {
      const previousPage = parseInt(page, 10) - 1;
      history.push(`/new/${previousPage}`);
    }
  };

  if (loading) return <Spinner />;

  if (error || !queryData) return <StyledError>Error</StyledError>;

  return (
    <>
      <Links
        linkData={queryData}
        subscribeToNewComments={() => subscribeToMore({
          document: OnNewLinkaddedDocument,
          updateQuery: (prev: any, { subscriptionData }: any) => {
            if (!subscriptionData.data) return prev;
            const { newLink } = subscriptionData.data;
            const exists = prev.feed.links.find(({ id }: any) => id === newLink.id);
            if (exists) return prev;
            // eslint-disable-next-line prefer-object-spread
            return Object.assign({}, prev, {
              feed: {
                links: [newLink, ...prev.feed.links],
                count: prev.feed.links.length + 1,
                // eslint-disable-next-line no-underscore-dangle
                __typename: prev.feed.__typename,
              },
            });
          },
        })}
      />
      <StyledButton type="button" onClick={previousPage}>back</StyledButton>
      <StyledButton type="button" onClick={() => nextPage(queryData)}>forward</StyledButton>
    </>
  );
};

export default LinkContainer;
