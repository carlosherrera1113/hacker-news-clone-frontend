import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
height: 3.5rem;
width: 100%;
background-color: white;
box-shadow: 0rem 0.25rem 1rem grey;
margin-bottom: 7rem;
display: flex;
align-items: center;
justify-content: space-evenly;
align-content: space-around;
`;

const Title = styled.div`
color: darkorange;
font-size: 2rem;
font-weight: 200;
flex-grow: 2;
padding: 1rem;
`;

const StyledLink = styled(Link)`
flex-grow: 1;
padding: 1rem;
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Title>Hacker News</Title>
      <StyledLink to="/">New Links</StyledLink>
      <StyledLink to="/create">Submit Link</StyledLink>
    </Wrapper>
  );
};

export default withRouter(Header);
