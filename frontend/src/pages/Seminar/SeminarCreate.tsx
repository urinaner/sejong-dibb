import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { apiEndpoints, SeminarDto } from '../../config/apiConfig';
import { Modal, useModal } from '../../components/Modal';
import { AlertTriangle, CheckCircle } from 'lucide-react';

const SeminarCreate = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<SeminarDto>({
    name: '',
    writer: auth?.user || '',
    place: '',
    startDate: '',
    endDate: '',
    speaker: '',
    company: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showErrorModal = (message: string) => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          등록 실패
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
          등록 완료
        </Modal.Header>
        <Modal.Content>
          <p>세미나가 성공적으로 등록되었습니다.</p>
        </Modal.Content>
        <Modal.Footer>
          <Modal.CloseButton onClick={() => navigate('/news/seminar')} />
        </Modal.Footer>
      </>,
    );
  };

  const validateForm = () => {
    const requiredFields: (keyof SeminarDto)[] = [
      'name',
      'place',
      'startDate',
      'endDate',
      'speaker',
      'company',
    ];
    const emptyFields = requiredFields.filter((field) => !formData[field]);

    if (emptyFields.length > 0) {
      showErrorModal('모든 필드를 입력해주세요.');
      return false;
    }

    if (new Date(formData.startDate) > new Date(formData.endDate)) {
      showErrorModal('종료일은 시작일보다 빠를 수 없습니다.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await axios.post(apiEndpoints.seminar.create, formData);
      showSuccessModal();
    } catch (error) {
      console.error('Error creating seminar:', error);
      showErrorModal('세미나 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <h1>세미나 등록</h1>
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
              <Label>시작일</Label>
              <Input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label>종료일</Label>
              <Input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </FormGroup>
          </FormRow>

          <ButtonGroup>
            <CancelButton
              type="button"
              onClick={() => navigate('/news/seminar')}
            >
              취소
            </CancelButton>
            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '등록 중...' : '세미나 등록'}
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
  padding: 40px 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;
const ContentWrapper = styled.div`
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  max-width: 1000px;
  margin: 0 auto;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 3rem; // 24px에서 2rem 3rem으로 변경
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;

  h1 {
    font-size: 1.8rem;
    color: #1a202c;
    margin: 0;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const FormSection = styled.form`
  padding: 32px 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 24px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: #2d3748;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #e2e8f0;
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
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

const CancelButton = styled(Button)`
  background-color: white;
  border-color: #ddd;

  &:hover {
    background-color: #f8f9fa;
    border-color: #ccc;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #b71c1c;
  border-color: #b71c1c;
  color: white;

  &:hover {
    background-color: #8b0000;
    border-color: #8b0000;
  }

  &:disabled {
    background-color: #d32f2f;
    border-color: #d32f2f;
    color: white;
  }
`;

export default SeminarCreate;
