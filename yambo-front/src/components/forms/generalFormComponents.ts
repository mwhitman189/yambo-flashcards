import styled from "styled-components";

export const StyledLabel = styled.label`
  color: ${({ theme }) => theme.colors.textPrimary};
`;

export const StyledFormTextArea = styled.textarea`
  width: 100%;
  padding: 0.25rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  font-size: 1.25rem;

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.5;
  }
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.highlightPrimaryLight};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;

export const StyledTextInput = styled.input`
  width: 100%;
  padding: 0.25rem;
  border-radius: 4px;
  text-align: left;
  color: ${({ theme }) => theme.colors.textSecondary};
  background-color: ${({ theme }) => theme.colors.inputBackground};
  font-size: 1.25rem;
  border-color: ${({ theme }) => theme.colors.grayPrimary};

  ::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
    opacity: 0.5;
    font-size: 14px;
  }
  &:focus {
    border: 2px solid ${({ theme }) => theme.colors.highlightPrimaryLight};
  }
  &:focus::placeholder {
    color: transparent;
  }
`;
