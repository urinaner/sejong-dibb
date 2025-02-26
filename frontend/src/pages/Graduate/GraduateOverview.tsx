import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as S from './GraduateOverviewStyle';

const overviewContent = `
**신약 설계/개발, 제약, 보건, 환경, 바이오산업등의 발달**에 기여할 수 있도록 특화된 융합과 응용 관련된 커리큘럼을 수강합니다.
이를 통해 학생 개개인의 특정분야 전문성을 강화할 수 있으며, 추가로 학석사 연계과정을 통해
바이오산업 현장에 바로 투입될 수 있는 **실무형 전문가**로 성장할 수 있습니다.  
  
또한 **난치병 퇴치를 위한 신약개발 연구, 생명소재 개발 및 생산에 관한 연구**를 세계적 수준으로 육성하여
이 분야의 급속한 발전에 부응할 수 있는 석/박사급 전문연구인력 육성에 중점을 두고 있습니다.
`;

const goalContent = `
- 기초부터 응용 연구까지 다양한 연구 경험 획득
- 차별화된 연구 핵심역량 강화를 통한 우수학생 육성
- 전공심화 및 융합 관련된 32개 전공선택과목을 개설하여 학생들의 선택권 확대
- 전문성 강화를 위한 22개 실험실에서 학부생의 연구실 체험 프로그램 운영
- 국제 공동 연구를 통한 우수한 성과 도출 및 교환학생 프로그램 활성화를 통하여 국제교류 및 상호 학술프로그램 운영
- 학석사 연계과정을 통해 실무형 전문가 교육
`;

function GraduateOverview() {
  return (
    <S.Container>
      <S.HeaderContainer>
        <S.Title>바이오융합공학과</S.Title>
      </S.HeaderContainer>

      <S.SubtitleContainer>
        <S.Subtitle>
          Sejong University
          <br />
          Department of Integrative Bioscience and Biotechnology
        </S.Subtitle>
      </S.SubtitleContainer>

      <S.ContentContainer>
        {/* 학과 소개 구역 */}
        <S.InfoTitle>대학원 소개</S.InfoTitle>
        <S.MarkdownContainer>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {overviewContent}
          </ReactMarkdown>
        </S.MarkdownContainer>

        {/* 교육 목표 구역 */}
        <S.InfoTitle>교육 목표</S.InfoTitle>
        <S.MarkdownContainer>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {goalContent}
          </ReactMarkdown>
        </S.MarkdownContainer>
      </S.ContentContainer>
    </S.Container>
  );
}

export default GraduateOverview;
