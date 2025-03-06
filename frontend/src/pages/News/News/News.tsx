import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import moment from 'moment';
import { Modal, useModal } from '../../../components/Modal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { AuthContext } from '../../../context/AuthContext';
import {
  useGetNewsList,
  useDeleteNews,
  useSearchNews,
  newsKeys,
} from '../../../hooks/queries/useNews';
import { queryClient } from '../../../lib/react-query/queryClient';
import * as S from './NewsStyle';
import Pagination from '../../../common/Pagination/Pagination';
import SearchComponent from '../../../common/SearchComponent';
import axios from 'axios';
import Container from '../../../styles/Container';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';
import { media } from '../../../styles/media';

const News = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();

  // 쿼리 파라미터 상태 관리
  const [queryParams, setQueryParams] = useState({
    page: 0,
    size: 10,
    sort: 'createDate',
    sortDirection: 'DESC',
  });

  // 검색 관련 상태 관리
  const [keyword, setKeyword] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // 뉴스 목록 조회 API 훅
  const {
    data: newsData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetNewsList({
    page: queryParams.page,
    size: queryParams.size,
    // 정렬 기능 백엔드 지원 시 활성화
    // sort: queryParams.sort,
    // sortDirection: queryParams.sortDirection,
  });

  // 검색 API 훅
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: searchRefetch,
  } = useSearchNews(
    {
      keyword,
      page: queryParams.page,
      size: queryParams.size,
    },
    { enabled: isSearching && !!keyword },
  );

  const deleteMutation = useDeleteNews();

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (newPage: number) => {
      setQueryParams((prev) => ({ ...prev, page: newPage - 1 }));
      window.scrollTo({ top: 0, behavior: 'smooth' });

      if (isSearching && keyword) {
        searchRefetch();
      } else {
        refetch();
      }
    },
    [refetch, searchRefetch, isSearching, keyword],
  );

  /*
  // 정렬 기능 - 백엔드 지원 시 활성화
  const handleSort = useCallback(
    (field: string) => {
      // 타입 가드로 유효한 정렬 필드인지 확인
      if (field === 'createDate' || field === 'view' || field === 'title') {
        setQueryParams((prev) => ({
          ...prev,
          sort: field,
          sortDirection:
            prev.sort === field && prev.sortDirection === 'DESC'
              ? 'ASC'
              : 'DESC',
          page: 0,
        }));

        if (isSearching && keyword) {
          searchRefetch();
        } else {
          refetch();
        }
      }
    },
    [refetch, searchRefetch, isSearching, keyword],
  );
  */

  // 검색 핸들러
  const handleSearch = useCallback(
    (searchKeyword: string) => {
      setKeyword(searchKeyword);
      setIsSearching(!!searchKeyword);
      setQueryParams((prev) => ({ ...prev, page: 0 }));

      if (searchKeyword) {
        searchRefetch();
      } else {
        setIsSearching(false);
        refetch();
      }
    },
    [searchRefetch, refetch],
  );

  // 검색 초기화 핸들러
  const handleClearSearch = useCallback(() => {
    setKeyword('');
    setIsSearching(false);
    refetch();
  }, [refetch]);

  const handleNewsClick = useCallback(
    (newsId: number) => {
      navigate(`/news/${newsId}`);
    },
    [navigate],
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent, newsId: number) => {
      e.stopPropagation();
      navigate(`/news/edit/${newsId}`);
    },
    [navigate],
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent, newsId: number) => {
      e.stopPropagation();
      openModal(
        <>
          <Modal.Header>뉴스 삭제</Modal.Header>
          <Modal.Content>
            <p>정말로 이 뉴스를 삭제하시겠습니까?</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
            <Modal.DeleteButton onClick={() => confirmDelete(newsId)}>
              삭제
            </Modal.DeleteButton>
          </Modal.Footer>
        </>,
      );
    },
    [openModal],
  );

  const confirmDelete = async (newsId: number) => {
    try {
      await deleteMutation.mutateAsync(newsId, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: newsKeys.lists() });

          openModal(
            <>
              <Modal.Header>삭제 완료</Modal.Header>
              <Modal.Content>
                <p>뉴스가 성공적으로 삭제되었습니다.</p>
              </Modal.Content>
              <Modal.Footer>
                <Modal.CloseButton />
              </Modal.Footer>
            </>,
          );
        },
        onError: (error: Error) => {
          let errorMessage = '뉴스를 삭제하는 중 오류가 발생했습니다.';

          // 타입 가드를 사용하여 AxiosError인지 확인
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 401) {
              errorMessage = '로그인이 필요합니다.';
            } else if (error.response?.status === 403) {
              errorMessage = '삭제 권한이 없습니다.';
            } else if (error.response?.status === 404) {
              errorMessage = '해당 뉴스를 찾을 수 없습니다.';
            }
          }

          openModal(
            <>
              <Modal.Header>삭제 실패</Modal.Header>
              <Modal.Content>
                <p>{errorMessage}</p>
              </Modal.Content>
              <Modal.Footer>
                <Modal.CloseButton />
              </Modal.Footer>
            </>,
          );
        },
      });
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  // 검색 중이면 검색 결과를, 아니면 일반 목록을 표시
  const news = isSearching ? searchData?.data || [] : newsData?.data || [];
  const totalPages = isSearching
    ? searchData?.totalPage || 0
    : newsData?.totalPage || 0;
  const currentPage = (isSearching ? searchData?.page : newsData?.page) || 0;
  const isLoadingData = isLoading || isSearchLoading;
  const errorData = (isSearching ? searchError : error) || null;

  // 카드 형태의 뉴스 렌더링을 위한 커스텀 렌더러
  const renderNewsGrid = useCallback(() => {
    if (!news.length) {
      return <S.NoResults>등록된 뉴스가 없습니다.</S.NoResults>;
    }

    return (
      <S.NewsGrid>
        {news.map((item) => (
          <S.NewsCard key={item.id} onClick={() => handleNewsClick(item.id)}>
            <S.NewsImage
              imageUrl={encodeURI(item.image)}
              onError={(e: React.SyntheticEvent<HTMLDivElement>) => {
                e.currentTarget.classList.add('error');
              }}
            />
            <S.NewsContent>
              <S.NewsTitle>{item.title}</S.NewsTitle>
              <S.NewsDate>
                {moment(item.createDate).format('YYYY.MM.DD')}
              </S.NewsDate>
              <S.NewsDescription>{item.content}</S.NewsDescription>
              <S.NewsFooter>
                <S.NewsViews>
                  <Eye size={16} />
                  {item.view}
                </S.NewsViews>
                {auth?.isAdmin && (
                  <S.AdminActions>
                    <S.ActionButton onClick={(e) => handleEdit(e, item.id)}>
                      <Edit2 size={16} />
                    </S.ActionButton>
                    <S.ActionButton onClick={(e) => handleDelete(e, item.id)}>
                      <Trash2 size={16} />
                    </S.ActionButton>
                  </S.AdminActions>
                )}
              </S.NewsFooter>
            </S.NewsContent>
          </S.NewsCard>
        ))}
      </S.NewsGrid>
    );
  }, [news, handleNewsClick, auth?.isAdmin, handleEdit, handleDelete]);

  return (
    <Container>
      <HeaderSection>
        <Title>세종대학교 소식</Title>
        <SearchComponent
          onSearch={handleSearch}
          placeholder="뉴스 제목이나 내용으로 검색"
          initialValue={keyword}
          searchInProgress={isLoadingData}
          section="news"
        />
      </HeaderSection>

      {isSearching && keyword && (
        <SearchResultInfo>
          <span>
            <strong>&ldquo;{keyword}&rdquo;</strong>에 대한 검색 결과: 총{' '}
            <Count>{news.length}</Count>건
          </span>
          <ClearSearchButton onClick={handleClearSearch}>
            검색 초기화
          </ClearSearchButton>
        </SearchResultInfo>
      )}

      {isLoadingData ? (
        <S.LoadingSpinner>뉴스를 불러오는 중입니다...</S.LoadingSpinner>
      ) : errorData ? (
        <S.ErrorMessage>
          {error instanceof Error
            ? error.message
            : '뉴스를 불러오는데 실패했습니다.'}
        </S.ErrorMessage>
      ) : (
        renderNewsGrid()
      )}

      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage + 1}
          onPageChange={handlePageChange}
        />
      )}

      {/* 글쓰기 버튼 - 하단에 고정 */}
      {auth?.isAdmin && (
        <FloatingButtonContainer>
          <WriteButton onClick={() => navigate('/news/create')}>
            <PlusCircle size={16} />
            <ButtonText>뉴스 작성</ButtonText>
          </WriteButton>
        </FloatingButtonContainer>
      )}
    </Container>
  );
};

const Title = styled.h1`
  margin: 0; // 마진 제거
  padding-top: 10px;
  font-size: 1.8rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};

  ${media.mobile} {
    font-size: 1.5rem;
  }
`;

const SearchResultInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  background-color: #f8f9fa;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #4a5568;

  strong {
    color: #2d3748;
  }
`;

const Count = styled.span`
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
`;

const ClearSearchButton = styled.button`
  background: none;
  border: none;
  color: #4a5568;
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.25rem 0.5rem;

  &:hover {
    color: #2d3748;
  }
`;

const WriteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  border-radius: 4px;
  min-width: 100px;
  height: 40px;
  font-weight: 500;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #b71c1c;
  }

  ${media.mobile} {
    padding: 0.375rem 0.75rem;
    min-width: 70px;
    height: 36px;
    font-size: 0.85rem;
  }
`;

const ButtonText = styled.span`
  ${media.mobile} {
    display: none;
  }
`;

const FloatingButtonContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 10;

  ${media.mobile} {
    bottom: 1.5rem;
    right: 1.5rem;
  }
`;
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};
  padding-bottom: 0.75rem;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export default News;
