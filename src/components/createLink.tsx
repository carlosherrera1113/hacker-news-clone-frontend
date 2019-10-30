import React, { useState } from 'react';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
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
  const [description, setDescription] = useState();
  const [url, setUrl] = useState();
  const history = useHistory();
  const [postMutation] = usePostMutation({ onCompleted: () => history.push('/') });

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
      <button type="button" onClick={() => postMutation(POST_MUTATION)}>Submit</button>
    </div>
  );
};

export default CreateLink;
