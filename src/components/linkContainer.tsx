import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useLocation, useParams, useHistory } from 'react-router-dom';

import { useEntireFeedQuery, EntireFeedDocument, useOnNewLinkaddedSubscription, EntireFeedQuery, LinkOrderByInput } from '../generated/graphql';
import Links from './link';
import Spinner from './spinner';

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
  const { pathname } = useLocation();
  const { page } = useParams();
  const history = useHistory();

  const getQueryVariables = () => {
    const skip = pathname.includes('new') ? (parseInt(page, 10) - 1) * 10 : 0;
    const first = pathname.includes('new') ? 10 : 50;
    const orderBy = pathname.includes('new') ? 'createdAt_DESC' as LinkOrderByInput.CreatedAtDesc : null;
    return {
      first,
      skip,
      orderBy,
    };
  };

  const { loading, error, data: queryData } = useEntireFeedQuery({
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

  useOnNewLinkaddedSubscription({
    onSubscriptionData: ({ client, subscriptionData }) => {
      const prev = client.readQuery<EntireFeedQuery>({
        query: EntireFeedDocument,
      });

      client.writeQuery({
        query: EntireFeedDocument,
        data: {
          ...prev,
          feed: {
            links: [subscriptionData.data?.newLink, ...prev!.feed.links],
            count: prev!.feed.links.length + 1,
            __typename: prev?.feed.__typename,
          },
        },
      });
    },
  });

  if (loading) return <Spinner />;

  if (error || !queryData) return <StyledError>Error</StyledError>;

  return (
    <>
      <Links
        linkData={queryData}
      />
      <StyledButton type="button" onClick={previousPage}>back</StyledButton>
      <StyledButton type="button" onClick={() => nextPage(queryData)}>forward</StyledButton>
    </>
  );
};

export default LinkContainer;
