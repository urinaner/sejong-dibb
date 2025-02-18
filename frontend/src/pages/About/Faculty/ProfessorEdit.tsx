import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  AlertCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Image as ImageIcon,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import Button from '../../../common/Button/Button';
import { Modal, useModal } from '../../../components/Modal';
import * as S from './ProfessorEditStyle';
import {
  createProfessorFormData,
  getErrorMessage,
  useProfessorDetail,
  useUpdateProfessor,
} from '../../../hooks/queries/useProfessor';

interface ProfessorFormData {
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
  departmentId: number;
}

const ProfessorEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { openModal } = useModal();

  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const updateMutation = useUpdateProfessor();
  const { data: professor, isLoading } = useProfessorDetail(Number(id));

  const [formData, setFormData] = useState<ProfessorFormData>({
    name: '',
    major: '',
    phoneN: '',
    email: '',
    position: '',
    homepage: '',
    lab: '',
    profileImage: '',
    departmentId: 0,
  });

  const fetchProfessorData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        apiEndpoints.professor.detail(Number(id)),
      );
      setFormData(response.data);
      if (response.data.profileImage) {
        setImagePreview(response.data.profileImage);
      }
    } catch (err) {
      console.error('Error fetching professor:', err);
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            데이터 로드 실패
          </Modal.Header>
          <Modal.Content>
            <p>교수 정보를 불러오는데 실패했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton onClick={() => navigate('/about/faculty')} />
          </Modal.Footer>
        </>,
      );
    } finally {
      setLoading(false);
    }
  }, [id, navigate, openModal]);

  useEffect(() => {
    if (id) {
      fetchProfessorData();
    }
  }, [id, fetchProfessorData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    [],
  );

  const handleImageChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              파일 크기 초과
            </Modal.Header>
            <Modal.Content>
              <p>이미지 크기는 5MB를 초과할 수 없습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton />
            </Modal.Footer>
          </>,
        );
        return;
      }

      if (!file.type.startsWith('image/')) {
        openModal(
          <>
            <Modal.Header>
              <AlertTriangle size={48} color="#E53E3E" />
              잘못된 파일 형식
            </Modal.Header>
            <Modal.Content>
              <p>이미지 파일만 업로드할 수 있습니다.</p>
            </Modal.Content>
            <Modal.Footer>
              <Modal.CloseButton />
            </Modal.Footer>
          </>,
        );
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    },
    [openModal],
  );
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.position.trim()
    ) {
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            입력 오류
          </Modal.Header>
          <Modal.Content>
            <p>모든 필수 항목을 입력해주세요.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const formDataToSend = createProfessorFormData(formData, imageFile);
      await updateMutation.mutateAsync({
        id: Number(id),
        formData: formDataToSend,
      });

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

  // 로딩 상태 처리
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Title>교수 정보 수정</S.Title>
      </S.HeaderContainer>

      <S.Form onSubmit={handleSubmit}>
        <S.FormSection>
          <S.FormTitle>프로필 이미지</S.FormTitle>
          <S.FormContent>
            <S.ImageUploadContainer>
              <S.ImagePreviewContainer>
                {imagePreview ? (
                  <img src={imagePreview} alt="프로필 미리보기" />
                ) : (
                  <S.FallbackThumbnail>
                    <ImageIcon size={48} />
                    <span>이미지를 선택해주세요</span>
                  </S.FallbackThumbnail>
                )}
              </S.ImagePreviewContainer>
              <S.ImageUploadButton>
                이미지 업로드
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </S.ImageUploadButton>
              <S.HelperText>
                * 최대 5MB, JPG/PNG 파일만 업로드 가능합니다.
              </S.HelperText>
            </S.ImageUploadContainer>
          </S.FormContent>
        </S.FormSection>

        <S.FormSection>
          <S.FormTitle>기본 정보</S.FormTitle>
          <S.FormContent>
            <S.InputGroup>
              <S.Label htmlFor="name">
                이름<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="교수명을 입력하세요"
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label htmlFor="position">
                직위<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.Input
                id="position"
                name="position"
                value={formData.position}
                onChange={handleInputChange}
                required
                placeholder="예: 정교수, 부교수"
              />
            </S.InputGroup>

            <S.InputGroup>
              <S.Label htmlFor="major">
                전공<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.Input
                id="major"
                name="major"
                value={formData.major}
                onChange={handleInputChange}
                required
                placeholder="전공 분야를 입력하세요"
              />
            </S.InputGroup>
          </S.FormContent>
        </S.FormSection>

        <S.FormSection>
          <S.FormTitle>연락처 정보</S.FormTitle>
          <S.FormContent>
            <S.InputGroup>
              <S.Label htmlFor="email">
                이메일<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.InputWithIcon>
                <S.Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="example@sejong.ac.kr"
                />
                <Mail size={18} />
              </S.InputWithIcon>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label htmlFor="phoneN">전화번호</S.Label>
              <S.InputWithIcon>
                <S.Input
                  id="phoneN"
                  name="phoneN"
                  value={formData.phoneN}
                  onChange={handleInputChange}
                  placeholder="02-1234-5678"
                />
                <Phone size={18} />
              </S.InputWithIcon>
            </S.InputGroup>
          </S.FormContent>
        </S.FormSection>

        <S.FormSection>
          <S.FormTitle>추가 정보</S.FormTitle>
          <S.FormContent>
            <S.InputGroup>
              <S.Label htmlFor="lab">연구실</S.Label>
              <S.InputWithIcon>
                <S.Input
                  id="lab"
                  name="lab"
                  value={formData.lab}
                  onChange={handleInputChange}
                  placeholder="예: 충무관 1128호"
                />
                <MapPin size={18} />
              </S.InputWithIcon>
            </S.InputGroup>

            <S.InputGroup>
              <S.Label htmlFor="homepage">홈페이지</S.Label>
              <S.InputWithIcon>
                <S.Input
                  id="homepage"
                  name="homepage"
                  type="url"
                  value={formData.homepage}
                  onChange={handleInputChange}
                  placeholder="https://www.example.com"
                />
                <Globe size={18} />
              </S.InputWithIcon>
              <S.HelperText>
                전체 URL을 입력해주세요. (예: https://www.example.com)
              </S.HelperText>
            </S.InputGroup>
          </S.FormContent>
        </S.FormSection>

        <S.ButtonGroup>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/about/faculty')}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? '저장 중...' : '저장'}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default ProfessorEdit;
