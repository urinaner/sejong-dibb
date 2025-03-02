import React, { memo } from 'react';
import { Phone, Mail, Globe, MapPin, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../../constants/colors';
import { Professor } from '../../types';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
  desktop: '@media(min-width: 1025px)',
};

const Card = styled.div`
  position: relative;
  display: flex;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 12px rgba(163, 20, 50, 0.1);
    transform: translateY(-2px);
  }

  ${media.mobile} {
    flex-direction: column;
    border-radius: 8px;
  }
`;

const ImageSection = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 20px;
  background: ${(props) => props.theme.colors.grey[100]};
  position: relative;
  border-right: 1px solid ${(props) => props.theme.colors.grey[200]};
  overflow: hidden;

  ${media.mobile} {
    width: 100%;
    height: 400px;
    border-right: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey[200]};
  }

  ${media.tablet} {
    width: 280px;
    height: 360px;
  }
`;

const ProfileImage = styled.img`
  width: 240px;
  height: 300px;
  object-fit: cover;
  object-position: center center;
  border-radius: 8px;
  transform: scale(1.01);
  transition: transform 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  ${media.mobile} {
    width: 300px;
    height: 300px;
  }

  ${media.tablet} {
    width: 240px;
    height: 300px;
  }

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 28px;
  display: flex;
  background: white;

  ${media.mobile} {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
`;

const MainInfo = styled.div`
  flex: 1;
  margin-right: 32px;
  min-width: 220px;

  ${media.mobile} {
    margin-right: 0;
    margin-bottom: 20px;
    min-width: auto;
  }
`;

const ProfessorName = styled.h2`
  font-size: 26px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey[500]};
  margin: 0 0 12px 0;

  ${media.mobile} {
    font-size: 22px;
    margin-bottom: 8px;
  }
`;

const Position = styled.p`
  font-size: 16px;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 6px 0;
  font-weight: 500;

  ${media.mobile} {
    font-size: 15px;
  }
`;

const Major = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.grey[400]};
  margin: 0 0 20px 0;

  ${media.mobile} {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

const ContactInfo = styled.div`
  flex: 2;
  min-width: 320px;
  background: ${(props) => props.theme.colors.grey[50]};
  padding: 20px;
  border-radius: 8px;

  ${media.mobile} {
    min-width: auto;
    padding: 16px;
  }
`;

const InfoTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};

  ${media.mobile} {
    font-size: 16px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }
`;

const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.mobile} {
    gap: 10px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  font-size: 15px;
  color: ${(props) => props.theme.colors.grey[500]};
  padding: 4px 0;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    min-width: 20px;
  }

  ${media.mobile} {
    font-size: 14px;
    gap: 8px;
  }
`;

const Link = styled.a`
  color: ${SEJONG_COLORS.CRIMSON_RED};
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;

  &:hover {
    color: ${(props) => props.theme.colors.primary.crimsonDark};
    text-decoration: underline;
  }
`;

// 학력 정보 포맷팅 함수 수정 - Professor의 academicBackground 타입과 정확히 일치하도록 수정
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
    return '정보 없음';
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

    return degrees.length > 0 ? degrees.join(' / ') : '정보 없음';
  }

  return '정보 없음';
};
interface ProfessorCardProps {
  professor: Professor;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  defaultImage: string;
}

const ProfessorCard: React.FC<ProfessorCardProps> = memo(
  ({ professor, onImageError, defaultImage }) => {
    const navigate = useNavigate();

    const handleCardClick = (e: React.MouseEvent) => {
      // 링크나 버튼 클릭 시에는 상세 페이지로 이동하지 않음
      if ((e.target as HTMLElement).closest('a, button')) {
        return;
      }
      navigate(`/about/faculty/${professor.id}`);
    };

    const handleLinkClick = (e: React.MouseEvent, url: string) => {
      e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
      window.open(url, '_blank', 'noopener noreferrer');
    };

    return (
      <Card onClick={handleCardClick} role="button" tabIndex={0}>
        <ImageSection>
          <ProfileImage
            src={professor.profileImage || defaultImage}
            alt={`${professor.name} 교수`}
            onError={onImageError}
            loading="lazy"
          />
        </ImageSection>

        <InfoSection>
          <MainInfo>
            <ProfessorName>{professor.name}</ProfessorName>
            <Position>{professor.position}</Position>
            <Major>{professor.major}</Major>
          </MainInfo>

          <ContactInfo>
            <InfoTitle>연락처</InfoTitle>
            <InfoList>
              {professor.phoneN && (
                <InfoItem>
                  <Phone />
                  <span>전화번호: {professor.phoneN}</span>
                </InfoItem>
              )}
              {professor.email && (
                <InfoItem>
                  <Mail />
                  <span>이메일: </span>
                  <Link
                    href={`mailto:${professor.email}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {professor.email}
                  </Link>
                </InfoItem>
              )}
              {professor.homepage && (
                <InfoItem>
                  <Globe />
                  <span>홈페이지: </span>
                  <Link
                    href={professor.homepage}
                    onClick={(e) => handleLinkClick(e, professor.homepage)}
                  >
                    {professor.homepage}
                  </Link>
                </InfoItem>
              )}
              {professor.lab && (
                <InfoItem>
                  <MapPin />
                  <span>연구실: {professor.lab}</span>
                </InfoItem>
              )}
              {/* 학력 정보 표시 수정 */}
              <InfoItem>
                <BookOpen />
                <span>
                  학력: {formatAcademicBackground(professor.academicBackground)}
                </span>
              </InfoItem>
            </InfoList>
          </ContactInfo>
        </InfoSection>
      </Card>
    );
  },
);

ProfessorCard.displayName = 'ProfessorCard';

export default ProfessorCard;
