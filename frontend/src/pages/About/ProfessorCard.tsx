import React, { memo } from 'react';
import { Phone, Mail, Globe, MapPin } from 'lucide-react';
import * as S from './FacultyStyle';

interface ProfessorCardProps {
  professor: {
    id: number;
    name: string;
    major: string;
    phoneN: string;
    email: string;
    position: string;
    homepage: string;
    lab: string;
    profileImage: string;
  };
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  defaultImage: string;
}

const ProfessorCard = memo(
  ({ professor, onImageError, defaultImage }: ProfessorCardProps) => {
    return (
      <S.ProfessorCard>
        <S.ImageSection>
          <S.ProfessorImage
            src={defaultImage}
            alt={`${professor.name} 교수`}
            onError={onImageError}
            loading="lazy"
          />
        </S.ImageSection>

        <S.InfoSection>
          <S.MainInfo>
            <S.ProfessorName>{professor.name}</S.ProfessorName>
            <S.Position>{professor.position}</S.Position>
            <S.Major>{professor.major}</S.Major>
          </S.MainInfo>

          <S.ContactInfo>
            <S.InfoTitle>연락처</S.InfoTitle>
            <S.InfoList>
              {professor.phoneN && (
                <S.InfoItem>
                  <Phone />
                  <span>전화번호: {professor.phoneN}</span>
                </S.InfoItem>
              )}
              {professor.email && (
                <S.InfoItem>
                  <Mail />
                  <span>이메일: </span>
                  <S.Link href={`mailto:${professor.email}`}>
                    {professor.email}
                  </S.Link>
                </S.InfoItem>
              )}
              {professor.homepage && (
                <S.InfoItem>
                  <Globe />
                  <span>홈페이지: </span>
                  <S.Link
                    href={professor.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {professor.homepage}
                  </S.Link>
                </S.InfoItem>
              )}
              {professor.lab && (
                <S.InfoItem>
                  <MapPin />
                  <span>연구실: {professor.lab}</span>
                </S.InfoItem>
              )}
            </S.InfoList>
          </S.ContactInfo>
        </S.InfoSection>
      </S.ProfessorCard>
    );
  },
);

ProfessorCard.displayName = 'ProfessorCard';

export default ProfessorCard;
