import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Instagram } from 'lucide-react';
import {
  Wrapper,
  Content,
  Logo,
  Title,
  Description,
  InfoSection,
  InfoCard,
  InfoTitle,
  OrganizationImage,
  SocialLink,
  MarkdownContainer,
} from './StudentCouncilStyle';

const introContent = `
제7대 바이오융합공학전공 학생회 “하루(Haru)”는 청춘을 살아가는 지금, 우리의 하루를 알차고 값지게 보내고, 또 빛낼 수 있도록 노력하는 학생회입니다. \n
학우분들의 의견에 귀 기울이며 학우분들의 의사를 대변하고 다양한 학과 행사를 기획하여 학우분들의 학교생활이 더욱 풍요로워지고, 학우분들의 단합력을 증진 시킬 수 있도록 노력하고 있습니다. 
`;

const StudentCouncil = (): JSX.Element => {
  return (
    <Wrapper>
      <Content>
        <Logo src="/haru.png" alt="하루 학생회 로고" />
        <Title>제7대 바이오융합공학부 학생회</Title>
        <Description>
          &ldquo;하루(Haru)&rdquo; 학생회
          <br />
          2025-2026 학년도
        </Description>
        <InfoSection>
          <InfoCard>
            <InfoTitle>학생회 소개</InfoTitle>
            <MarkdownContainer>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {introContent}
              </ReactMarkdown>
            </MarkdownContainer>
          </InfoCard>

          <InfoCard>
            <InfoTitle>조직도</InfoTitle>
            <OrganizationImage
              src="/haru_organization.png"
              alt="학생회 조직도"
            />
          </InfoCard>
        </InfoSection>
        <SocialLink
          href="https://www.instagram.com/bio_ha_ru?igsh=MTd3M2gzdTZ6dHBrNg=="
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram size={32} />
          <span>@gbio_ha_ru</span>
        </SocialLink>
      </Content>
    </Wrapper>
  );
};

export default StudentCouncil;
