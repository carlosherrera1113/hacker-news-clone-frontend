import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { usePostMutation } from '../generated/graphql';

const POST_MUTATION = gql`
mutation Post($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      postedBy {
          name
      }
      url
      description
    }
  }
`;
const CreateLink: React.FC = () => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [postMutation] = usePostMutation(POST_MUTATION);

  return (
    <div>
      <div>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link."
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link."
        />
      </div>
      <button type="button" onClick={() => postMutation({ variables: { description, url } })}>Submit</button>
    </div>
  );
};

export default CreateLink;
