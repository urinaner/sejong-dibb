import styled from 'styled-components';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const TabContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  margin-top: 2rem;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid #e2e8f0;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.mobile} {
    gap: 0.5rem;
    padding: 0 1rem;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 1rem 2rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  color: ${(props) => (props.$isActive ? '#1a73e8' : '#4a5568')};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? '#1a73e8' : 'transparent')};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    color: #1a73e8;
    background: ${(props) => (props.$isActive ? 'transparent' : '#f8fafc')};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #1a73e8;
    border-radius: 4px;
  }

  ${media.mobile} {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
`;

export const TabContent = styled.div`
  padding: 2rem;
  min-height: 400px;
  width: fit-content;

  ${media.mobile} {
    padding: 1.5rem;
    min-height: 300px;
  }
`;

// 공통 스타일 컴포넌트들
export const Section = styled.section`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

export const SectionContent = styled.div`
  color: #4a5568;
  line-height: 1.6;
  font-size: 1rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #4a5568;
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 1rem 0;

  svg {
    flex-shrink: 0;
  }
`;
