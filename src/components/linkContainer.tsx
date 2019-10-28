import React from 'react';
import { gql } from 'apollo-boost';
import { useEntireFeedQuery } from '../generated/graphql';
import Link from './link';

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

  if (error || !data) return <div>Error</div>;

  return <Link data={data} />;
};

export default LinkContainer;
