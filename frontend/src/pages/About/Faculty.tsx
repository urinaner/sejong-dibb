import {
  ProfessorCard,
  ProfessorImage,
  ProfessorInfo,
  ProfessorName,
  ProfessorTitle,
  InfoGroup,
  InfoItem,
  Highlight,
} from './FacultyStyle';

function Faculty() {
  return (
    <ProfessorCard>
      {/* 교수 사진 */}
      <ProfessorImage src="https://via.placeholder.com/200" alt="교수 사진" />

      {/* 교수 정보 */}
      <ProfessorInfo>
        <ProfessorTitle>교수</ProfessorTitle>
        <ProfessorName>교수명</ProfessorName>
        <ProfessorTitle>연구실명</ProfessorTitle>
        <ProfessorTitle>담당분야명</ProfessorTitle>
      </ProfessorInfo>

      {/* 학력과 연락처 */}
      <InfoGroup style={{ marginTop: '0' }}>
        <Highlight style={{ marginTop: '0' }}>학력</Highlight>
        <img src="/horizontalBar.svg" alt="horizontal bar" />
        <InfoItem>학사: 학사 대학/전공명</InfoItem>
        <InfoItem>석사: 석사 대학/전공명</InfoItem>
        <InfoItem>박사: 박사 대학/전공명</InfoItem>

        <Highlight>연락처</Highlight>
        <img src="/horizontalBar.svg" alt="horizontal bar" />
        <InfoItem>전화번호: 02-3408-0000</InfoItem>
        <InfoItem>이메일: 0000@sejong.ac.kr</InfoItem>
        <InfoItem>홈페이지: http://home.sejong.ac.kr/0000</InfoItem>
        <InfoItem>연구실: 세종대학교 충무관 000호</InfoItem>
      </InfoGroup>
    </ProfessorCard>
  );
}

// TODO: 푸터 교수소개, 조직도 링크 바뀜
export default Faculty;
