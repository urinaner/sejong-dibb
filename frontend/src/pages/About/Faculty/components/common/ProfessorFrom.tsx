// Updated portions of the ProfessorForm component
import React, { useState, useCallback, useEffect } from 'react';
import {
  AlertTriangle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Image as ImageIcon,
  BookOpen,
} from 'lucide-react';
import Button from '../common/Button/Button';
import { Modal, useModal } from '../../../../../components/Modal';
import { ProfessorFormData } from '../../types';
import * as S from './ProfessorFormStyles';

interface ProfessorFormProps {
  initialData: ProfessorFormData;
  onSubmit: (
    formData: ProfessorFormData,
    imageFile: File | null,
  ) => Promise<void>;
  submitButtonText: string;
  isSubmitting: boolean;
  onCancel: () => void;
}

const ProfessorForm: React.FC<ProfessorFormProps> = ({
  initialData,
  onSubmit,
  submitButtonText,
  isSubmitting,
  onCancel,
}) => {
  const { openModal } = useModal();
  const [formData, setFormData] = useState<ProfessorFormData>(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData.profileImage || null,
  );

  // 초기 데이터가 변경될 때 폼 데이터 업데이트
  useEffect(() => {
    setFormData(initialData);
    setImagePreview(initialData.profileImage || null);
  }, [initialData]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;

      if (name === 'phoneN') {
        // 숫자와 하이픈만 허용
        const digits = value.replace(/[^\d-]/g, '');
        // 하이픈 제거
        const numbers = digits.replace(/-/g, '');
        let formattedNumber = '';

        // 번호 길이에 따른 포맷팅
        if (numbers.length > 0) {
          // 서울(02)로 시작하는 경우
          if (numbers.startsWith('02')) {
            if (numbers.length <= 2) {
              formattedNumber = numbers;
            } else if (numbers.length <= 6) {
              formattedNumber = `${numbers.slice(0, 2)}-${numbers.slice(2)}`;
            } else {
              formattedNumber = `${numbers.slice(0, 2)}-${numbers.slice(
                2,
                6,
              )}-${numbers.slice(6, 10)}`;
            }
          }
          // 지역번호 또는 휴대폰 번호인 경우
          else {
            if (numbers.length <= 3) {
              formattedNumber = numbers;
            } else if (numbers.length <= 7) {
              formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
            } else {
              const endIndex = Math.min(numbers.length, 11);

              // 지역번호에 따른 다른 분할 (031, 032 등)
              if (
                numbers.startsWith('03') ||
                numbers.startsWith('04') ||
                numbers.startsWith('05') ||
                numbers.startsWith('06')
              ) {
                // 지역번호-국번-번호 형식
                formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(
                  3,
                  6,
                )}-${numbers.slice(6, endIndex)}`;
              } else {
                // 기본 휴대폰 번호 형식 (010, 011 등)
                formattedNumber = `${numbers.slice(0, 3)}-${numbers.slice(
                  3,
                  7,
                )}-${numbers.slice(7, endIndex)}`;
              }
            }
          }
        }

        setFormData((prev) => ({
          ...prev,
          [name]: formattedNumber,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }
    },
    [],
  );

  // 이미지 변경 핸들러
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

      // 파일 객체 저장
      setImageFile(file);
      console.log('Image file selected:', file.name, file.type, file.size);

      // 미리보기 표시
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
      await onSubmit(formData, imageFile);
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.FormSection>
        <S.FormTitle>프로필 이미지</S.FormTitle>
        <S.FormContent>
          <S.ImageUploadContainer>
            <S.ImagePreviewContainer>
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="프로필 미리보기"
                  onError={(e) => {
                    // Handle image loading errors by falling back to the default image
                    console.error(
                      'Failed to load image preview:',
                      imagePreview,
                    );
                    e.currentTarget.src = '/professor_example.jpg';
                  }}
                />
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

      {/* Rest of the form remains unchanged */}
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

          <S.InputGroup>
            <S.Label htmlFor="academicBackground">학력</S.Label>
            <S.InputWithIcon>
              <S.Textarea
                id="academicBackground"
                name="academicBackground"
                value={formData.academicBackground || ''}
                onChange={handleInputChange}
                placeholder="학력 정보를 입력하세요 (예: 서울대학교 전자공학과 박사)"
                rows={4}
              />
              <BookOpen size={18} />
            </S.InputWithIcon>
            <S.HelperText>
              여러 학력은 줄바꿈으로 구분하여 입력해주세요.
            </S.HelperText>
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
          onClick={onCancel}
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
          {isSubmitting ? '처리 중...' : submitButtonText}
        </Button>
      </S.ButtonGroup>
    </S.Form>
  );
};

export default ProfessorForm;
