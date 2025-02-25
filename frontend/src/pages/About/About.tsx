// About.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Wrapper,
  Content,
  Title,
  Description,
  InfoSection,
  InfoCard,
  InfoTitle,
  MarkdownContainer,
} from './AboutStyle';
import remarkGfm from 'remark-gfm';
import Container from '../../styles/Container';

// 기존 Markdown 콘텐츠 정의
const introContent = `
바이오기술(BT)과 다른 분야와의 융합 연구는 인류의 번영과 복지에 필요한 새로운 연구를 통해 보건, 의약, 의료기술, 환경문제 해결의 주된 수단으로 **그 필요성에 대한 인식이 전세계적으로 확산**되고 있습니다.  
특히, 21세기의 국가경쟁력 확보를 위한 **성장 동력의 축**이 될 것으로 전망됩니다. 
   
본 바이오융합공학 전공은 **2013년 신설된 세종대학교의 브랜드 전공 중 하나**로, 건강한 인류사회 구현을 목표로 생명공학의 특성인 다분야 학문간 융합 교육과정을 통해 **미래사회의 유망산업인 차세대 바이오융합 산업의 인재 양성을 위한 교육**을 선도하고자 합니다.

---

### 기초학문과 응용분야
본 전공은 생명체의 기본 생명현상을 이해하기 위해 다음과 같은 **기초학문**을 포함합니다:

- **분자 생물학**
- **미생물학**
- **유전학**
- **생리학**
- **생화학**
- **면역학**

또한, 이러한 원리를 활용하여 **질병의 예방과 치료에 기여할 수 있는 바이오 의료 기술 개발 연구 및 교육**에 중점을 둔 다양한 응용분야로 이루어져 있습니다:

- **나노바이오공학**
- **백신개발**
- **생물(화학)공학**
- **신약설계**
- **노화생명**
- **줄기세포**
- **뇌인지과학**
`;

const goalContent = `
### 우수한 연구역량
1. 기초부터 응용 연구까지 다양한 연구 경험 획득.
2. 타교와 차별화된 연구 핵심역량 강화를 통한 우수학생 육성.
3. 국제화, 연구특성화 및 산학공동체제 구축하여 지속적인 쌍방향 커뮤니케이션을 통한 높은 수준의 연구성과 도출.
4. 국제 공동 연구를 통한 우수한 성과 도출 및 교환학생 프로그램 활성화를 통하여 국제교류 및 상호 학술프로그램 운영.
5. 연구결과를 바탕으로 한 제품 개발 및 연구결과의 산업화.

---

### 차별화된 교육과정
1. 바이오융합공학 우수신입생에게 4년간 세종 브랜드 장학금(등록금 전액) 지급.
2. 지도교수의 1:1 지도 하에 학·석사 프로그램(학사 3.5년, 석사 1.5년) 이수, 석사과정 등록금 전액 및 연구장려금 지급.
3. 졸업 후 본교 일반대학원 박사과정 진학 시 전액등록금 및 연구 장려금 지급.
4. 박사후 과정 이수 후 본교 전임교원 공채 지원 시 채용 우대.
`;

// 새로운 졸업 후 진로 콘텐츠 정의
const careerContent = `
### 졸업 후 진로
1. 국내/해외 대학원 및 전문대학원(의학/치의학/한의학/약학전문대학원) 진학.
2. 관련 분야 회사 취업(제약업계, 의료업계, 바이오벤처 회사, 화장품업계, 화학분석기기 관련 외국계 회사, 컨설팅회사, 컴퓨터 관련 회사 등).
3. 여러 정부기관 및 정부출연 연구소(국립보건원, 식품의약품안전처, 생명공학연구원, 화학연구소, 해양연구소, KIST 등)의 다양한 분야로 진출이 가능하다.

*바이오융합공학 전공 졸업 후 대학원 진학, 관련 분야 회사 취업, 국립연구기관 취업, 국내의 여러 정부기관 및 정부출연 연구소의 다양한 분야로 진출이 가능하다.  
  
세종대학교 바이오융합공학 전공은 연구능력 국내 4위로 대학원 학생 지도 및 학부 학생 실험 지도에 필요한 연구 인프라가 강한 것으로 평가 받고 있다.*
`;

const About = (): JSX.Element => {
  return (
    <Container>
      <Content>
        <Title>바이오융합공학전공</Title>
        <Description>
          Sejong University
          <br />
          Division of Integrative Bioscience and Biotechnology
        </Description>
        <InfoSection>
          {/* 학과 소개 구역 */}
          <InfoCard>
            <InfoTitle>학과 소개</InfoTitle>
            <MarkdownContainer>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {introContent}
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

          {/* 졸업 후 진로 구역 */}
          <InfoCard>
            <InfoTitle>졸업 후 진로</InfoTitle>
            <MarkdownContainer>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {careerContent}
              </ReactMarkdown>
            </MarkdownContainer>
          </InfoCard>
        </InfoSection>
      </Content>
    </Container>
  );
};

export default About;
