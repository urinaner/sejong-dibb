// types/professor.ts
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertCircle, Mail, Phone, Globe, MapPin, Image } from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../config/apiConfig';
import Button from '../../../common/Button/Button';
import * as S from './ProfessorEditStyle';

interface Professor {
  id: number;
  name: string;
  major: string;
  phoneN: string;
  email: string;
  position: string;
  homepage: string;
  lab: string;
  profileImage: string;
}

const ProfessorEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Professor>({
    id: 0,
    name: '',
    major: '',
    phoneN: '',
    email: '',
    position: '',
    homepage: '',
    lab: '',
    profileImage: '',
  });

  const fetchProfessorData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        apiEndpoints.professor.detail(Number(id)),
      );
      setFormData(response.data);
    } catch (err) {
      setError('교수 정보를 불러오는데 실패했습니다.');
      console.error('Error fetching professor:', err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchProfessorData();
    }
  }, [id, fetchProfessorData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      await axios.post(apiEndpoints.professor.update(Number(id)), formData);
      navigate('/faculty');
    } catch (err) {
      setError('교수 정보 수정에 실패했습니다.');
      console.error('Error updating professor:', err);
    } finally {
      setSaving(false);
    }
  };

  // ProfessorEdit.tsx의 return 부분
  if (loading) {
    return (
      <S.LoadingContainer>데이터를 불러오는 중입니다...</S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Title>교수 정보 수정</S.Title>
      </S.HeaderContainer>

      <S.Form onSubmit={handleSubmit}>
        {error && (
          <S.ErrorMessage>
            <AlertCircle size={18} />
            {error}
          </S.ErrorMessage>
        )}

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
            {saving ? '저장 중...' : '저장'}
          </Button>
        </S.ButtonGroup>
      </S.Form>
    </S.Container>
  );
};

export default ProfessorEdit;
