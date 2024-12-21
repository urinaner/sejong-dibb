import React from 'react';
import {
  OverviewContainer,
  Title,
  Text,
  InfoSection,
  InfoCard,
  InfoTitle,
  MarkdownContainer,
} from './GraduateOverviewStyle';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const overviewContent = `
  
`;

const goalContent = ``;

function GraduateOverview() {
  return (
    <OverviewContainer>
      <Title>바이오융합공학과</Title>
      <Text>
        Sejong University
        <br />
        Department of Integrative Bioscience and Biotechnology
      </Text>

      <InfoSection>
        {/* 학과 소개 구역 */}
        <InfoCard>
          <InfoTitle>학과 소개</InfoTitle>
          <MarkdownContainer>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {overviewContent}
            </ReactMarkdown>
          </MarkdownContainer>
        </InfoCard>

        {/* 교육 목표 구역 */}
        <InfoCard>
          <InfoTitle>교육 목표</InfoTitle>
          <MarkdownContainer>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {goalContent}
            </ReactMarkdown>
          </MarkdownContainer>
        </InfoCard>
      </InfoSection>
    </OverviewContainer>
  );
}

export default GraduateOverview;
