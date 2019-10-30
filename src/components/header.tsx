import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div>
      <div>
        <div>Hacker News</div>
        <Link to="/">new</Link>
        <div>|</div>
        <Link to="/create">submit</Link>
      </div>
    </div>
  );
};

export default withRouter(Header);
