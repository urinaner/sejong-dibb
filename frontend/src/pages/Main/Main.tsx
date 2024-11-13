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

// 논문
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

// 공지사항
const announcementTab: string[] = ['학부', '대학원', '취업', '장학'];

interface Announcement {
  category: string;
  createDate: string;
  // file: string;
  id: number;
  title: string;
  viewCount: number;
  writer: string;
}

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
  const [papers, setPapers] = useState([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeTab, setActiveTab] = useState('학부');

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        const response = await axios.get(apiEndpoints.thesis.list, {
          params: {
            page: 0,
            size: 4,
          },
        });
        setPapers(response.data.data);
      } catch (error) {
        console.error('논문 데이터 가져오기 실패:', error);
      }
    };

    const fetchAnnouncement = async () => {
      try {
        const response = await axios.get(apiEndpoints.board.list, {
          params: {
            page: 0,
            size: 5,
          },
        });
        setAnnouncements(response.data.data);
      } catch (error) {
        console.error('공지사항 데이터 가져오기 실패', error);
      }
    };

    fetchPaper();
    fetchAnnouncement();
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
              {announcementTab.map((tab) => (
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
              {announcements
                .filter((announcement) => {
                  // 각 탭에 해당하는 카테고리로 필터링
                  switch (activeTab) {
                    case '학부':
                      return announcement.category === 'undergraduate';
                    case '대학원':
                      return announcement.category === 'graduate';
                    case '취업':
                      return announcement.category === 'employment';
                    case '장학':
                      return announcement.category === 'scholarship';
                    default:
                      return false;
                  }
                })
                .map((announcement) => (
                  <AnnouncementItem
                    key={announcement.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                    }}
                  >
                    <span>
                      <img src="/bullet.svg" />
                      {announcement.title}
                    </span>
                    <span>{announcement.createDate}</span>
                  </AnnouncementItem>
                ))}
            </ContentContainer>
          </AnnouncementContainer>
          <SeminarContainer>
            {/* TODO: 최신 세미나 링크 연결 필요 */}
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
