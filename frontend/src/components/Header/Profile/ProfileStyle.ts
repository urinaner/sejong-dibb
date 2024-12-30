import styled from 'styled-components';

export const ProfileWrapper = styled.div`
  position: relative;
  margin-left: 2rem;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  transition: all ${({ theme }) => theme.transitions.fast};

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary.crimsonDark};
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
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

export const ProfileDropdownItem = styled.div`
  padding: 0.8rem 1rem;
  color: ${({ theme }) => theme.colors.grey[500]};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.grey[100]};
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grey[50]};
  }
`;
