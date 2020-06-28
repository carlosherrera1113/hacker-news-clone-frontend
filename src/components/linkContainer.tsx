import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';

import { useEntireFeedQuery, EntireFeedDocument, useOnNewLinkaddedSubscription, EntireFeedQuery } from '../generated/graphql';
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

export const FEED_QUERY = gql`
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
  const { loading, error, data: queryData, subscribeToMore } = useEntireFeedQuery();

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
    <Links
      linkData={queryData}
    />
  );
};

export default LinkContainer;
