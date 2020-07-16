import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { EntireFeedQuery, useMeQuery, useVoteMutationMutation, FeedSearchQuery } from '../generated/graphql';

import timeDifferenceForDate from '../utils/timeDifference';
import useMobile from '../customHooks/useMobile';

const Container = styled.div`
display: flex;
flex-direction: column;
`;

const ListWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: flex-start;
max-width: 65rem;
padding: 1rem;
width: 100%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
margin: 0 auto;
background-color: ${({ theme }) => theme.colors.secondary};
`;

const SpanButtonWrapper = styled.div`
display: flex;
flex-direction: column;
`;

const StyledSpan = styled.span`
font-family: sans-serif;
font-size: 2rem;
padding: 1rem;
color: grey;
`;

const StyledButton = styled.button`
width: 2.25rem;
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

const StyledList = styled.ul`
display: inline-block;
width: 60rem;
`;

const StyledLink = styled.div<StyledLinkAndUrlProps>`
font-family: sans-serif;
font-size: 1.5rem;
color: black;
margin: 1rem;
white-space: nowrap;
text-overflow: ellipsis;
width: ${({ isMobile }) => (isMobile ? '25rem' : '50rem')};
display: block;
overflow: hidden;
`;

const StyledUrl = styled.div<StyledLinkAndUrlProps>`
font-family: sans-serif;
font-size: 1.25rem;
color: ${({ theme }) => theme.colors.tertiary};
margin: 1rem;
white-space: nowrap;
text-overflow: ellipsis;
max-width: ${({ isMobile }) => (isMobile ? '25rem' : '50rem')};
display: block;
overflow: hidden;
`;

const StyledHyperLink = styled.a`
color: ${({ theme }) => theme.colors.tertiary};
text-decoration: none;
&:hover {
  text-decoration: underline;
}
`;

const StyledVotes = styled.div`
font-family: sans-serif;
font-size: 1.25rem;
color: grey;
margin: 1rem;
white-space: nowrap;
text-overflow: ellipsis;
width: 50rem;
display: block;
overflow: hidden;
`;

export const ME_QUERY = gql`
query Me {
  me {
    name
  }
}`;

export const VOTE_MUTATION = gql`
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

export const NEW_VOTES_SUBSCRIPTION = gql`
subscription onNewVote {
  newVote {
    id
    link {
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
    user {
      id
    }
  }
}
`;

interface LinkProps {
  linkData: EntireFeedQuery | FeedSearchQuery | null;
  subscribeToNewComments: () => () => void;
}

interface StyledLinkAndUrlProps {
  readonly isMobile: boolean;
}

const Links: React.FC<LinkProps> = ({ linkData, subscribeToNewComments }) => {
  const { loading, data } = useMeQuery();
  const [voteMutation] = useVoteMutationMutation();
  const isMobile = useMobile();

  useEffect(() => {
    subscribeToNewComments();
  });

  const handleClick = async (link: any) => {
    await voteMutation({ variables:
      {
        linkId: link.id,
      },
    });
  };

  return (
    <Container>
      {linkData?.feed.links.map((link, index) => (
        <ListWrapper key={link.id}>
          <SpanButtonWrapper>
            <StyledSpan>{index + 1}.</StyledSpan>
            { !loading && data && data.me
              ? (<StyledButton type="submit" onClick={() => handleClick(link)}>▲</StyledButton>)
              : (null)}
          </SpanButtonWrapper>
          <StyledList>
            <StyledLink isMobile={isMobile}>{link.description}</StyledLink>
            <StyledHyperLink href={link.url} rel="noopener noreferrer" target="_blank">
              <StyledUrl isMobile={isMobile}>{link.url}</StyledUrl>
            </StyledHyperLink>
            <StyledVotes>{link.votes?.length} votes | by {' '}
              {link.postedBy
                ? link.postedBy.name
                : 'Unknown'}{' '}
              {timeDifferenceForDate(link.createdAt)}
            </StyledVotes>
          </StyledList>
        </ListWrapper>
      ))}
    </Container>
  );
};

export default Links;
