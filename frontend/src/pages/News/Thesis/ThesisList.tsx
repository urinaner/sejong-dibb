import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../../hooks/useAuth';
import { apiEndpoints } from '../../../config/apiConfig';
import { Edit, Plus, Trash2 } from 'lucide-react';
import * as S from './ThesisStyle';

interface ThesisItem {
  id: number;
  author: string;
  journal: string;
  content: string;
  link: string;
  publicationDate: string;
  thesisImage: string;
  publicationCollection: string;
  publicationIssue: string;
  publicationPage: string;
  issn: string;
}

interface ThesisResponse {
  message: string;
  page: number;
  totalPage: number;
  data: ThesisItem[];
}

const ThesisList: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [theses, setTheses] = useState<ThesisItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchTheses = async () => {
      setLoading(true);
      try {
        const response = await axios.get<ThesisResponse>(
          apiEndpoints.thesis.listWithPage(currentPage, 10),
        );

        if (response.data?.data) {
          setTheses(response.data.data);
          setTotalPages(response.data.totalPage);
        } else {
          throw new Error('Invalid data format');
        }
      } catch (err) {
        setError('논문 목록을 불러오는데 실패했습니다.');
        console.error('Error fetching theses:', err);
        setTheses([]); // 에러 시 빈 배열로 초기화
      } finally {
        setLoading(false);
      }
    };

    fetchTheses();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  if (loading) {
    return <S.LoadingSpinner>Loading...</S.LoadingSpinner>;
  }

  if (error) {
    return <S.ErrorMessage>{error}</S.ErrorMessage>;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>논문</S.Title>
        {auth?.isAuthenticated && (
          <S.ActionButtons>
            <S.CreateButton onClick={() => navigate('/news/thesis/create')}>
              <Plus size={18} />
              논문 등록
            </S.CreateButton>
          </S.ActionButtons>
        )}
      </S.Header>

      <S.ThesisList>
        {theses.length > 0 ? (
          theses.map((thesis) => (
            <S.ThesisItem key={thesis.id}>
              <S.ThesisThumbnail>
                <img
                  src={thesis.thesisImage || '/paperImage.png'}
                  alt="논문 썸네일"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/paperImage.png';
                  }}
                />
              </S.ThesisThumbnail>
              <S.ThesisContent
                onClick={() => navigate(`/news/thesis/${thesis.id}`)}
              >
                <S.ThesisTitle>{thesis.content}</S.ThesisTitle>
                <S.ThesisInfo>
                  <span>저자: {thesis.author}</span>
                  <span>저널: {thesis.journal}</span>
                  <span>발행일: {formatDate(thesis.publicationDate)}</span>
                </S.ThesisInfo>
                {thesis.publicationCollection && (
                  <S.PublicationInfo>
                    {`Vol. ${thesis.publicationCollection}${
                      thesis.publicationIssue
                        ? `, No. ${thesis.publicationIssue}`
                        : ''
                    }${thesis.publicationPage ? `, pp. ${thesis.publicationPage}` : ''}`}
                  </S.PublicationInfo>
                )}
                {auth?.isAuthenticated && (
                  <S.ActionButtonGroup>
                    <S.EditButton
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/news/thesis/edit/${thesis.id}`);
                      }}
                    >
                      <Edit size={16} />
                      수정
                    </S.EditButton>
                  </S.ActionButtonGroup>
                )}
              </S.ThesisContent>
            </S.ThesisItem>
          ))
        ) : (
          <S.EmptyMessage>등록된 논문이 없습니다.</S.EmptyMessage>
        )}
      </S.ThesisList>

      {totalPages > 1 && (
        <S.Pagination>
          <S.PageButton
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            이전
          </S.PageButton>
          <span>
            {currentPage + 1} / {totalPages}
          </span>
          <S.PageButton
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            다음
          </S.PageButton>
        </S.Pagination>
      )}
    </S.Container>
  );
};

export default ThesisList;
