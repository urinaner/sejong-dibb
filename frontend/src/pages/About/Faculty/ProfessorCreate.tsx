import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AlertTriangle,
  CheckCircle,
  Mail,
  Phone,
  Globe,
  MapPin,
  Image,
} from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import { Modal, useModal } from '../../../components/Modal';
import Button from '../../../common/Button/Button';
import * as S from './ProfessorEditStyle';

interface ProfessorFormData {
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
}

const ProfessorCreate: React.FC = () => {
  const navigate = useNavigate();
  const { openModal } = useModal();
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<ProfessorFormData>({
    name: '',
    major: '',
    phoneN: '',
    email: '',
    position: '',
    homepage: '',
    lab: '',
    profileImage: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      showError('이름은 필수 입력 항목입니다.');
      return false;
    }
    if (!formData.email.trim()) {
      showError('이메일은 필수 입력 항목입니다.');
      return false;
    }
    if (!formData.position.trim()) {
      showError('직위는 필수 입력 항목입니다.');
      return false;
    }
    if (!formData.major.trim()) {
      showError('전공은 필수 입력 항목입니다.');
      return false;
    }
    if (!formData.phoneN.trim()) {
      showError('전화번호는 필수 입력 항목입니다.');
      return false;
    }
    return true;
  };

  const showError = (message: string) => {
    openModal(
      <>
        <Modal.Header>
          <AlertTriangle size={48} color="#E53E3E" />
          입력 오류
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

  const showSuccess = () => {
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSaving(true);

    try {
      await axios.post(apiEndpoints.professor.create, formData);
      showSuccess();
    } catch (err) {
      openModal(
        <>
          <Modal.Header>
            <AlertTriangle size={48} color="#E53E3E" />
            등록 실패
          </Modal.Header>
          <Modal.Content>
            <p>교수 정보 등록 중 오류가 발생했습니다.</p>
          </Modal.Content>
          <Modal.Footer>
            <Modal.CloseButton />
          </Modal.Footer>
        </>,
      );
      console.error('Error creating professor:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Title>교수 정보 등록</S.Title>
      </S.HeaderContainer>

      <S.Form onSubmit={handleSubmit}>
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
              <S.Label htmlFor="phoneN">
                전화번호<S.RequiredMark>*</S.RequiredMark>
              </S.Label>
              <S.InputWithIcon>
                <S.Input
                  id="phoneN"
                  name="phoneN"
                  value={formData.phoneN}
                  onChange={handleInputChange}
                  required
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

            <S.InputGroup>
              <S.Label htmlFor="profileImage">프로필 이미지 URL</S.Label>
              <S.InputWithIcon>
                <S.Input
                  id="profileImage"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleInputChange}
                  placeholder="이미지 URL을 입력하세요"
                />
                <Image size={18} />
              </S.InputWithIcon>
            </S.InputGroup>
          </S.FormContent>
        </S.FormSection>

        <S.ButtonGroup>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/about/faculty')}
            disabled={saving}
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={saving}
            isLoading={saving}
          >
            {saving ? '등록 중...' : '등록'}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default ProfessorCreate;
