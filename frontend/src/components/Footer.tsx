import React from 'react';
import * as S from '../styles/style';

function Footer() {
  return (
    <S.Footer>
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
          Copyright©2024 . 세종대학교 바이오융합공학전공 All rights reserved
        </span>
        <button style={{ background: 'none', border: 'none' }}>
          <img
            src="/adminLoginBtn.svg"
            alt=""
            style={{ marginRight: '60px', cursor: 'pointer' }}
          />
        </button>
      </S.Copyright>
    </S.Footer>
  );
}

// SightMap 섹션 렌더링
function renderSightMapSections() {
  const sections = [
    {
      title: '학과',
      contents: ['학과소개', '조직도', '교수소개'],
    },
    {
      title: '대학',
      contents: ['학사안내', '학부교과과정', '입학/장학'],
    },
    {
      title: '대학원',
      contents: ['소개', '교과과정', '학칙/규정'],
    },
    {
      title: '바융소식',
      contents: ['공지사항', '세미나', '연구논문'],
    },
    {
      title: '세미나실 예약',
      contents: [],
    },
  ];

  return sections.map((section, index) => (
    <S.SightMapHeader key={index}>
      {section.title}
      <br />
      {section.contents.map((content, idx) => (
        <S.SightMapContent key={idx}>{content}</S.SightMapContent>
      ))}
    </S.SightMapHeader>
  ));
}

export default Footer;
