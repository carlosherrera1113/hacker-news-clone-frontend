import React from 'react';
import { EntireFeedQuery } from '../generated/graphql';

interface LinkProps {
    data: EntireFeedQuery;
}

const Link: React.FC<LinkProps> = ({ data }) => {
  return (
    <div>
      <h3>Links</h3>
      <div>
        {data.feed.links.map((link) => (<li key={link.id}>{link.description}({link.url})</li>))}
      </div>
    </div>
  );
};

export default Link;
