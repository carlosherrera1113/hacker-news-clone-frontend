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
justify-content: center;
text-align: center;
padding: 0.3rem 1rem 0.3rem;
cursor: pointer;
border-style: none;
border-radius: 6.25rem;
transition: all 0.2s ease-out;
&:hover {
    transform: translateY(-1px) scale(1.01);
    background: #ffaa00;
    box-shadow: 0rem 0.75rem 2.5rem rgba(255, 170, 0, 0.25);
}
`;

const StyledDiv = styled.div`
width: 50%;
display: flex;
position: center;
margin: 3rem;
flex-direction: column;
justify-content: center;
`;

const StyledInput = styled.input`
padding: 1.2rem 2.5rem;
background-image: white;
font-family: inherit;
font-size: inherit;
border-radius: 6.25rem;
border: 0.1rem solid rgba(255, 170, 0, 0.25);
margin-top: 1.5rem;
background-color: transparent;
transition: all 300ms;
color: gray;
&::placeholder {
color: gray;
}
&:hover {
    transform: translateY(-0.1rem) scale(1.01);
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
      <StyledDiv>
        <StyledInput
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="A description for the link."
        />
        <StyledInput
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="The URL for the link."
        />
      </StyledDiv>
      <StyledButton type="button" onClick={() => postMutation(POST_MUTATION)}>Submit Link</StyledButton>
    </div>
  );
};

export default CreateLink;
