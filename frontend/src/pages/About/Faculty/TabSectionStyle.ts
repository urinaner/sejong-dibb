import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const TabContainer = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  overflow: hidden;
  margin-top: 2rem;
`;

export const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};
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

  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  color: ${(props) =>
    props.$isActive ? SEJONG_COLORS.CRIMSON_RED : props.theme.colors.grey[500]};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${(props) => (props.$isActive ? SEJONG_COLORS.CRIMSON_RED : 'transparent')};
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    background: ${(props) =>
      props.$isActive ? 'transparent' : props.theme.colors.grey[50]};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px ${SEJONG_COLORS.CRIMSON_RED};
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
  font-size: 1.25rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};
`;

export const SectionContent = styled.div`
  color: ${(props) => props.theme.colors.grey[500]};
  line-height: 1.6;
  font-size: 1rem;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${(props) => props.theme.colors.grey[500]};
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fff5f5;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 1rem 0;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};

  svg {
    flex-shrink: 0;
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }
`;
