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
    academicBackground: JSON.stringify({
      bachelor: '',
      master: '',
      doctor: '',
    }),
    departmentId: 0,
  };

  // 뒤로 가기 핸들러
  const handleCancel = () => {
    navigate('/about/faculty');
  };

  // 폼 제출 핸들러
  // 폼 제출 핸들러
  const handleSubmit = async (
    formData: ProfessorFormData,
    imageFile: File | null,
  ) => {
    try {
      setIsSubmitting(true);

      // academicBackground가 JSON 문자열인 경우 객체로 파싱
      let academicBackground;
      try {
        academicBackground = formData.academicBackground
          ? JSON.parse(formData.academicBackground)
          : undefined;
      } catch (e) {
        // 파싱 실패 시 문자열 그대로 사용
        academicBackground = formData.academicBackground;
      }

      // ProfessorReqDto 형식으로 데이터 준비
      const professorData: ProfessorReqDto = {
        name: formData.name,
        major: formData.major,
        phoneN: formData.phoneN,
        email: formData.email,
        position: formData.position,
        homepage: formData.homepage,
        lab: formData.lab,
        profileImage: '',
        departmentId: formData.departmentId,
        academicBackground, // 객체 또는 문자열
      };

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
