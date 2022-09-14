import React from 'react';
import styled from "styled-components";

const StyleErrorModal = styled.div<{ theme: { [key: string]: any }; cardView?: string }>`
  position: absolute;
  width: 100%;
  padding: 1.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme?.colors?.grayPrimary};
  color: ${({ theme }) => theme?.colors?.textPrimary};
  border: 2px solid;
  border-color: ${({ theme }) => theme?.colors?.highlightPrimary};
  border-radius: 8px;
  text-align: center;
  z-index: 10;
`;

const NotFoundHeader = styled.h2`
  margin: 0;
`;

const ErrorModal = ({error}: any) => {
  return (
    <StyleErrorModal>
      <NotFoundHeader>ゴメンね</NotFoundHeader>
      <div>{error}</div>
    </StyleErrorModal>
  );
}

export default ErrorModal;
