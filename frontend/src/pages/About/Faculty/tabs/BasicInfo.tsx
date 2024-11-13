import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { apiEndpoints } from '../../../../config/apiConfig';
import * as S from '../TabSectionStyle';

interface BasicInfoProps {
  professorId: number;
}

interface ProfessorDetail {
  education: string[];
  career: string[];
  awards: string[];
}

const BasicInfo: React.FC<BasicInfoProps> = ({ professorId }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [data, setData] = useState<ProfessorDetail | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          apiEndpoints.professor.detail(professorId),
        );
        setData(response.data);
      } catch (err) {
        setError('기본 정보를 불러오는데 실패했습니다.');
        console.error('Error fetching basic info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [professorId]);

  if (loading) {
    return <S.LoadingWrapper>데이터를 불러오는 중입니다...</S.LoadingWrapper>;
  }

  if (error) {
    return (
      <S.ErrorMessage>
        <AlertTriangle size={18} />
        {error}
      </S.ErrorMessage>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <S.Section>
        <S.SectionTitle>학력</S.SectionTitle>
        <S.SectionContent>
          <ul>
            {data.education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>
        </S.SectionContent>
      </S.Section>

      <S.Section>
        <S.SectionTitle>경력</S.SectionTitle>
        <S.SectionContent>
          <ul>
            {data.career.map((career, index) => (
              <li key={index}>{career}</li>
            ))}
          </ul>
        </S.SectionContent>
      </S.Section>

      {data.awards.length > 0 && (
        <S.Section>
          <S.SectionTitle>수상 이력</S.SectionTitle>
          <S.SectionContent>
            <ul>
              {data.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </S.SectionContent>
        </S.Section>
      )}
    </div>
  );
};

export default BasicInfo;
