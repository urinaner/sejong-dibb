import styled from "styled-components";
import { Box, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

// 테이블 컨테이너 스타일링
export const CourseTableContainer = styled(TableContainer)`
  margin-top: 2rem;
` as typeof TableContainer;

// 테이블 헤더 셀 스타일링
const TableHeadCell = styled(TableCell)`
  background-color: #f5f5f5;
  font-weight: 600;
  text-align: center;
  width: ${(props) => props.width || "auto"}; // 너비 속성 추가
`;

const CourseTable = styled(TableContainer)`
  margin-top: 2rem;
  overflow-x: hidden; // 가로 스크롤 방지
` as typeof TableContainer;

// 클릭 가능한 테이블 행 스타일링
export const ClickableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

// 상세 내용 컨테이너 스타일링
export const DetailContainer = styled(Box)`
  border: 1px solid #e0e0e0;
  border-top: none;
  padding: 1rem;
  background-color: #fafafa;
`;

// 상세 내용 헤더 스타일링
export const DetailHeader = styled(Box)`
  border-bottom: 1px solid #c41230;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

// 컨트롤 영역 스타일링
export const ControlArea = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

// 로딩 인디케이터 컨테이너
export const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

// 탭 메뉴 스타일링
export const TabMenu = styled(Box)`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

// 정보 패널 스타일링
export const InfoPanel = styled(Box)`
  border: 1px solid #e0e0e0;
  border-radius: 15px;
  padding: 1.5rem;
  margin: 1rem 0;
  position: relative;
`;

// 불릿 리스트 스타일링
export const BulletList = styled.ul`
  padding-left: 1.5rem;
  margin: 0.5rem 0;
`;

// 불릿 아이템 스타일링
export const BulletItem = styled.li`
  margin: 0.5rem 0;
`;

// 폼 페이퍼 스타일링
export const FormPaper = styled(Paper)`
  padding: 24px;
  margin-bottom: 24px;
`;

// 폼 제목 스타일링
export const FormTitle = styled(Box)`
  margin-bottom: 16px;
  font-weight: 600;
  font-size: 1.2rem;
`;

// 구분선 스타일링
export const FormDivider = styled.hr`
  margin: 24px 0;
  border: 0;
  border-top: 1px solid #e0e0e0;
`;
