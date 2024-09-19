import React from 'react';
import * as S from '../styles/style';

function Footer() {
  return (
    <S.Footer>
      <S.FooterContainer>
        <S.Address>
          <p
            style={{
              fontSize: '32px',
              fontWeight: '500',
              margin: '0 0 20px 0',
            }}
          >
            세종대학교
          </p>
          바이오융합공학전공
          <br />
          Tel : 02) 3408-3334
          <br />
          서울특별시 광진구 능동로 209 (군자동) 충무관 103A
          <br />
        </S.Address>
        <S.SightMap>
          <S.SightMapHeader>
            학과
            <br />
            <S.SightMapContent>학과소개</S.SightMapContent>
            <S.SightMapContent>조직도</S.SightMapContent>
            <S.SightMapContent>교수소개</S.SightMapContent>
          </S.SightMapHeader>
          <S.SightMapHeader>
            대학
            <br />
            <S.SightMapContent>학사안내</S.SightMapContent>
            <S.SightMapContent>학부교과과정</S.SightMapContent>
            <S.SightMapContent>입학/장학</S.SightMapContent>
          </S.SightMapHeader>
          <S.SightMapHeader>
            대학원
            <br />
            <S.SightMapContent>소개</S.SightMapContent>
            <S.SightMapContent>교과과정</S.SightMapContent>
            <S.SightMapContent>학칙/규정</S.SightMapContent>
          </S.SightMapHeader>
          <S.SightMapHeader>
            바융소식
            <br />
            <S.SightMapContent>공지사항</S.SightMapContent>
            <S.SightMapContent>세미나</S.SightMapContent>
            <S.SightMapContent>연구논문</S.SightMapContent>
          </S.SightMapHeader>
          <S.SightMapHeader>
            세미나실 예약
            <br />
          </S.SightMapHeader>
        </S.SightMap>
      </S.FooterContainer>
      <S.Copyright>
        <span>
          Copyright©2024 . 세종대학교 바이오융합공학전공 All rights reserved
        </span>
        <span>
          <img
            src="/adminLoginBtn.svg"
            alt=""
            style={{ marginRight: '60px', cursor: 'pointer' }}
          />
        </span>
      </S.Copyright>
    </S.Footer>
  );
}

export default Footer;
