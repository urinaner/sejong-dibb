// index.tsx for ProfessorEdit
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Modal, useModal } from '../../../../components/Modal';
import PageContainer from '../components/common/PageContainer/PageContainer';
import ProfessorForm from '../components/common/ProfessorFrom';
import { ProfessorFormData } from '../types';
import { ProfessorReqDto } from '../../../../config/apiConfig';
import {
  getErrorMessage,
  useProfessorDetail,
  useUpdateProfessor,
} from '../../../../hooks/queries/useProfessor';

// Helper function to handle different academicBackground data structures
const formatAcademicBackground = (
  academicBackground:
    | string
    | null
    | {
        bachelor?: string;
        master?: string;
        doctor?: string;
        [key: string]: string | undefined;
      }
    | undefined,
): string => {
  if (!academicBackground) {
    return '';
  }

  if (typeof academicBackground === 'string') {
    return academicBackground;
  }

  if (typeof academicBackground === 'object') {
    // 학사, 석사, 박사 순으로 표시
    const degrees = [];
    if (academicBackground.bachelor)
      degrees.push(`학사: ${academicBackground.bachelor}`);
    if (academicBackground.master)
      degrees.push(`석사: ${academicBackground.master}`);
    if (academicBackground.doctor)
      degrees.push(`박사: ${academicBackground.doctor}`);

    // 다른 학위 정보도 추가
    Object.entries(academicBackground)
      .filter(([key]) => !['bachelor', 'master', 'doctor'].includes(key))
      .forEach(([key, value]) => {
        if (value) degrees.push(`${key}: ${value}`);
      });

    return degrees.length > 0 ? degrees.join('\n') : '';
  }

  return '';
};

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
    profileImage: '',
    academicBackground: '',
    departmentId: 0,
  });

  // 데이터가 로드되면 폼 데이터 업데이트
  useEffect(() => {
    if (professor) {
      setInitialFormData({
        name: professor.name,
        major: professor.major,
        phoneN: professor.phoneN || '',
        email: professor.email,
        position: professor.position,
        homepage: professor.homepage || '',
        lab: professor.lab || '',
        profileImage: professor.profileImage || '',
        // Convert academicBackground properly based on its type
        academicBackground: formatAcademicBackground(
          professor.academicBackground,
        ),
        departmentId: professor.departmentId || 0,
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
        departmentId: formData.departmentId || 0,
        academicBackground: formData.academicBackground,
      };

      // 데이터 및 이미지 전송
      await updateMutation.mutateAsync({
        id: Number(id),
        data: professorData,
        imageFile: imageFile,
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
