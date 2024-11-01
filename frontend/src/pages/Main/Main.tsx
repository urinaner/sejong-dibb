import {
  MainContainer,
  PaperContainer,
  Title,
  AnnouncementAndSeminar,
  AnnouncementContainer,
  SeminarContainer,
  ShortcutContainer,
  Paper,
} from './MainStyle';

// 임시 데이터
const paper = [
  {
    title: '연구 논문1',
    content: '연구 논문1 초반 내용',
  },
  {
    title: '연구 논문2',
    content: '연구 논문2 초반 내용',
  },
  {
    title: '연구 논문3',
    content: '연구 논문3 초반 내용',
  },
  {
    title: '연구 논문4',
    content: '연구 논문4 초반 내용',
  },
];

function Main(): JSX.Element {
  return (
    <MainContainer>
      {/* 연구논문 */}
      <PaperContainer>
        <Title>연구 논문</Title>
        {/* map 써서 논문 4개 띄우기 (더미 데이터) */}
        <div style={{ display: 'flex' }}>
          {paper.map((item) => (
            <Paper key={item.title}>
              <img src="paperImage.png" />
              <p>{item.title}</p>
              <p>{item.content}</p>
            </Paper>
          ))}
        </div>
      </PaperContainer>

      {/* 공지사항, 세미나 */}
      <AnnouncementAndSeminar>
        <AnnouncementContainer></AnnouncementContainer>
        <SeminarContainer></SeminarContainer>
      </AnnouncementAndSeminar>

      {/* 바로가기 */}
      <ShortcutContainer></ShortcutContainer>
    </MainContainer>
  );
}

export default Main;
