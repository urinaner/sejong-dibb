import React from 'react';
import {
  Wrapper,
  Content,
  Title,
  Description,
  InfoSection,
  InfoCard,
  InfoTitle,
  InfoDescription,
} from './AboutStyle'; // 스타일 컴포넌트 임포트

const About = (): JSX.Element => {
  return (
    <Wrapper>
      <Content>
        <Title>바이오융합공학전공</Title>
        <Description>
          Sejong University
          <br />
          Division of Integrative Bioscience and Biotechnology
        </Description>
        <InfoSection>
          <InfoCard>
            <InfoTitle>학과 소개</InfoTitle>
            <InfoDescription>학과 소개 TMI</InfoDescription>
          </InfoCard>
          <InfoCard>
            <InfoTitle>교육 목표</InfoTitle>
            <InfoDescription>교육 목표 TMI</InfoDescription>
          </InfoCard>
        </InfoSection>
      </Content>
    </Wrapper>
  );
};

export default About;
