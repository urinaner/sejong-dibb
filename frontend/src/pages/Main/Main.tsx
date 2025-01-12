//Main.tsx
import {
  MainContainer,
  PaperContainer,
  TMP,
  Title,
  NewsTitle,
  Paper,
  AnnouncementAndSeminar,
  AnnouncementContainer,
  SeminarContainer,
  ShortcutContainer,
  Shortcut,
  ContentWrapper,
  TabContainer,
  TabButton,
  ContentContainer,
  AnnouncementItem,
  SeminarRoomReservation,
  NewsSection,
} from './MainStyle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoints } from '../../config/apiConfig';
import NewsSlider from '../../components/NewsSlider/NewsSlider';

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

// 뉴스
interface NewsItem {
  id: number;
  title: string;
  content: string;
  createDate: string;
  image: string;
  view: number;
  category?: string;
}

const CATEGORY_MAP = {
  학부: 'undergraduate',
  대학원: 'graduate',
  취업: 'employment',
  장학: 'scholarship',
} as const;

type CategoryKey = (typeof CATEGORY_MAP)[keyof typeof CATEGORY_MAP];

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
  const [news, setNews] = useState<NewsItem[]>([]);
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

        // 뉴스 데이터 로드
        const newsResponse = await axios.get<ApiResponse<NewsItem>>(
          apiEndpoints.news.listWithPage(0, 8),
        );
        setNews(newsResponse.data.data);

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

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    const categoryKey = CATEGORY_MAP[tab as keyof typeof CATEGORY_MAP];
    if (categoryKey) {
      fetchAnnouncementsByCategory(categoryKey);
    }
  };

  const handleAnnouncementClick = (id: number) => {
    navigate(`/news/noticeboard/${id}`);
  };

  const handleNewsClick = (id: number) => {
    navigate(`/news/${id}`);
  };

  return (
    <MainContainer>
      {/* 연구논문 섹션 */}
      <PaperContainer>
        <Title>연구 논문</Title>
        <TMP>
          {papers.map((paper: Paper) => (
            <Paper
              key={paper.journal}
              style={{ margin: '20px' }}
              onClick={() =>
                window.open(paper.link, '_blank', 'noopener,noreferrer')
              }
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  window.open(paper.link, '_blank', 'noopener,noreferrer');
                }
              }}
            >
              <img src={paper.thesisImage} alt={`${paper.title} 논문 이미지`} />
              <p>{paper.title}</p>
              <p>{paper.author}</p>
              <p>
                {paper.journal} ({paper.publicationDate})
              </p>
            </Paper>
          ))}
        </TMP>
      </PaperContainer>

      <ContentWrapper>
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
            <button>
              <p>세미나</p>
              <p>최신 세미나 제목</p>
              <div>
                최신 세미나 담당자
                <br />
                최신 세미나 일정
                <br />
                최신 세미나 진행 장소
              </div>
              <img src="info.svg" alt="info" />
            </button>
            <SeminarRoomReservation to="/seminar-rooms/reservation">
              <span>
                세미나실 <br />
                예약
              </span>
              <img src="/whiteCalendarIcon.svg" alt="calendar" />
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

      {/* 뉴스 슬라이더 섹션 */}
      <NewsSection>
        <NewsTitle>DIBB NEWS</NewsTitle>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '40px' }}>
          바이오융학공학전공의 주요 새소식을 전해드립니다.
        </p>
        <NewsSlider
          news={news}
          autoPlayInterval={5000}
          onNewsClick={handleNewsClick}
        />
      </NewsSection>
    </MainContainer>
  );
}

export default Main;
