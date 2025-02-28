import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Modal, useModal } from '../../../../components/Modal';
import PageContainer from '../components/common/PageContainer/PageContainer';
import ProfessorForm from '../components/common/ProfessorFrom';
import { ProfessorFormData } from '../types';
import {
  createProfessorFormData,
  getErrorMessage,
  useCreateProfessor,
} from '../../../../hooks/queries/useProfessor';

const ProfessorCreate: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createMutation = useCreateProfessor();

  // 초기 폼 데이터
  const initialFormData: ProfessorFormData = {
    name: '',
    major: '',
    phoneN: '',
    email: '',
    position: '',
    homepage: '',
    lab: '',
    profileImage: null,
    academicBackground: null,
    departmentId: 0,
  };

  // 뒤로 가기 핸들러
  const handleCancel = () => {
    navigate('/about/faculty');
  };

  // 폼 제출 핸들러
  const handleSubmit = async (
    formData: ProfessorFormData,
    imageFile: File | null,
  ) => {
    try {
      setIsSubmitting(true);
      const formDataToSend = createProfessorFormData(formData, imageFile);
      await createMutation.mutateAsync(formDataToSend);

      // 성공 모달 표시
      openModal(
        <>
          <Modal.Header>
            <CheckCircle size={48} color="#38A169" />
            등록 완료
          </Modal.Header>
          <Modal.Content>
            <p>교수 정보가 성공적으로 등록되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton onClick={() => navigate('/about/faculty')} />
          </Modal.Footer>
        </>,
      );
    } catch (error) {
      console.error('Error creating professor:', error);
      // 오류 모달 표시
      openModal(
        <>
          <Modal.Header>등록 실패</Modal.Header>
          <Modal.Content>
            <p>{getErrorMessage(error)}</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageContainer
      title="교수 등록"
      hasBackButton
      onBack={handleCancel}
      backButtonText="목록으로 돌아가기"
    >
      <ProfessorForm
        initialData={initialFormData}
        onSubmit={handleSubmit}
        submitButtonText="등록"
        isSubmitting={isSubmitting}
        onCancel={handleCancel}
      />
    </PageContainer>
  );
};

export default ProfessorCreate;
