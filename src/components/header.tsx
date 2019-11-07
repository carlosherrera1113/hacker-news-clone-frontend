import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
width: 100%;
align-items: left;
background-color: darkorange;
`;

const Header: React.FC = () => {
  return (
    <Wrapper>
      <div>
        <div>Hacker News</div>
        <Link to="/">new</Link>
        <div>|</div>
        <Link to="/create">submit</Link>
      </div>
    </Wrapper>
  );
};

export default withRouter(Header);
