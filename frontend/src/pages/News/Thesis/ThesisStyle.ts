import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY}20;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const CreateButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${SEJONG_COLORS.CRIMSON_RED}ee;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export const ThesisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ThesisCard = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
`;

export const ThesisImageWrapper = styled.div`
  flex-shrink: 0;
  width: 80px;
  height: 110px;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;

  @media (max-width: 768px) {
    width: 60px;
    height: 80px;
  }
`;

export const ThesisThumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const ThesisContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ThesisContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem 0;
`;

export const ThesisTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;
  line-height: 1.4;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED}ee;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

export const ThesisMetadata = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 0.25rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

export const MetadataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${SEJONG_COLORS.GRAY};
  font-size: 0.85rem;

  svg {
    color: ${SEJONG_COLORS.COOL_GRAY};
    width: 14px;
    height: 14px;
  }

  @media (max-width: 768px) {
    font-size: 0.8rem;
  }
`;

export const PaginationWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;

  @media (max-width: 768px) {
    margin-top: 1.5rem;
  }
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: ${SEJONG_COLORS.GRAY};
  font-size: 1.1rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}10;
  border-radius: 8px;
  border: 1px dashed ${SEJONG_COLORS.COOL_GRAY}30;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
    font-size: 1rem;
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  background-color: ${SEJONG_COLORS.CRIMSON_RED}10;
  border-radius: 8px;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED}30;
  margin: 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem;
    padding: 1.5rem;
  }
`;

// SearchableBoard와 함께 사용하기 위한 추가 스타일
export const TableRowContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`;

export const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
`;

export const SearchResultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 0.95rem;
  color: ${SEJONG_COLORS.GRAY};

  strong {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }
`;

export const ClearSearchButton = styled.button`
  background: none;
  border: none;
  color: ${SEJONG_COLORS.GRAY};
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }
`;
