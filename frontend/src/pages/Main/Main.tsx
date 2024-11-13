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
  TabContainer,
  TabButton,
  ContentContainer,
  AnnouncementItem,
  SeminarRoomReservation,
} from './MainStyle';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { apiEndpoints } from '../../config/apiConfig';

interface Announcement {
  title: string;
  date: string;
}

interface Paper {
  author: string;
  content: string;
  issn: string;
  journal: string;
  link: string;
  publicationCollection: string;
  publicationDate: string;
  publicationIssue: string;
  publicationPage: string;
  thesisImage: string;
}

const announcements: { [key: string]: Announcement[] } = {
  학부: [
    { title: '공지사항', date: '2024.00.00' },
    { title: '공지사항', date: '2024.00.00' },
    { title: '공지사항', date: '2024.00.00' },
    { title: '공지사항', date: '2024.00.00' },
    { title: '공지사항', date: '2024.00.00' },
  ],
  대학원: [
    { title: '대학원 공지사항', date: '2024.00.00' },
    { title: '대학원 공지사항', date: '2024.00.00' },
    { title: '대학원 공지사항', date: '2024.00.00' },
    { title: '대학원 공지사항', date: '2024.00.00' },
    { title: '대학원 공지사항', date: '2024.00.00' },
  ],
  취업: [
    { title: '취업 공지사항', date: '2024.00.00' },
    { title: '취업 공지사항', date: '2024.00.00' },
    { title: '취업 공지사항', date: '2024.00.00' },
    { title: '취업 공지사항', date: '2024.00.00' },
    { title: '취업 공지사항', date: '2024.00.00' },
  ],
  장학: [
    { title: '장학 공지사항', date: '2024.00.00' },
    { title: '장학 공지사항', date: '2024.00.00' },
    { title: '장학 공지사항', date: '2024.00.00' },
    { title: '장학 공지사항', date: '2024.00.00' },
    { title: '장학 공지사항', date: '2024.00.00' },
  ],
};

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
    link: 'https://board.sejong.ac.kr/boardlist.do?bbsConfigFK=692',
  },
];

function Main(): JSX.Element {
  const [activeTab, setActiveTab] =
    useState<keyof typeof announcements>('학부');
  const [papers, setPapers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiEndpoints.thesis.list, {
          params: {
            page: 0,
            size: 4,
          },
        });
        setPapers(response.data.data);
      } catch (error) {
        console.error('논문 데이터를 가져오는 중 오류 발생:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <MainContainer>
      {/* 연구논문 */}
      <PaperContainer>
        <Title>연구 논문</Title>
        <div style={{ display: 'flex' }}>
          {papers.map((paper: Paper) => (
            <Paper key={paper.journal} style={{ margin: '10px' }}>
              <img src={paper.thesisImage} alt="논문 이미지" />
              <p>{paper.author}</p>
              <p>{paper.content}</p>
            </Paper>
          ))}
        </div>
      </PaperContainer>

      <ContentWrapper>
        {/* 공지사항, 세미나 */}
        <AnnouncementAndSeminar>
          <AnnouncementContainer>
            <p>공지사항</p>
            <TabContainer>
              {Object.keys(announcements).map((tab) => (
                <TabButton
                  key={tab}
                  isActive={activeTab === tab}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </TabButton>
              ))}
            </TabContainer>
            <ContentContainer>
              {announcements[activeTab].map((announcement, index) => (
                <AnnouncementItem key={index}>
                  <span>
                    <img src="/bullet.svg" />
                    <span>{announcement.title}</span>
                  </span>
                  <span>{announcement.date}</span>
                </AnnouncementItem>
              ))}
            </ContentContainer>
          </AnnouncementContainer>
          <SeminarContainer>
            {/* TODO: 링크 연결이 필요하면 넣기 */}
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
            <SeminarRoomReservation to="/seminar-rooms/reservation">
              <span style={{ marginRight: '20px' }}>세미나실 예약</span>
              <img src="/whiteCalendarIcon.svg" />
            </SeminarRoomReservation>
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
