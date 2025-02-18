import React, { useState } from 'react';
import * as S from './FooterStyle';
import useAuth from '../../hooks/useAuth';
import { TermsModal } from '../Modal/templates/TermsModal';

type TermsType = 'terms' | 'privacy' | 'collection';

interface LinkContent {
  name: string;
  link: string;
  type: 'link';
}

interface ButtonContent {
  name: string;
  type: 'button';
  onClick: () => void;
}

type Content = LinkContent | ButtonContent;

interface Section {
  title: string;
  titleLink: string;
  contents: Content[];
}

function isButtonContent(content: Content): content is ButtonContent {
  return content.type === 'button';
}

function Footer() {
  const [termsModal, setTermsModal] = useState<{
    isOpen: boolean;
    type: TermsType;
  }>({
    isOpen: false,
    type: 'terms',
  });

  const handleOpenTerms = (type: TermsType): void => {
    setTermsModal({
      isOpen: true,
      type,
    });
  };

  const handleCloseTerms = (): void => {
    setTermsModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const renderSightMapSections = () => {
    const { isAdmin } = useAuth();

    const adminContent: LinkContent[] = isAdmin
      ? [
          {
            type: 'link',
            name: '비밀번호 변경',
            link: '/admin/change-password',
          },
        ]
      : [];

    const sections: Section[] = [
      {
        title: '학과',
        titleLink: '/about',
        contents: [
          { type: 'link', name: '학과소개', link: '/about' },
          { type: 'link', name: '조직도', link: '/about/organization' },
          { type: 'link', name: '교수소개', link: '/about/faculty' },
          { type: 'link', name: '학생회', link: '/about/studentcouncil' },
        ],
      },
      {
        title: '대학',
        titleLink: '/undergraduate/curriculum',
        contents: [
          { type: 'link', name: '학사안내', link: '/college/guide' },
          {
            type: 'link',
            name: '학부교과과정',
            link: '/undergraduate/curriculum',
          },
          {
            type: 'link',
            name: '입학/장학',
            link: '/undergraduate/admission-scholarship',
          },
        ],
      },
      {
        title: '대학원',
        titleLink: '/graduate/overview',
        contents: [
          { type: 'link', name: '소개', link: '/graduate/overview' },
          { type: 'link', name: '교과과정', link: '/graduate/curriculum' },
        ],
      },
      {
        title: '바융소식',
        titleLink: '/news',
        contents: [
          { type: 'link', name: '학부뉴스', link: '/news' },
          { type: 'link', name: '공지사항', link: '/news/noticeboard' },
          { type: 'link', name: '세미나', link: '/news' },
          { type: 'link', name: '연구논문', link: '/news/thesis' },
        ],
      },
      {
        title: '서비스',
        titleLink: '/seminar-rooms/reservation',
        contents: [
          {
            type: 'link',
            name: '예약센터',
            link: '/seminar-rooms/reservation',
          },
          ...adminContent,
          {
            type: 'button',
            name: '이용약관',
            onClick: () => handleOpenTerms('terms'),
          } as ButtonContent,
          {
            type: 'button',
            name: '개인정보처리방침',
            onClick: () => handleOpenTerms('privacy'),
          } as ButtonContent,
          {
            type: 'button',
            name: '개인정보 수집 및 이용',
            onClick: () => handleOpenTerms('collection'),
          } as ButtonContent,
        ],
      },
    ];

    return sections.map((section, index) => (
      <S.SightMapHeader key={index}>
        <S.StyledLink to={section.titleLink}>{section.title}</S.StyledLink>
        <br />
        {section.contents.map((content, idx) =>
          isButtonContent(content) ? (
            <S.TermsButton key={idx} onClick={content.onClick} type="button">
              <S.SightMapContent>{content.name}</S.SightMapContent>
            </S.TermsButton>
          ) : (
            <S.StyledLink to={content.link} key={idx}>
              <S.SightMapContent>{content.name}</S.SightMapContent>
            </S.StyledLink>
          ),
        )}
      </S.SightMapHeader>
    ));
  };

  return (
    <S.Footer>
      <S.FooterInner>
        <S.FooterContainer>
          <S.Address>
            <S.AddressTitle>세종대학교</S.AddressTitle>
            바이오융합공학전공
            <br />
            Tel : 02) 3408-3334
            <br />
            서울특별시 광진구 능동로 209 (군자동) 충무관 103A
            <br />
          </S.Address>
          <S.SightMap>{renderSightMapSections()}</S.SightMap>
        </S.FooterContainer>
        <S.Copyright>
          <span>
            Copyright©2025 . 세종대학교 바이오융합공학전공 All rights reserved
          </span>
        </S.Copyright>
      </S.FooterInner>
      <TermsModal
        type={termsModal.type}
        isOpen={termsModal.isOpen}
        onClose={handleCloseTerms}
      />
    </S.Footer>
  );
}

export default Footer;
