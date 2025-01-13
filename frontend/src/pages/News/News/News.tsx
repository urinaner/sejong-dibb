import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import moment from 'moment';
import { Modal, useModal } from '../../../components/Modal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { AuthContext } from '../../../context/AuthContext';
import { useGetNewsList, useDeleteNews, newsKeys } from '../../../api/news';
import { queryClient } from '../../../lib/react-query/queryClient';
import {
  Container,
  NewsGrid,
  NewsCard,
  NewsImage,
  NewsContent,
  NewsTitle,
  NewsDate,
  NewsDescription,
  NewsFooter,
  NewsViews,
  Pagination,
  PageList,
  PageItem,
  PageButton,
  PaginationButton,
  ErrorMessage,
  NoResults,
  AdminButtonGroup,
  CreateButton,
  ActionButton,
  AdminActions,
} from './NewsStyle';

const News = () => {
  const [currentPage, setCurrentPage] = React.useState(0);
  const pageSize = 10;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();

  const {
    data: newsData,
    isLoading,
    isError,
    error,
  } = useGetNewsList({ page: currentPage, size: pageSize });

  const deleteMutation = useDeleteNews();

  const handleNewsClick = (newsId: number) => {
    navigate(`/news/${newsId}`);
  };

  const handleEdit = (e: React.MouseEvent, newsId: number) => {
    e.stopPropagation();
    navigate(`/news/edit/${newsId}`);
  };

  const handleDelete = (e: React.MouseEvent, newsId: number) => {
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
  };

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
      });
    } catch (error) {
      openModal(
        <>
          <Modal.Header>삭제 실패</Modal.Header>
          <Modal.Content>
            <p>뉴스를 삭제하는 중 오류가 발생했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < (newsData?.totalPages ?? 0)) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (!newsData) return null;

    const pages = [];
    const currentPageNum = currentPage + 1;
    const totalPages = newsData.totalPages;

    // 첫 페이지와 이전 버튼
    pages.push(
      <PaginationButton
        key="first"
        direction="prev"
        onClick={() => handlePageChange(0)}
        disabled={currentPageNum === 1}
      >
        ⟪ 처음
      </PaginationButton>,
      <PaginationButton
        key="prev"
        direction="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPageNum === 1}
      >
        ⟨ 이전
      </PaginationButton>,
    );

    // 페이지 번호 렌더링
    const pageItems = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pageItems.push(
          <PageItem key={i}>
            <PageButton
              onClick={() => handlePageChange(i - 1)}
              isActive={i === currentPageNum}
            >
              {i}
            </PageButton>
          </PageItem>,
        );
      }
    } else {
      let startPage = Math.max(1, currentPageNum - 4);
      const endPage = Math.min(totalPages, startPage + 9);

      if (endPage - startPage < 9) {
        startPage = Math.max(1, endPage - 9);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageItems.push(
          <PageItem key={i}>
            <PageButton
              onClick={() => handlePageChange(i - 1)}
              isActive={i === currentPageNum}
            >
              {i}
            </PageButton>
          </PageItem>,
        );
      }
    }

    pages.push(<PageList key="pageList">{pageItems}</PageList>);

    // 다음과 마지막 페이지 버튼
    pages.push(
      <PaginationButton
        key="next"
        direction="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPageNum === totalPages}
      >
        다음 ⟩
      </PaginationButton>,
      <PaginationButton
        key="last"
        direction="next"
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={currentPageNum === totalPages}
      >
        마지막 ⟫
      </PaginationButton>,
    );

    return <Pagination>{pages}</Pagination>;
  };

  if (isLoading) {
    return (
      <Container>
        <LoadingSpinner text="뉴스를 불러오는 중입니다..." />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorMessage>
          {error instanceof Error
            ? error.message
            : '뉴스를 불러오는데 실패했습니다.'}
        </ErrorMessage>
      </Container>
    );
  }

  if (!newsData?.data || newsData.data.length === 0) {
    return (
      <Container>
        {auth?.isAdmin && (
          <AdminButtonGroup>
            <CreateButton onClick={() => navigate('/news/create')}>
              <PlusCircle size={20} />
              뉴스 작성
            </CreateButton>
          </AdminButtonGroup>
        )}
        <NoResults>등록된 뉴스가 없습니다.</NoResults>
      </Container>
    );
  }

  return (
    <Container>
      {auth?.isAdmin && (
        <AdminButtonGroup>
          <CreateButton onClick={() => navigate('/news/create')}>
            <PlusCircle size={20} />
            뉴스 작성
          </CreateButton>
        </AdminButtonGroup>
      )}
      <NewsGrid>
        {newsData.data.map((item) => (
          <NewsCard key={item.id} onClick={() => handleNewsClick(item.id)}>
            <NewsImage
              imageUrl={`https://dibb-bucket.s3.ap-northeast-2.amazonaws.com/news/${item.image}`}
              onError={(e: React.SyntheticEvent<HTMLDivElement>) => {
                e.currentTarget.classList.add('error');
              }}
            />
            <NewsContent>
              <NewsTitle>{item.title}</NewsTitle>
              <NewsDate>
                {moment(item.createDate).format('YYYY.MM.DD')}
              </NewsDate>
              <NewsDescription>{item.content}</NewsDescription>
              <NewsFooter>
                <NewsViews>
                  <Eye size={16} />
                  {item.view}
                </NewsViews>
                {auth?.isAdmin && (
                  <AdminActions>
                    <ActionButton onClick={(e) => handleEdit(e, item.id)}>
                      <Edit2 size={16} />
                    </ActionButton>
                    <ActionButton onClick={(e) => handleDelete(e, item.id)}>
                      <Trash2 size={16} />
                    </ActionButton>
                  </AdminActions>
                )}
              </NewsFooter>
            </NewsContent>
          </NewsCard>
        ))}
      </NewsGrid>
      {newsData.totalPages > 1 && renderPagination()}
    </Container>
  );
};

export default News;
