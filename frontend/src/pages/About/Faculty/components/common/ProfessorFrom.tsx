import React, { useState, useCallback, useEffect } from 'react';
import {
  AlertTriangle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Image as ImageIcon,
  PlusCircle,
  MinusCircle,
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

interface AcademicDegree {
  type: string;
  school: string;
}

const defaultDegrees: AcademicDegree[] = [
  { type: 'bachelor', school: '' },
  { type: 'master', school: '' },
  { type: 'doctor', school: '' },
];

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

  // 학력 정보를 별도로 관리
  const [academicDegrees, setAcademicDegrees] = useState<AcademicDegree[]>(
    () => {
      // 초기 학력 정보가 있는 경우 파싱
      if (initialData.academicBackground) {
        try {
          // JSON 형태로 저장된 경우 파싱 시도
          const parsedData = JSON.parse(initialData.academicBackground);

          if (typeof parsedData === 'object') {
            return Object.entries(parsedData).map(([type, school]) => ({
              type,
              school: school as string,
            }));
          }
        } catch (e) {
          // JSON 파싱 실패 시, 일반 문자열로 간주하고 파싱 시도
          // 형식: "type1: value1 / type2: value2" 형태로 가정
          const parts = initialData.academicBackground.split(' / ');
          return parts.map((part) => {
            const [type, school] = part.split(': ');
            return { type, school: school || '' };
          });
        }
      }

      // 기본 학력 필드 설정
      return defaultDegrees;
    },
  );

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

  // 학력 정보 입력 필드 변경 핸들러
  const handleDegreeChange = (
    index: number,
    field: 'type' | 'school',
    value: string,
  ) => {
    const newDegrees = [...academicDegrees];
    newDegrees[index][field] = value;
    setAcademicDegrees(newDegrees);

    // academicBackground 필드 업데이트 (문자열 형태로 변환)
    updateAcademicBackgroundField(newDegrees);
  };

  // 학력 정보 필드 추가
  const addDegreeField = () => {
    setAcademicDegrees([...academicDegrees, { type: '', school: '' }]);
  };

  // 학력 정보 필드 제거
  const removeDegreeField = (index: number) => {
    if (academicDegrees.length <= 1) return;

    const newDegrees = academicDegrees.filter((_, i) => i !== index);
    setAcademicDegrees(newDegrees);
    updateAcademicBackgroundField(newDegrees);
  };

  const updateAcademicBackgroundField = (degrees: AcademicDegree[]) => {
    const academicObj: Record<string, string> = {};

    degrees.forEach((degree) => {
      if (degree.type && degree.school) {
        academicObj[degree.type] = degree.school;
      }
    });

    // JSON 문자열로 변환하여 저장 (ProfessorFormData.academicBackground는 string 타입)
    setFormData((prev) => ({
      ...prev,
      academicBackground: JSON.stringify(academicObj),
    }));
  };

  // ProfessorForm 컴포넌트 내부 - 이미지 변경 핸들러
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

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  return (
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

          {/* 학력 정보 입력 섹션 (새로 추가) */}
          <S.InputGroup>
            <S.Label htmlFor="academicBackground">
              학력
              <Button
                type="button"
                variant="ghost"
                size="small"
                onClick={addDegreeField}
                style={{ marginLeft: '8px', padding: '2px 8px' }}
              >
                <PlusCircle size={16} style={{ marginRight: '4px' }} />
                추가
              </Button>
            </S.Label>

            {academicDegrees.map((degree, index) => (
              <div
                key={index}
                style={{ marginBottom: '16px', position: 'relative' }}
              >
                <div
                  style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}
                >
                  <S.Input
                    placeholder="학위 유형 (예: 학사, 석사, 박사)"
                    value={degree.type}
                    onChange={(e) =>
                      handleDegreeChange(index, 'type', e.target.value)
                    }
                    style={{ flex: '1' }}
                  />
                  {academicDegrees.length > 1 && (
                    <Button
                      type="button"
                      variant="danger"
                      size="small"
                      onClick={() => removeDegreeField(index)}
                      style={{ padding: '4px 8px' }}
                    >
                      <MinusCircle size={16} />
                    </Button>
                  )}
                </div>
                <S.Input
                  placeholder="학력 정보 (예: 서울대학교 전자공학과)"
                  value={degree.school}
                  onChange={(e) =>
                    handleDegreeChange(index, 'school', e.target.value)
                  }
                />
              </div>
            ))}

            <S.HelperText>
              학위 유형과 학력 정보를 입력하세요. 추가 버튼으로 학력을 더 입력할
              수 있습니다.
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
