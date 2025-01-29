import React, { memo, useState } from 'react';
import { Phone, Mail, Globe, MapPin, Copy, ExternalLink } from 'lucide-react';
import { Modal } from '../../../components/Modal';
import * as S from './ProfileSectionStyle';
import { Professor } from '../../../types/professor';

interface ProfileSectionProps {
  professor: Professor;
  onImageError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  defaultImage: string;
}

const ProfileSection = memo(
  ({ professor, onImageError, defaultImage }: ProfileSectionProps) => {
    const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);
    const [copyMessage, setCopyMessage] = useState('');

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

    const handleExternalLink = (url: string) => {
      if (!url.startsWith('http')) {
        url = `https://${url}`;
      }
      window.open(url, '_blank', 'noopener noreferrer');
    };

    const majors = professor.major.split(',').map((major) => major.trim());

    return (
      <>
        <S.ProfileContainer>
          <S.ImageWrapper>
            <S.ImageSection>
              <S.ProfileImage
                src={professor.profileImage || defaultImage}
                alt={`${professor.name} 교수`}
                onError={onImageError}
                loading="lazy"
              />
            </S.ImageSection>
          </S.ImageWrapper>

          <S.InfoSection>
            <S.InfoGroup>
              <S.InfoTitle>
                <span>전공 분야</span>
                <S.TagCount>{majors.length}</S.TagCount>
              </S.InfoTitle>
              <S.MajorTags>
                {majors.map((major, index) => (
                  <S.MajorTag key={index}>{major}</S.MajorTag>
                ))}
              </S.MajorTags>
            </S.InfoGroup>

            <S.InfoGroup>
              <S.InfoTitle>
                <span>연락처 정보</span>
              </S.InfoTitle>
              <S.ContactList>
                {professor.email && (
                  <S.ContactItem>
                    <S.ContactIcon>
                      <Mail size={18} />
                    </S.ContactIcon>
                    <S.ContactText>{professor.email}</S.ContactText>
                    <S.IconButton
                      onClick={() => handleCopy(professor.email, '이메일이')}
                      aria-label="이메일 복사"
                      title="이메일 복사"
                    >
                      <Copy size={16} />
                    </S.IconButton>
                  </S.ContactItem>
                )}

                {professor.phoneN && (
                  <S.ContactItem>
                    <S.ContactIcon>
                      <Phone size={18} />
                    </S.ContactIcon>
                    <S.ContactText>{professor.phoneN}</S.ContactText>
                    <S.IconButton
                      onClick={() => handleCopy(professor.phoneN, '전화번호가')}
                      aria-label="전화번호 복사"
                      title="전화번호 복사"
                    >
                      <Copy size={16} />
                    </S.IconButton>
                  </S.ContactItem>
                )}

                {professor.lab && (
                  <S.ContactItem>
                    <S.ContactIcon>
                      <MapPin size={18} />
                    </S.ContactIcon>
                    <S.ContactText>{professor.lab}</S.ContactText>
                  </S.ContactItem>
                )}

                {professor.homepage && (
                  <S.ContactItem>
                    <S.ContactIcon>
                      <Globe size={18} />
                    </S.ContactIcon>
                    <S.ContactLink
                      onClick={() => handleExternalLink(professor.homepage)}
                    >
                      <span>{professor.homepage}</span>
                      <ExternalLink size={14} />
                    </S.ContactLink>
                  </S.ContactItem>
                )}
              </S.ContactList>
            </S.InfoGroup>
          </S.InfoSection>
        </S.ProfileContainer>

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
