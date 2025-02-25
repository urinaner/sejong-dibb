import React from 'react';
import {
  Hyperlinks,
  HyperlinksContainer,
  Information,
  ContentWrapper,
} from './styles/UndergraduateStyle';
import Container from '../../styles/Container';

function Hyperlink() {
  return (
    <Container type="content">
      <ContentWrapper>
        <Information>
          세종대학교 바이오융합공학전공 관련된
          <br />
          입학, 학사, 장학, 학적 정보는
          <br />
          세종대학교 홈페이지에서 확인가능합니다.
        </Information>
        <HyperlinksContainer>
          <Hyperlinks
            href="https://ipsi.sejong.ac.kr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="입학 정보 바로가기"
          >
            <img src="/admission-guide.svg" alt="입학" />
          </Hyperlinks>
          <Hyperlinks
            href="http://www.sejong.ac.kr/unilife/program_01.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="학사 정보 바로가기"
          >
            <img src="/bachelor-guide.svg" alt="학사" />
          </Hyperlinks>
          <Hyperlinks
            href="http://www.sejong.ac.kr/unilife/newscholarship.html"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="장학금 정보 바로가기"
          >
            <img src="/scholarship-guide.svg" alt="장학금" />
          </Hyperlinks>
          <Hyperlinks
            href="https://sjpt.sejong.ac.kr/main/view/Login/doSsoLogin.do?p="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="학적 정보 바로가기"
          >
            <img src="/academic-guide.svg" alt="학적" />
          </Hyperlinks>
        </HyperlinksContainer>
      </ContentWrapper>
    </Container>
  );
}

export default Hyperlink;
