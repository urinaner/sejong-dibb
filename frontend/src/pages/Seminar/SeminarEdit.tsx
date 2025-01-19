import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { SeminarDto } from '../../config/apiConfig';
import { Modal, useModal } from '../../components/Modal';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { SEJONG_COLORS } from '../../constants/colors';
import { useSeminar, useUpdateSeminar } from '../../hooks/queries/useSeminar';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { queryClient } from '../../lib/react-query/queryClient';
import { seminarKeys } from '../../hooks/queries/useSeminar';

const SeminarEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();
  const updateMutation = useUpdateSeminar();

  const { data: seminar, isLoading } = useSeminar(Number(id), {
    enabled: !!id,
  });

  // 초기 데이터 설정
  const [formData, setFormData] = useState<SeminarDto>({
    id: Number(id),
    name: seminar?.name || '',
    writer: seminar?.writer || '',
    place: seminar?.place || '',
    startTime: seminar?.startTime || '',
    endTime: seminar?.endTime || '',
    speaker: seminar?.speaker || '',
    company: seminar?.company || '',
  });

  // 세미나 데이터가 로드되면 폼 데이터 업데이트
  React.useEffect(() => {
    if (seminar) {
      setFormData({
        id: seminar.id,
        name: seminar.name,
        writer: seminar.writer,
        place: seminar.place,
        startTime: seminar.startTime ? seminar.startTime.replace(' ', 'T') : '',
        endTime: seminar.endTime ? seminar.endTime.replace(' ', 'T') : '',
        speaker: seminar.speaker,
        company: seminar.company,
      });
    }
  }, [seminar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return '';
    return dateTimeString.replace('T', ' ');
  };

  const showErrorModal = (message: string) => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          수정 실패
        </Modal.Header>
        <Modal.Content>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton />
        </Modal.Footer>
      </>,
    );
  };

  const showSuccessModal = () => {
    openModal(
      <>
        <Modal.Header>
          <CheckCircle size={48} color="#38A169" />
          수정 완료
        </Modal.Header>
        <Modal.Content>
          <p>세미나가 성공적으로 수정되었습니다.</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton onClick={() => navigate(`/news/seminar/${id}`)} />
        </Modal.Footer>
      </>,
    );
  };

  const validateForm = () => {
    const requiredFields: (keyof Omit<SeminarDto, 'id'>)[] = [
      'name',
      'place',
      'startTime',
      'endTime',
      'speaker',
      'company',
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      showErrorModal('모든 필드를 입력해주세요.');
      return false;
    }

    const startDateTime = new Date(formData.startTime.replace('T', ' '));
    const endDateTime = new Date(formData.endTime.replace('T', ' '));

    if (startDateTime > endDateTime) {
      showErrorModal('종료 시간은 시작 시간보다 빠를 수 없습니다.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    // 시간 형식 변환
    const formattedData = {
      ...formData,
      startTime: formatDateTime(formData.startTime),
      endTime: formatDateTime(formData.endTime),
    };

    try {
      await updateMutation.mutateAsync(formattedData, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: seminarKeys.all });
          showSuccessModal();
        },
        onError: (error) => {
          console.error('Error updating seminar:', error);
          showErrorModal('세미나 수정 중 오류가 발생했습니다.');
        },
      });
    } catch (error) {
      console.error('Error updating seminar:', error);
      showErrorModal('세미나 수정 중 오류가 발생했습니다.');
    }
  };

  if (isLoading)
    return <LoadingSpinner text={'세미나 데이터 불러오는 중'}></LoadingSpinner>;

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>세미나 수정</h1>
        </Header>

        <FormSection onSubmit={handleSubmit}>
          <FormGroup>
            <Label>세미나명</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="세미나 제목을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label>발표자</Label>
            <Input
              type="text"
              name="speaker"
              value={formData.speaker}
              onChange={handleChange}
              placeholder="발표자 이름을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label>소속</Label>
            <Input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="소속 기관을 입력하세요"
            />
          </FormGroup>

          <FormGroup>
            <Label>장소</Label>
            <Input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              placeholder="세미나 장소를 입력하세요"
            />
          </FormGroup>

          <FormRow>
            <FormGroup>
              <Label>시작 시간</Label>
              <Input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>종료 시간</Label>
              <Input
                type="datetime-local"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={() => navigate(`/news/seminar/${id}`)}
            >
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={updateMutation.isPending}>
              {updateMutation.isPending ? '수정 중...' : '수정하기'}
            </SubmitButton>
          </ButtonGroup>
        </FormSection>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 2rem auto;
  padding: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
`;

const ContentWrapper = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem;
  background-color: ${SEJONG_COLORS.COOL_GRAY}10;
  border-bottom: 2px solid ${SEJONG_COLORS.COOL_GRAY};

  h1 {
    font-size: 2rem;
    color: ${SEJONG_COLORS.CRIMSON_RED};
    margin: 0;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormSection = styled.form`
  padding: 3rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 32px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.GRAY};
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 18px;
  border: 1px solid ${SEJONG_COLORS.COOL_GRAY};
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  color: ${SEJONG_COLORS.GRAY};

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 3px ${SEJONG_COLORS.CRIMSON_RED}20;
  }

  &::placeholder {
    color: ${SEJONG_COLORS.COOL_GRAY};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid ${SEJONG_COLORS.COOL_GRAY}20;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-weight: 500;
  min-width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  border-color: ${SEJONG_COLORS.COOL_GRAY};
  color: ${SEJONG_COLORS.GRAY};

  &:hover:not(:disabled) {
    background-color: ${SEJONG_COLORS.COOL_GRAY}10;
    border-color: ${SEJONG_COLORS.GRAY};
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }
`;

const SubmitButton = styled(Button)`
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;

  &:hover:not(:disabled) {
    background-color: #8b0000;
    box-shadow: 0 2px 4px rgba(139, 0, 0, 0.2);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
    box-shadow: none;
  }

  &:disabled {
    background-color: ${SEJONG_COLORS.COOL_GRAY};
  }
`;

export default SeminarEdit;
