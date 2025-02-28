import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Modal, useModal } from '../../../../components/Modal';
import PageContainer from '../components/common/PageContainer/PageContainer';
import ProfessorForm from '../components/common/ProfessorFrom';
import { ProfessorFormData } from '../types';
import {
  createProfessorFormData,
  getErrorMessage,
  useProfessorDetail,
  useUpdateProfessor,
} from '../../../../hooks/queries/useProfessor';

const ProfessorEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 교수 정보 가져오기
  const { data: professor, isLoading, error } = useProfessorDetail(Number(id));
  const updateMutation = useUpdateProfessor();

  // 초기 폼 데이터
  const [initialFormData, setInitialFormData] = useState<ProfessorFormData>({
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
  });

  useEffect(() => {
    if (professor) {
      setInitialFormData({
        name: professor.name,
        major: professor.major,
        phoneN: professor.phoneN,
        email: professor.email,
        position: professor.position,
        homepage: professor.homepage,
        lab: professor.lab,
        profileImage: professor.profileImage,
        // 타입 단언을 사용
        academicBackground: (professor as any).academicBackground ?? null,
        departmentId: 0, // 기본값
      });
    }
  }, [professor]);

  // 뒤로 가기 핸들러
  const handleCancel = () => {
    navigate(`/about/faculty/${id}`);
  };

  // 폼 제출 핸들러
  const handleSubmit = async (
    formData: ProfessorFormData,
    imageFile: File | null,
  ) => {
    if (!id) return;

    try {
      setIsSubmitting(true);
      const formDataToSend = createProfessorFormData(formData, imageFile);
      await updateMutation.mutateAsync({
        id: Number(id),
        formData: formDataToSend,
      });

      // 성공 모달 표시
      openModal(
        <>
          <Modal.Header>
            <CheckCircle size={48} color="#38A169" />
            수정 완료
          </Modal.Header>
          <Modal.Content>
            <p>교수 정보가 성공적으로 수정되었습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton
              onClick={() => navigate(`/about/faculty/${id}`)}
            />
          </Modal.Footer>
        </>,
      );
    } catch (error) {
      console.error('Error updating professor:', error);
      // 오류 모달 표시
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            수정 실패
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
      title="교수 정보 수정"
      isLoading={isLoading}
      isError={!!error}
      errorMessage={getErrorMessage(error)}
      hasBackButton
      onBack={handleCancel}
      backButtonText="상세 정보로 돌아가기"
    >
      {!isLoading && professor && (
        <ProfessorForm
          initialData={initialFormData}
          onSubmit={handleSubmit}
          submitButtonText="저장"
          isSubmitting={isSubmitting}
          onCancel={handleCancel}
        />
      )}
    </PageContainer>
  );
};

export default ProfessorEdit;
