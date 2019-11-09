import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useEntireFeedQuery } from '../generated/graphql';
import Link from './link';

const StyledError = styled.div`
display: flex;
flex-direction: column;
max-width: 60rem;
align-items: center;
justify-content: center;
background-color: #F40909;
border-radius: 0.7rem;
padding: 10rem 10rem 10rem 10rem;
margin: 10rem;
box-shadow: 0rem 0.5rem 3.5rem rgba(0,0,0,0.2);
`;

const FEED_QUERY = gql`
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
}`;

const LinkContainer: React.FC = () => {
  const { loading, error, data } = useEntireFeedQuery(FEED_QUERY);

  if (loading) return <div>Fetching..</div>;

  if (error || !data) return <StyledError>Error</StyledError>;

  return <Link data={data} />;
};

export default LinkContainer;
