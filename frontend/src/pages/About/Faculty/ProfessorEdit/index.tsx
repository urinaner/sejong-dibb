import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Modal, useModal } from '../../../../components/Modal';
import PageContainer from '../components/common/PageContainer/PageContainer';
import ProfessorForm from '../components/common/ProfessorFrom';
import { Professor, ProfessorFormData } from '../types';
import { ProfessorReqDto } from '../../../../config/apiConfig';
import {
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
    profileImage: '',
    academicBackground: JSON.stringify({
      bachelor: '',
      master: '',
      doctor: '',
    }),
    departmentId: 0,
  });

  // 데이터가 로드되면 폼 데이터 업데이트
  // ProfessorEdit/index.tsx 내의 useEffect 부분 수정
  useEffect(() => {
    if (professor) {
      // 타입 단언을 사용하여 academicBackground 속성에 접근
      const prof = professor as unknown as Professor;

      // academicBackground 처리
      let formattedAcademicBackground = '';

      if (prof.academicBackground !== undefined) {
        if (typeof prof.academicBackground === 'string') {
          // 이미 문자열인 경우 그대로 사용
          formattedAcademicBackground = prof.academicBackground;
        } else if (
          prof.academicBackground &&
          typeof prof.academicBackground === 'object'
        ) {
          // 객체인 경우 문자열로 변환 (Type: School 형식으로)
          const parts = [];
          if (prof.academicBackground.bachelor) {
            parts.push(`학사: ${prof.academicBackground.bachelor}`);
          }
          if (prof.academicBackground.master) {
            parts.push(`석사: ${prof.academicBackground.master}`);
          }
          if (prof.academicBackground.doctor) {
            parts.push(`박사: ${prof.academicBackground.doctor}`);
          }

          // 추가 학위 정보도 포함
          Object.entries(prof.academicBackground)
            .filter(([key]) => !['bachelor', 'master', 'doctor'].includes(key))
            .forEach(([key, value]) => {
              if (value) {
                parts.push(`${key}: ${value}`);
              }
            });

          formattedAcademicBackground = parts.join(' / ');
        }
      }

      setInitialFormData({
        name: professor.name,
        major: professor.major,
        phoneN: professor.phoneN || '',
        email: professor.email,
        position: professor.position,
        homepage: professor.homepage || '',
        lab: professor.lab || '',
        profileImage: professor.profileImage || '',
        academicBackground: formattedAcademicBackground,
        departmentId: 0, // 기본값
      });
    }
  }, [professor]);

  // 뒤로 가기 핸들러
  const handleCancel = () => {
    navigate(`/about/faculty/${id}`);
  };

  // 폼 제출 핸들러
  // 폼 제출 핸들러
  const handleSubmit = async (
    formData: ProfessorFormData,
    imageFile: File | null,
  ) => {
    if (!id) return;

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
        departmentId: formData.departmentId || 0,
        academicBackground, // 객체 또는 문자열
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
