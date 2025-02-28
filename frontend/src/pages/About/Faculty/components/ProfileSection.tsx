import React, { memo, useState } from 'react';
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  Copy,
  ExternalLink,
  BookOpen,
} from 'lucide-react';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../constants/colors';
import { Modal } from '../../../../components/Modal';
import { Professor } from '../types';

// 스타일 컴포넌트
const ProfileContainer = styled.section`
  display: flex;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ImageSection = styled.div`
  width: 300px;
  height: 360px;
  background: ${(props) => props.theme.colors.grey[100]};
  position: relative;
  overflow: hidden;

  @media (max-width: 1024px) {
    width: 250px;
    height: 300px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 280px;
    border-radius: 0;
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    object-position: top center;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 1.25rem;
  }
`;

const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const InfoTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const TagCount = styled.span`
  background-color: ${SEJONG_COLORS.CRIMSON_RED}15;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const MajorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const MajorTag = styled.span`
  background: ${(props) => props.theme.colors.grey[50]};
  color: ${SEJONG_COLORS.CRIMSON_RED};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED}30;
  transition: all 0.2s;

  &:hover {
    background: ${SEJONG_COLORS.CRIMSON_RED}10;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
`;

const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    gap: 0.6rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 0.95rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[50]};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    gap: 0.6rem;
  }
`;

const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  flex-shrink: 0;
  width: 24px;
`;

const ContactText = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContactLink = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  background: none;
  border: none;
  padding: 0;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: left;

  span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
    opacity: 0.7;
  }

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.primary.crimsonDark};

    svg {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.grey[400]};
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => props.theme.colors.grey[100]};
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  &:active {
    background: ${(props) => props.theme.colors.grey[200]};
  }

  @media (max-width: 768px) {
    width: 28px;
    height: 28px;
  }
`;

const AcademicInfo = styled.div`
  background: ${(props) => props.theme.colors.grey[50]};
  padding: 1rem;
  border-radius: 8px;
  margin-top: 0.5rem;

  p {
    margin: 0.5rem 0;
    color: ${(props) => props.theme.colors.grey[500]};
    font-size: 0.95rem;
    line-height: 1.6;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }
`;

interface ProfileSectionProps {
  professor: Professor;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  defaultImage: string;
}

const ProfileSection = memo(
  ({ professor, onImageError, defaultImage }: ProfileSectionProps) => {
    const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
    const [copyMessage, setCopyMessage] = useState('');

    // 텍스트 복사 핸들러
    const handleCopy = async (text: string, label: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopyMessage(`${label} 복사되었습니다`);
        setIsCopyModalOpen(true);

        setTimeout(() => {
          setIsCopyModalOpen(false);
        }, 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
        setCopyMessage('복사 중 오류가 발생했습니다');
        setIsCopyModalOpen(true);
      }
    };

    // 외부 링크 핸들러
    const handleExternalLink = (url: string) => {
      if (!url.startsWith('http')) {
        url = `https://${url}`;
      }
      window.open(url, '_blank', 'noopener noreferrer');
    };

    // 전공 태그 분리
    const majors = professor.major.split(',').map((major) => major.trim());

    return (
      <>
        <ProfileContainer>
          <ImageWrapper>
            <ImageSection>
              <ProfileImage
                src={professor.profileImage || defaultImage}
                alt={`${professor.name} 교수`}
                onError={onImageError}
                loading="lazy"
              />
            </ImageSection>
          </ImageWrapper>

          <InfoSection>
            <InfoGroup>
              <InfoTitle>
                <span>전공 분야</span>
                <TagCount>{majors.length}</TagCount>
              </InfoTitle>
              <MajorTags>
                {majors.map((major, index) => (
                  <MajorTag key={index}>{major}</MajorTag>
                ))}
              </MajorTags>
            </InfoGroup>

            {professor.academicBackground && (
              <InfoGroup>
                <InfoTitle>
                  <span>학력</span>
                </InfoTitle>
                <AcademicInfo>
                  <p>{professor.academicBackground}</p>
                </AcademicInfo>
              </InfoGroup>
            )}

            <InfoGroup>
              <InfoTitle>
                <span>연락처 정보</span>
              </InfoTitle>
              <ContactList>
                {professor.email && (
                  <ContactItem>
                    <ContactIcon>
                      <Mail size={18} />
                    </ContactIcon>
                    <ContactText>{professor.email}</ContactText>
                    <IconButton
                      onClick={() => handleCopy(professor.email, '이메일이')}
                      aria-label="이메일 복사"
                      title="이메일 복사"
                    >
                      <Copy size={16} />
                    </IconButton>
                  </ContactItem>
                )}

                {professor.phoneN && (
                  <ContactItem>
                    <ContactIcon>
                      <Phone size={18} />
                    </ContactIcon>
                    <ContactText>{professor.phoneN}</ContactText>
                    <IconButton
                      onClick={() => handleCopy(professor.phoneN, '전화번호가')}
                      aria-label="전화번호 복사"
                      title="전화번호 복사"
                    >
                      <Copy size={16} />
                    </IconButton>
                  </ContactItem>
                )}

                {professor.lab && (
                  <ContactItem>
                    <ContactIcon>
                      <MapPin size={18} />
                    </ContactIcon>
                    <ContactText>{professor.lab}</ContactText>
                  </ContactItem>
                )}

                {professor.homepage && (
                  <ContactItem>
                    <ContactIcon>
                      <Globe size={18} />
                    </ContactIcon>
                    <ContactLink
                      onClick={() => handleExternalLink(professor.homepage)}
                    >
                      <span>{professor.homepage}</span>
                      <ExternalLink size={14} />
                    </ContactLink>
                  </ContactItem>
                )}
              </ContactList>
            </InfoGroup>
          </InfoSection>
        </ProfileContainer>

        <Modal
          isOpen={isCopyModalOpen}
          onClose={() => setIsCopyModalOpen(false)}
          className="max-w-sm transform translate-y-16"
        >
          <Modal.Content className="p-4 text-center">
            <p className="text-sm font-medium text-gray-800">{copyMessage}</p>
          </Modal.Content>
        </Modal>
      </>
    );
  },
);

ProfileSection.displayName = 'ProfileSection';

export default ProfileSection;
