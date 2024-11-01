import {
  MainContainer,
  PaperContainer,
  Title,
  AnnouncementAndSeminar,
  AnnouncementContainer,
  SeminarContainer,
  ShortcutContainer,
  Paper,
  Shortcut,
  ContentWrapper,
} from './MainStyle';

// 더미 데이터
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

const links = [
  {
    icon: '/homeIcon.svg',
    title: '세종대학교 홈',
    link: 'http://sejong.ac.kr/',
  },
  {
    icon: '/desktopIcon.svg',
    title: '교내 공지사항',
    link: 'http://sejong.ac.kr/community/index.html',
  },
  {
    icon: '/calendarIcon.svg',
    title: '학사일정',
    link: 'http://www.sejong.ac.kr/unilife/program_01.html?menu_id=1.1',
  },
  {
    icon: '/faxIcon.svg',
    title: '입시홈페이지',
    link: 'https://ipsi.sejong.ac.kr/',
  },
  {
    icon: '/webIcon.svg',
    title: '일반대학원',
    link: 'https://graduate.sejong.ac.kr/graduate/index.do',
  },
  {
    icon: '/walletIcon.svg',
    title: '교내 양식',
    link: '', // TODO: 추가하기
  },
];

function Main(): JSX.Element {
  return (
    <MainContainer>
      {/* 연구논문 */}
      <PaperContainer>
        <Title>연구 논문</Title>
        {/* 더미 데이터 */}
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

      <ContentWrapper>
        {/* 공지사항, 세미나 */}
        <AnnouncementAndSeminar>
          <AnnouncementContainer>공지사항</AnnouncementContainer>
          <SeminarContainer>
            <button>
              <p style={{ fontSize: '22px', marginBottom: '0' }}>세미나</p>
              <p style={{ fontSize: '16px', fontWeight: '700' }}>
                최신 세미나 제목
              </p>
              <div style={{ fontSize: '14px', fontWeight: '300' }}>
                최신 세미나 담당자
                <br />
                최신 세미나 일정
                <br />
                최신 세미나 진행 장소
              </div>
              <img src="info.svg" />
            </button>
            <button>
              <span style={{ marginRight: '20px' }}>세미나실 예약</span>
              <img src="/whiteCalendarIcon.svg" />
            </button>
          </SeminarContainer>
        </AnnouncementAndSeminar>

        {/* 바로가기 */}
        <ShortcutContainer>
          {links.map((item) => (
            <a
              href={item.link}
              key={item.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Shortcut key={item.title}>
                <img src={item.icon} />
                {item.title}
              </Shortcut>
            </a>
          ))}
        </ShortcutContainer>
      </ContentWrapper>
    </MainContainer>
  );
}

export default Main;
