import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import axios from 'axios';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../../constants/colors';
import { apiEndpoints } from '../../../../../config/apiConfig';

// 스타일 컴포넌트
const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: ${(props) => props.theme.colors.grey[500]};

  @media (max-width: 768px) {
    min-height: 150px;
  }
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fff5f5;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 8px;
  font-size: 0.9rem;
  margin: 1rem 0;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED}20;
  text-align: center;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    margin-right: 0.5rem;
  }

  @media (max-width: 768px) {
    border-radius: 0;
    margin: 0;
    border-left: 0;
    border-right: 0;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 1rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin-bottom: 0.75rem;
    padding-bottom: 0.5rem;
  }
`;

const SectionContent = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  li {
    color: ${(props) => props.theme.colors.grey[500]};
    line-height: 1.6;
    padding-left: 1.25rem;
    position: relative;
    font-size: 0.95rem;

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.75rem;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: ${SEJONG_COLORS.CRIMSON_RED};
    }
  }

  @media (max-width: 768px) {
    li {
      font-size: 0.9rem;
      padding-left: 1rem;
    }
  }
`;

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
    return <LoadingWrapper>데이터를 불러오는 중입니다...</LoadingWrapper>;
  }

  if (error) {
    return (
      <ErrorMessage>
        <AlertTriangle size={18} />
        {error}
      </ErrorMessage>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div>
      <Section>
        <SectionTitle>학력</SectionTitle>
        <SectionContent>
          <ul>
            {data.education && data.education.length > 0 ? (
              data.education.map((edu, index) => <li key={index}>{edu}</li>)
            ) : (
              <li>등록된 학력 정보가 없습니다.</li>
            )}
          </ul>
        </SectionContent>
      </Section>

      <Section>
        <SectionTitle>경력</SectionTitle>
        <SectionContent>
          <ul>
            {data.career && data.career.length > 0 ? (
              data.career.map((career, index) => <li key={index}>{career}</li>)
            ) : (
              <li>등록된 경력 정보가 없습니다.</li>
            )}
          </ul>
        </SectionContent>
      </Section>

      {data.awards && data.awards.length > 0 && (
        <Section>
          <SectionTitle>수상 이력</SectionTitle>
          <SectionContent>
            <ul>
              {data.awards.map((award, index) => (
                <li key={index}>{award}</li>
              ))}
            </ul>
          </SectionContent>
        </Section>
      )}
    </div>
  );
};

export default BasicInfo;
