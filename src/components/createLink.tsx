import React, { useState } from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useHistory } from 'react-router-dom';

import { usePostMutation, EntireFeedQuery, EntireFeedDocument } from '../generated/graphql';

const Wrapper = styled.div`
max-width: 70rem;
align-items: center;
padding: 8rem;
width: 100%;
box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
border-radius: 2rem;
margin: 0 auto;
background-color: ${({ theme }) => theme.colors.secondary};
`;

const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
`;

const StyledHeading = styled.h1`
font-family: sans-serif;
margin: inherit;
font-weight: 700;
font-size: 2.75rem;
color: grey;
`;

const StyledButton = styled.button`
font-family: sans-serif;
font-size: 1.4rem;
color: white;
background-color: ${({ theme }) => theme.colors.primary};
text-align: center;
padding:  0.5rem 3rem 0.5rem 3rem;
cursor: pointer;
border-style: none;
margin: 10%;
border-radius: 6.25rem;
outline: none;
transition: all 0.2s ease-out;
&:focus {
    outline: none;
}
&:hover {
    transform: translateY(-1px) scale(1.01);
    background: ${({ theme }) => theme.colors.tertiary};
    box-shadow: 0rem 0.75rem 2.5rem rgba(255, 170, 0, 0.25);
}
`;

const StyledInput = styled.input`
width: 100%;
padding: 0.75rem 1rem 0.75rem 1rem;
font-family: sans-serif;
font-size: 1.4rem;
border-radius: 0.5rem;
border: 0.2rem solid rgba(255, 170, 0, 0.25);
margin-top: 3.5rem;
background-color: ${({ theme }) => theme.colors.secondary};
transition: all 300ms;
color: grey;
text-align: start;
&:focus {
    outline: none;
}
&::placeholder {
    color: grey;
    text-align: start;
}
&:hover {
    transform: translateY(-0.1rem) scale(1.01);
    box-shadow: 0rem 0.75rem 2.5rem rgba(255, 170, 0, 0.25);
}
`;

export const POST_MUTATION = gql`
mutation Post($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      description
      createdAt
      url
    }
}
`;

const CreateLink: React.FC = () => {
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const history = useHistory();
  const [postMutation] = usePostMutation({ onCompleted: () => history.push('/') });

  const handleClick = () => {
    postMutation({
      variables: {
        description,
        url,
      },
      update: (cache, { data }) => {
        const query = cache.readQuery<EntireFeedQuery>({ query: EntireFeedDocument });

        // eslint-disable-next-line no-unused-expressions
        query!.feed.links.unshift(data!.post);

        cache.writeQuery({
          query: EntireFeedDocument,
          data,
        });
      },
    });
  };

  return (
    <Wrapper>
      <StyledForm>
        <StyledHeading>Submit Link</StyledHeading>
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
        <StyledButton type="button" onClick={handleClick}>Submit Link</StyledButton>
      </StyledForm>
    </Wrapper>
  );
};

export default CreateLink;
