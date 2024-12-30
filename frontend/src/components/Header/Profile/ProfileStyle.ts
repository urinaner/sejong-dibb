// ProfileStyle.ts
import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  position: relative;
  margin-left: 2rem;
`;

export const LoginButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 1rem;
  font-weight: 500;
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary.crimson};
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0.4rem 1rem;
    font-size: 0.9rem;
  }
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  ${({ theme }) => theme.media.mobile} {
    padding: 0.5rem 0;

    span {
      display: none;
    }
  }
`;

export const ProfileDropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 200px;
  margin-top: 0.5rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  z-index: 100;
`;

export const ProfileDropdownItem = styled.div`
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:first-child {
    font-weight: 500;
    cursor: default;

    &:hover {
      background-color: transparent;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[200]};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }
`;
