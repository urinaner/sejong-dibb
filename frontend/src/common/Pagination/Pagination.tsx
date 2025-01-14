import React from 'react';
import * as S from './PaginationStyle';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = [];

  pages.push(
    <S.PageButton
      key="first"
      onClick={() => onPageChange(1)}
      disabled={currentPage === 1}
    >
      ⟪
    </S.PageButton>,
    <S.PageButton
      key="prev"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    >
      ⟨
    </S.PageButton>,
  );

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <S.PageButton
        key={i}
        onClick={() => onPageChange(i)} // i - 1 제거
        isActive={i === currentPage}
      >
        {i}
      </S.PageButton>,
    );
  }

  pages.push(
    <S.PageButton
      key="next"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    >
      ⟩
    </S.PageButton>,
    <S.PageButton
      key="last"
      onClick={() => onPageChange(totalPages)} // totalPages - 1 제거
      disabled={currentPage === totalPages}
    >
      ⟫
    </S.PageButton>,
  );

  return <S.PaginationContainer>{pages}</S.PaginationContainer>;
};

export default Pagination;
