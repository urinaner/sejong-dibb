import {
  MainContainer,
  PaperContainer,
  TMP,
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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../config/apiConfig';

interface ApiResponse<T> {
  message: string;
  page: number;
  totalPage: number;
  data: T[];
}
// 논문
interface Paper {
  title: string;
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

const CATEGORY_MAP = {
  학부: 'undergraduate',
  대학원: 'graduate',
  취업: 'employment',
  장학: 'scholarship',
} as const;

type CategoryKey = (typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP];

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
  const navigate = useNavigate();
  const [papers, setPapers] = useState<Paper[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [activeTab, setActiveTab] = useState('학부');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 논문 데이터 로드
        const paperResponse = await axios.get<ApiResponse<Paper>>(
          apiEndpoints.thesis.listWithPage(0, 4),
        );
        setPapers(paperResponse.data.data);

        // 초기 카테고리(학부)의 공지사항 로드
        await fetchAnnouncementsByCategory(CATEGORY_MAP.학부);
      } catch (err) {
        console.error('초기 데이터 로드 실패:', err);
      }
    };

    fetchInitialData();
  }, []);

  const fetchAnnouncementsByCategory = async (category: CategoryKey) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse<Announcement>>(
        `${apiEndpoints.board.base}/category/${category}`,
        {
          params: {
            page: 0,
            size: 5,
          },
        },
      );
      setAnnouncements(response.data.data);
    } catch (error) {
      console.error('공지사항 데이터 가져오기 실패:', error);
      setError('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const categoryKey = CATEGORY_MAP[tab as keyof typeof CATEGORY_MAP];
    if (categoryKey) {
      fetchAnnouncementsByCategory(categoryKey);
    }
  };

  // 특정 공지사항 페이지로 이동
  const handleAnnouncementClick = (id: number) => {
    navigate(`/news/noticeboard/${id}`);
  };

  return (
    <MainContainer>
      {/* 연구논문 */}
      <PaperContainer>
        <Title>연구 논문</Title>
        <TMP>
          {papers.map((paper: Paper) => (
            <Paper key={paper.journal} style={{ margin: '10px' }}>
              <img src={paper.thesisImage} alt="논문 이미지" />
              <p>{paper.title}</p>
              <p>{paper.content}</p>
            </Paper>
          ))}
        </TMP>
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
                  onClick={() => handleTabChange(tab)}
                >
                  {tab}
                </TabButton>
              ))}
            </TabContainer>
            <ContentContainer>
              {loading ? (
                <div>로딩 중...</div>
              ) : error ? (
                <div>{error}</div>
              ) : announcements.length === 0 ? (
                <div>등록된 공지사항이 없습니다.</div>
              ) : (
                announcements.map((announcement) => (
                  <AnnouncementItem
                    key={announcement.id}
                    onClick={() => handleAnnouncementClick(announcement.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                    }}
                  >
                    <span>
                      <img src="/bullet.svg" alt="bullet" />
                      {announcement.title}
                    </span>
                    <span>{announcement.createDate}</span>
                  </AnnouncementItem>
                ))
              )}
            </ContentContainer>
          </AnnouncementContainer>
          <SeminarContainer>
            {/* TODO: 최신 세미나 링크 연결 필요 */}
            <button
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <p>세미나</p>
              <p>최신 세미나 제목</p>
              <div>
                최신 세미나 담당자
                <br />
                최신 세미나 일정
                <br />
                최신 세미나 진행 장소
              </div>
              <img src="info.svg" />
            </button>
            <SeminarRoomReservation to="/seminar-rooms/reservation">
              <span>
                세미나실 <br />
                예약
              </span>
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
