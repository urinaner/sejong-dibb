import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { Modal, useModal } from '../../components/Modal';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import {
  useDeleteSeminar,
  useSeminar,
  seminarKeys,
} from '../../hooks/queries/useSeminar';
import { queryClient } from '../../lib/react-query/queryClient';
import { media } from '../../styles/media';

const SeminarDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();
  const deleteMutation = useDeleteSeminar();

  const {
    data: seminar,
    isLoading,
    error,
  } = useSeminar(Number(id), {
    enabled: !!id,
  });

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

  const formatTime = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const showConfirmModal = () => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#F59E0B" />
          세미나 삭제
        </Modal.Header>
        <Modal.Content>
          <p>정말로 이 세미나를 삭제하시겠습니까?</p>
          <p>삭제된 세미나는 복구할 수 없습니다.</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
          <DeleteButton
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? '삭제 중...' : '삭제'}
          </DeleteButton>
        </Modal.Footer>
      </>,
    );
  };

  const showResultModal = (success: boolean) => {
    openModal(
      <>
        <Modal.Header>
          {success ? (
            <CheckCircle size={48} color="#38A169" />
          ) : (
            <AlertTriangle size={48} color="#E53E3E" />
          )}
          {success ? '삭제 완료' : '삭제 실패'}
        </Modal.Header>
        <Modal.Content>
          <p>
            {success
              ? '세미나가 성공적으로 삭제되었습니다.'
              : '세미나 삭제 중 오류가 발생했습니다.'}
          </p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton
            onClick={() => {
              if (success) {
                navigate('/news/seminar');
              }
            }}
          />
        </Modal.Footer>
      </>,
    );
  };

  const handleDelete = async () => {
    if (!id || !seminar) return;

    try {
      await deleteMutation.mutateAsync(Number(id), {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: seminarKeys.all });
          showResultModal(true);
        },
        onError: () => {
          showResultModal(false);
        },
      });
    } catch (error) {
      console.error('Failed to delete seminar:', error);
    }
  };

  if (isLoading) return <LoadingSpinner>Loading...</LoadingSpinner>;
  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;
  if (!seminar) return <ErrorMessage>세미나를 찾을 수 없습니다.</ErrorMessage>;

  return (
    <PageContainer>
      <ContentWrapper>
        <Card>
          <Header>
            <TitleSection>
              <Title>{seminar.name}</Title>
              <SubInfo>
                <WriterInfo>
                  <InfoLabel>작성자:</InfoLabel>
                  <span>{seminar.writer}</span>
                </WriterInfo>
                <DateInfo>
                  {formatDate(seminar.startTime)}{' '}
                  {formatTime(seminar.startTime)}
                  {' ~ '}
                  {seminar.startTime !== seminar.endTime && (
                    <>
                      {formatDate(seminar.endTime)}{' '}
                      {formatTime(seminar.endTime)}
                    </>
                  )}
                </DateInfo>
              </SubInfo>
            </TitleSection>
            {auth?.isAuthenticated && (
              <ButtonGroup>
                <EditButton
                  onClick={() => navigate(`/news/seminar/edit/${seminar.id}`)}
                >
                  수정
                </EditButton>
                <DeleteButton
                  onClick={showConfirmModal}
                  disabled={deleteMutation.isPending}
                >
                  {deleteMutation.isPending ? '삭제 중...' : '삭제'}
                </DeleteButton>
              </ButtonGroup>
            )}
          </Header>

          <MainContent>
            <InfoSection>
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
              </InfoGrid>
            </InfoSection>
          </MainContent>

          <Footer>
            <BackButton onClick={() => navigate('/news/seminar')}>
              목록으로
            </BackButton>
          </Footer>
        </Card>
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fff;
  padding: 40px 20px;
`;

const ContentWrapper = styled.div`
  width: 1000px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 100%;
    max-width: 1000px;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  padding: 3rem 4rem;
  margin: 0 auto;

  @media (max-width: 1024px) {
    padding: 2rem;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
`;

const TitleSection = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a202c;
  margin: 0 0 1rem 0;
  line-height: 1.2;

  ${media.mobile} {
    font-size: 1.75rem;
  }
`;

const SubInfo = styled.div`
  display: flex;
  gap: 2rem;
  color: #64748b;
  font-size: 0.95rem;

  ${media.mobile} {
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const DateInfo = styled.div`
  color: #64748b;
`;

const MainContent = styled.div`
  margin: 2rem 0;
`;

const InfoSection = styled.section`
  padding: 2rem 0;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 1rem;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: #64748b;
  font-size: 0.9rem;
`;

const InfoValue = styled.span`
  color: #1e293b;
  font-size: 1.1rem;
  padding: 0.5rem 0;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;

  &:hover {
    background-color: #f8f9fa;
    border-color: #cbd5e1;
  }
`;

const BackButton = styled(Button)`
  background-color: #f8fafc;
  min-width: 120px;
`;

const EditButton = styled(Button)`
  background-color: #fff;
  color: #3b82f6;
  border-color: #3b82f6;

  &:hover {
    background-color: #eff6ff;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #fff;
  color: #dc2626;
  border-color: #dc2626;

  &:hover {
    background-color: #fef2f2;
  }
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 4rem;
  color: #64748b;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 600px;
  background-color: #fef2f2;
  color: #dc2626;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #fecaca;
`;

export default SeminarDetail;
