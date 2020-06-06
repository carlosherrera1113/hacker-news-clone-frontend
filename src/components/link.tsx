import React from 'react';
import { EntireFeedQuery } from '../generated/graphql';

interface LinkProps {
    data: EntireFeedQuery;
}

const Link: React.FC<LinkProps> = ({ data }) => {
  return (
    <div>
      {data.feed.links.map((link) => (<li key={link.id}>{link.description}({link.url})</li>))}
    </div>
  );
};

export default Link;
