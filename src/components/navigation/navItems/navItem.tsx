import React from 'react';
import styled from 'styled-components';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

interface NavItemProps extends RouteComponentProps {
    link: string;
    route: string;
    clicked?: () => void;
}

const StyledLink = styled(Link)`
  display: flex;
  text-decoration: none;
  font-family: inherit;
  font-weight: 500;
  text-transform: none;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  padding: 1rem 2rem;
  font-size: 1.75rem;
  transition: all 0.2s ease-out;
  &:hover {
    color: ${({ theme }) => theme.colors.tertiary};
    transform: scale(1.02) translateY(-1px);
  }
  @media ${({ theme }) => theme.mediaQueries.small} {
    margin: 1rem 0;
    font-size: 1.6rem;
  }
`;

const NavItem: React.FC<NavItemProps> = ({ link, clicked, route }) => {
  return (
    <StyledLink
      onClick={clicked}
      to={route}
    >
      {link}
    </StyledLink>
  );
};

export default withRouter(NavItem);
