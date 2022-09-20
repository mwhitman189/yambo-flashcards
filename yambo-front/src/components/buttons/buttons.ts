import styled from "styled-components";

export const SmallButton = styled.button`
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.colors.highlightSecondary};
  text-align: center;
  font-size: 0.75rem;
  border: none;
  outline: none;
  padding: 0.25em 0.75em;
  color: ${({ theme }) => theme.colors.inputBackground};
  &:focus,
  &:hover {
    background-color: #1fdb77;
    color: ${({ theme }) => theme.colors.grayPrimary};
  }
`;

export const MediumButton = styled(SmallButton)`
  font-size: 1rem;
`;
