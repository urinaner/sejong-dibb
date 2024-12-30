import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '../../../styles/media';

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 2rem;
  min-width: 300px;

  ${media.mobile} {
    min-width: auto;
    width: 100%;
    padding: 0.8rem 1rem;
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  transition: opacity ${({ theme }) => theme.transitions.fast};

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 600;
  white-space: nowrap;
  margin-left: 12px;

  ${media.mobile} {
    font-size: 1rem;
  }
`;
