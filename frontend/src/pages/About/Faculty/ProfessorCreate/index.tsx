import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle } from 'lucide-react';
import { Modal, useModal } from '../../../../components/Modal';
import PageContainer from '../components/common/PageContainer/PageContainer';
import ProfessorForm from '../components/common/ProfessorFrom';
import { ProfessorFormData } from '../types';
import { ProfessorReqDto } from '../../../../config/apiConfig';
import {
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
    profileImage: '',
    academicBackground: '',
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

      // ProfessorReqDto 형식으로 데이터 준비
      const professorData: ProfessorReqDto = {
        name: formData.name,
        major: formData.major,
        phoneN: formData.phoneN,
        email: formData.email,
        position: formData.position,
        homepage: formData.homepage,
        lab: formData.lab,
        profileImage: '', // API에서 필요한 빈 문자열
        departmentId: formData.departmentId || 0,
      };

      // 학력 필드는 API 인터페이스에 없으므로 백엔드 저장 로직 필요시 별도 처리
      console.log('Academic background to save:', formData.academicBackground);

      // 데이터 및 이미지 전송
      await createMutation.mutateAsync({
        data: professorData,
        imageFile: imageFile,
      });

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
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            등록 실패
          </Modal.Header>
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
