import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
display: flex;
justify-content: center;
`;

const StyledSpinner = styled.svg`
animation: rotate 1s linear infinite;
margin: 10rem;
width: 10rem;
height: 10rem;

& .path {
    stroke: ${({ theme }) => theme.colors.primary};
    stroke-linecap: round;
    animation: dash 2s ease-in-out infinite;
  }

@keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
@keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`;

const Spinner: React.FC = () => (
  <Wrapper>
    <StyledSpinner viewBox="0 0 50 50">
      <circle
        className="path"
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="2"
      />
    </StyledSpinner>
  </Wrapper>
);

export default Spinner;
