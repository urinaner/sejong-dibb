import React from 'react';
import { Link } from 'react-router-dom';
import * as S from './FooterStyle';

function Footer() {
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
    </S.Footer>
  );
}

// SightMap 섹션 렌더링 (기존 코드 유지)
function renderSightMapSections() {
  const sections = [
    {
      title: '학과',
      titleLink: '/about',
      contents: [
        { name: '학과소개', link: '/about' },
        { name: '조직도', link: '/about/organization' },
        { name: '교수소개', link: '/about/faculty' },
      ],
    },
    {
      title: '대학',
      titleLink: '/undergraduate/curriculum',
      contents: [
        { name: '학사안내', link: '/college/guide' },
        { name: '학부교과과정', link: '/undergraduate/curriculum' },
        { name: '입학/장학', link: '/undergraduate/admission-scholarship' },
      ],
    },
    {
      title: '대학원',
      titleLink: '/graduate/overview',
      contents: [
        { name: '소개', link: '/graduate/overview' },
        { name: '교과과정', link: '/graduate/curriculum' },
        { name: '학칙/규정', link: '/graduate/rules' },
      ],
    },
    {
      title: '바융소식',
      titleLink: '/news/noticeboard',
      contents: [
        { name: '공지사항', link: '/news/noticeboard' },
        { name: '세미나', link: '/news' },
        { name: '연구논문', link: '/news/thesis' },
      ],
    },
    {
      title: '세미나실 예약',
      titleLink: '/seminar-rooms/reservation',
      contents: [{ name: '예약 페이지', link: '/seminar-rooms/reservation' }],
    },
  ];

  return sections.map((section, index) => (
    <S.SightMapHeader key={index}>
      <S.StyledLink to={section.titleLink}>{section.title}</S.StyledLink>
      <br />
      {section.contents.map((content, idx) => (
        <S.StyledLink to={content.link} key={idx}>
          <S.SightMapContent>{content.name}</S.SightMapContent>
        </S.StyledLink>
      ))}
    </S.SightMapHeader>
  ));
}

export default Footer;
