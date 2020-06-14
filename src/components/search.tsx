import React, { useState } from 'react';
import { useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { stringify } from 'querystring';
import Links from './link';
import { EntireFeedQuery, FeedSearchDocument, FeedSearchQuery, FeedSearchQueryVariables, Link } from '../generated/graphql';

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
      <div>
        Search
        <input type="text" onChange={(e) => setFilter(e.target.value)} />
        <button type="button" onClick={handleClick}>Ok</button>
        <Links linkData={data} />
      </div>
    </div>
  );
};

export default Search;
