import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useEntireFeedQuery } from '../generated/graphql';
import Link from './link';
import useAuth from '../customHooks/useAuth';


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

const StyledFetch = styled.div`
display: flex;
flex-direction: column;
max-width: 60rem;
align-items: center;
justify-content: center;
background-color: darkorange;
color: white;
border-style: none;
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
  const { loading, error, data } = useEntireFeedQuery();
  const isAuthenticated = useAuth();

  if (loading) return <StyledFetch>Fetching...</StyledFetch>;

  if (error || !data) return <StyledError>Error</StyledError>;

  return (
    <>
      <div>{ isAuthenticated
        ? (<div>Your'e logged in</div>)
        : (<div>You need to log in!</div>)}
      </div>
      <Link data={data} />
    </>
  );
};

export default LinkContainer;
