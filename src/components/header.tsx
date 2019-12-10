import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.header`
height: 4.5rem;
width: 100%;
background-color: white;
box-shadow: 0rem 0.25rem 1rem grey;
margin-bottom: 7rem;
display: flex;
align-items: center;
justify-content: space-evenly;
align-content: space-around;
`;

const Title = styled(Link)`
text-decoration: none;
color: darkorange;
font-size: 2rem;
font-weight: 200;
flex-grow: 1;
padding: 1rem;
`;

const StyledLink = styled(Link)`
font-size: 1.1rem;
margin: 3rem;
cursor: pointer;
color: darkorange;
text-decoration: none;
transition: all 0.2s;
&:hover {
  display: inline-block;
  transform: scale(1.02) translateY(-1px);
  color: #FFAA00;
  text-decoration: underline;
}
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <Title to="/">Hacker News</Title>
      <StyledLink to="/create">Submit Link</StyledLink>
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to="/signUp">Sign Up</StyledLink>
    </Wrapper>
  );
};

export default withRouter(Header);
