import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { apiEndpoints } from '../../config/apiConfig';

interface SeminarDetail {
  id: number;
  name: string;
  writer: string;
  place: string;
  startDate: string;
  endDate: string;
  speaker: string;
  company: string;
}

const SeminarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const [seminar, setSeminar] = useState<SeminarDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSeminarDetail = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get<SeminarDetail>(
          apiEndpoints.seminar.get(id),
        );
        setSeminar(response.data);
      } catch (error) {
        console.error('Failed to fetch seminar details:', error);
        setError('세미나 정보를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchSeminarDetail();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '-')
      .replace('.', '');
  };

  if (loading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;
  if (!seminar) return <ErrorMessage>세미나를 찾을 수 없습니다.</ErrorMessage>;

  return (
    <Container>
      <Card>
        <Header>
          <Title>{seminar.name}</Title>
          {auth?.isAuthenticated && (
            <ButtonGroup>
              <EditButton
                onClick={() => navigate(`/seminar/edit/${seminar.id}`)}
              >
                수정
              </EditButton>
              <DeleteButton onClick={() => {}}>삭제</DeleteButton>
            </ButtonGroup>
          )}
        </Header>

        <InfoGrid>
          <InfoRow>
            <InfoLabel>발표자</InfoLabel>
            <InfoValue>{seminar.speaker}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>소속</InfoLabel>
            <InfoValue>{seminar.company}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>장소</InfoLabel>
            <InfoValue>{seminar.place}</InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>일시</InfoLabel>
            <InfoValue>
              {formatDate(seminar.startDate)}
              {seminar.startDate !== seminar.endDate &&
                ` ~ ${formatDate(seminar.endDate)}`}
            </InfoValue>
          </InfoRow>
          <InfoRow>
            <InfoLabel>작성자</InfoLabel>
            <InfoValue>{seminar.writer}</InfoValue>
          </InfoRow>
        </InfoGrid>

        <ButtonGroup style={{ marginTop: '2rem' }}>
          <BackButton onClick={() => navigate('/news/seminar')}>
            목록으로
          </BackButton>
        </ButtonGroup>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a202c;
  margin: 0;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 1rem;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #e2e8f0;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #4a5568;
`;

const InfoValue = styled.span`
  color: #2d3748;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
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

  &:hover {
    background-color: #f8f9fa;
    border-color: #ccc;
  }
`;

const BackButton = styled(Button)`
  background-color: white;
`;

const EditButton = styled(Button)`
  background-color: white;
`;

const DeleteButton = styled(Button)`
  background-color: white;
  color: #dc3545;

  &:hover {
    background-color: #fff5f5;
    border-color: #dc3545;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 4px;
  font-size: 1rem;
  border: 1px solid #feb2b2;
`;

export default SeminarDetail;
