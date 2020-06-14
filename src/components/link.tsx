import React from 'react';
import gql from 'graphql-tag';
import { EntireFeedQuery, useMeQuery, useVoteMutationMutation, Link, FeedSearchQuery } from '../generated/graphql';

import timeDifferenceForDate from '../utils/timeDifference';

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

interface LinkProps {
    linkData: EntireFeedQuery | FeedSearchQuery | null;
}

const Links: React.FC<LinkProps> = ({ linkData }) => {
  const { loading, data } = useMeQuery();
  const [voteMutation] = useVoteMutationMutation();

  const handleClick = async (link: any) => {
    await voteMutation({ variables:
      {
        linkId: link.id,
      },
    });
  };

  return (
    <div>
      {linkData?.feed.links.map((link, index) => (
        <li key={link.id}>
          <span>{index + 1}</span>
          { !loading && data && data.me
            ? (<button type="submit" onClick={() => handleClick(link)}> ▲ </button>)
            : (null)}
          <div>{link.description}({link.url})</div>
          <div>{link.votes?.length} votes | by {' '}
            {link.postedBy
              ? link.postedBy.name
              : 'Unknown'}{' '}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        </li>
      ))}
    </div>
  );
};

export default Links;
