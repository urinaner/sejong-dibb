import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, PlusCircle, Edit2, Trash2 } from 'lucide-react';
import moment from 'moment';
import { Modal, useModal } from '../../../components/Modal';
import { LoadingSpinner } from '../../../components/LoadingSpinner';
import { AuthContext } from '../../../context/AuthContext';
import {
  useGetNewsList,
  useDeleteNews,
  newsKeys,
} from '../../../hooks/queries/useNews';
import { queryClient } from '../../../lib/react-query/queryClient';
import * as S from './NewsStyle';
import Pagination from '../../../common/Pagination/Pagination';
import { AxiosError } from 'axios';
import Container from '../../../styles/Container';

const News = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const pageSize = 10;
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();
  const API_BASE_URL = 'https://ibb.sejong.ac.kr';

  const {
    data: newsData,
    isLoading,
    isError,
    error,
  } = useGetNewsList({
    page: currentPage - 1,
    size: pageSize,
  });

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
        onError: (error: AxiosError) => {
          let errorMessage = '뉴스를 삭제하는 중 오류가 발생했습니다.';

          if (error.response?.status === 401) {
            errorMessage = '로그인이 필요합니다.';
          } else if (error.response?.status === 403) {
            errorMessage = '삭제 권한이 없습니다.';
          } else if (error.response?.status === 404) {
            errorMessage = '해당 뉴스를 찾을 수 없습니다.';
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

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <S.Container>
        <LoadingSpinner text="뉴스를 불러오는 중입니다..." />
      </S.Container>
    );
  }

  if (isError) {
    return (
      <S.Container>
        <S.ErrorMessage>
          {error instanceof Error
            ? error.message
            : '뉴스를 불러오는데 실패했습니다.'}
        </S.ErrorMessage>
      </S.Container>
    );
  }

  if (!newsData) {
    return (
      <S.Container>
        {auth?.isAdmin && (
          <S.AdminButtonGroup>
            <S.CreateButton onClick={() => navigate('/news/create')}>
              <PlusCircle size={20} />
              뉴스 작성
            </S.CreateButton>
          </S.AdminButtonGroup>
        )}
        <S.NoResults>등록된 뉴스가 없습니다.</S.NoResults>
      </S.Container>
    );
  }

  return (
    <Container>
      {auth?.isAdmin && (
        <S.AdminButtonGroup>
          <S.CreateButton onClick={() => navigate('/news/create')}>
            <PlusCircle size={20} />
            뉴스 작성
          </S.CreateButton>
        </S.AdminButtonGroup>
      )}
      <S.NewsGrid>
        {newsData.data.map((item) => (
          <S.NewsCard key={item.id} onClick={() => handleNewsClick(item.id)}>
            <S.NewsImage
              imageUrl={`${API_BASE_URL}${item.image}`}
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

      {newsData.totalPage > 1 && (
        <Pagination
          totalPages={newsData.totalPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default News;
