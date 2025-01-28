import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const TabContainer = styled.div`
  margin-top: 1rem;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;

  ${media.mobile} {
    margin-top: 0.5rem;
    min-height: auto;
  }
`;

export const TabNavigation = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  margin-bottom: 1rem;

  ${media.mobile} {
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
`;

export const TabList = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.mobile} {
    justify-content: flex-start;
  }
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 1rem 2rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.5rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '500')};
  color: ${(props) =>
    props.$isActive ? SEJONG_COLORS.CRIMSON_RED : props.theme.colors.grey[500]};
  background: ${(props) =>
    props.$isActive ? SEJONG_COLORS.CRIMSON_RED + '10' : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;

  svg {
    color: currentColor;
    transition: color 0.2s ease;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${(props) =>
      props.$isActive ? SEJONG_COLORS.CRIMSON_RED : 'transparent'};
    transition: all 0.2s ease;
  }

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    background: ${SEJONG_COLORS.CRIMSON_RED}10;
  }

  ${media.mobile} {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
`;

export const TabLabel = styled.span`
  ${media.mobile} {
    font-size: 0.95rem;
  }
`;

export const TabContent = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px;
  padding: 1.5rem;
  flex: 1;

  ${media.mobile} {
    padding: 1rem;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
`;

export const SectionTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
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

  ${media.mobile} {
    min-height: 150px;
  }
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  background-color: #fff5f5;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 1rem 0;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED}20;
  text-align: center;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    margin-right: 0.5rem;
  }

  ${media.mobile} {
    border-radius: 0;
    margin: 0;
    border-left: 0;
    border-right: 0;
  }
`;

// 기본 정보 섹션 스타일
export const Section = styled.section`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.mobile} {
    margin-bottom: 1.5rem;
  }
`;

export const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  ${media.mobile} {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
  }
`;

export const SectionContent = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  li {
    color: ${(props) => props.theme.colors.grey[500]};
    line-height: 1.6;
    padding-left: 1.25rem;
    position: relative;
    font-size: 0.95rem;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.75rem;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${SEJONG_COLORS.CRIMSON_RED};
    }
  }

  ${media.mobile} {
    li {
      font-size: 0.9rem;
      padding-left: 1rem;
    }
  }
`;
