import styled from 'styled-components';
import { SEJONG_COLORS } from './../../../constants/colors';
import { media } from '../../../styles/media';

interface StyledButtonProps {
  isActive?: boolean;
}
// 세종대학교 컬러 상수
const colors = {
  primary: `${SEJONG_COLORS.CRIMSON_RED}`, // 세종대 메인 레드
  primaryDark: '#8B0000', // 더 진한 레드
  primaryLight: '#D32F2F', // 더 밝은 레드
  hover: '#F5F5F5', // 호버시 밝은 회색
};

export const Title = styled.h1`
  margin: 0 0 2.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};

  font-size: 2rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  font-weight: 600;
`;

export const HeaderContainer = styled.div`
  margin-bottom: 30px;
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${colors.primary};
`;
export const NavButtonGroup = styled.div`
  display: flex;
  overflow-x: auto; // 가로 스크롤 허용
  -webkit-overflow-scrolling: touch; // 부드러운 스크롤
  width: 100%;

  // 스크롤바 숨김
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  ${media.mobile} {
    margin-bottom: 10px;
  }
`;

export const NavButton = styled.button<StyledButtonProps>`
  padding: 12px 20px; // 패딩 조정
  font-size: 1rem;
  border: none;
  background: ${(props) => (props.isActive ? colors.primary : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  white-space: nowrap; // 텍스트 줄바꿈 방지
  flex-shrink: 0; // 버튼 크기 축소 방지

  ${media.mobile} {
    padding: 10px 15px; // 모바일에서 더 작은 패딩
    font-size: 0.9rem;
  }
`;

export const WriteButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  margin-right: 1rem;

  &:hover {
    background-color: #f8f9fa;
    border-color: #ccc;
  }

  ${media.mobile} {
    padding: 0.375rem 0.75rem;
    min-width: 70px;
    height: 32px;
    margin-right: 0.5rem;
    font-size: 0.85rem;
  }
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
  background-color: #fff;
  text-align: center;
`;

export const Th = styled.th`
  /*
  ${media.mobile} {
    padding: 12px 16px;
    font-size: 0.9rem;
  } */

  padding: 1.25rem 1rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}20;
  color: ${SEJONG_COLORS.GRAY};
  font-weight: 600;
  text-align: center;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};
  white-space: nowrap;

  &:first-child {
    border-top-left-radius: 8px;
    width: 5rem;
  }
  &:nth-child(2) {
    width: 30rem;
  }
  &:nth-child(3) {
    width: 7rem;
  }
  &:nth-child(4) {
    width: 9rem;
  }
  &:nth-child(5) {
    width: 9rem;
  }
  &:last-child {
    border-top-right-radius: 8px;
    width: 9rem;
  }
`;

export const Td = styled.td`
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;
  line-height: 1.5;
  text-align: center;

  ${media.mobile} {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;

export const Tr = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
`;

export const ViewCount = styled.td`
  padding: 16px 24px;
  border-bottom: 1px solid #ddd;

  ${media.mobile} {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
`;

export const TitleLink = styled.span`
  cursor: pointer;
  font-weight: 500;
  color: #333;
  text-align: left !important;

  &:hover {
    color: #666;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 40px;
  padding: 20px 0;

  ${media.mobile} {
    gap: 4px;
    margin-top: 20px;
    padding: 10px 0;
  }
`;

export const PageButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  height: 36px;
  padding: 0.25rem;
  font-size: 0.9rem;
  border: 1px solid ${(props) => (props.isActive ? '#666' : '#ddd')};
  background: ${(props) => (props.isActive ? '#666' : 'white')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => (props.isActive ? '#555' : '#f8f9fa')};
    border-color: #666;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: #f8f9fa;
    color: #adb5bd;
    border-color: #dee2e6;

    &:hover {
      background-color: #f8f9fa;
      color: #adb5bd;
      border-color: #dee2e6;
    }
  }

  ${media.mobile} {
    min-width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  ${media.mobile} {
    margin-top: 2rem;
    padding-top: 1.5rem;
    gap: 0.25rem;
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 4px;
  font-size: 1rem;
  border: 1px solid #feb2b2;
`;

export const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  font-size: 1.1rem;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin: 1rem 0;
`;

export const ResponsiveTable = styled(Table)`
  ${media.mobile} {
    font-size: 0.9rem;

    ${Td}, ${Th} {
      padding: 12px 16px;
    }
  }
`;
type SortDirection = 'asc' | 'desc';

export const SortableTh = styled(Th)<{
  isActive?: boolean;
  sortDirection?: SortDirection;
}>`
  cursor: pointer;
  user-select: none;
  position: relative;
  padding-right: 25px; // 화살표 아이콘 공간

  &:hover {
    background-color: #f1f3f5;
  }

  &:after {
    content: '${(props) => {
      if (!props.isActive) return '↕';
      return props.sortDirection === 'asc' ? '↑' : '↓';
    }}';
    position: absolute;
    right: 8px;
    opacity: ${(props) => (props.isActive ? 1 : 0.3)};
  }

  &:hover:after {
    opacity: 1;
  }
`;
