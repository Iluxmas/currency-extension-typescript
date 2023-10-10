import React from 'react';
import styled from 'styled-components';

export default function LoadingSpinner() {
  return (
    <SpinnerContainer>
      <Spinner></Spinner>
    </SpinnerContainer>
  );
}

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  // gap: 8px;
  // margin: 0 auto;
  margin-left: auto;
`;
const Spinner = styled.div`
  width: 15px;
  height: 15px;
  border: 2px solid #f3f3f3; /* Light grey */
  border-top: 2px solid #383636; /* Black */
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
