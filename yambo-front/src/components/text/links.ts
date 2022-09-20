import styled from "styled-components";
import { NavLink } from "react-router-dom";

export const IconLink = styled(NavLink)`
  font-size: 1.75rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  &:hover {
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.textPrimary};
  }
`;

export const RegisterLink = styled(NavLink)`
  font-size: 1.125rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textPrimary};
  &:hover {
    text-shadow: 0 0 1px ${({ theme }) => theme.colors.textPrimary};
  }
`;
