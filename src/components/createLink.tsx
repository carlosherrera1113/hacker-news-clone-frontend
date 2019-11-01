import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';
import { usePostMutation } from '../generated/graphql';

const StyledButton = styled.button`
font-family: sans-serif;
font-size: 1.3rem;
color: white;
background-color: darkorange;
text-align: center;
padding: 0.3rem 1rem 0.3rem;
cursor: pointer;
border-style: none;
border-radius: 100px;
transition: all 0.2s;
&:hover {
    transform: translateY(-1px) scale(1.01);
    background: #ffaa00;
    box-shadow: 0rem 0.75rem 2.5rem rgba(255, 170, 0, 0.25);
}
`;

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
      <StyledButton type="button" onClick={() => postMutation(POST_MUTATION)}>Submit Link</StyledButton>
    </div>
  );
};

export default CreateLink;
