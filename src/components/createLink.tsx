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
padding:  0.5rem 3rem 0.5rem 3rem;
cursor: pointer;
border-style: none;
margin: 1rem;
border-radius: 6.25rem;
transition: all 0.2s ease-out;
outline: none;
&:hover {
    transform: translateY(-1px) scale(1.01);
    background: #ffaa00;
    box-shadow: 0rem 0.75rem 2.5rem rgba(255, 170, 0, 0.25);
}

`;

const StyledDiv = styled.div`
width: 100%;
display: flex;
position: relative;
flex-direction: column;
align-items: center;
justify-content: center;
`;

const StyledInput = styled.input`
width: 80%;
padding: 0.75rem 1rem 0.75rem 1rem;
font-family: sans-serif;
font-size: 0.9rem;
border-radius: 6.25rem;
border: 0.2rem solid rgba(255, 170, 0, 0.25);
margin-top: 1.5rem;
background-color: transparent;
transition: all 300ms;
color: gray;
text-align: start;
&:focus {
    outline: none;
}
&::placeholder {
    color: gray;
    text-align: start;
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
      <StyledButton type="button" onClick={() => postMutation(POST_MUTATION)}>Submit Link</StyledButton>
    </StyledDiv>
  );
};

export default CreateLink;
