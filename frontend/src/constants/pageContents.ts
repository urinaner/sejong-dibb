import graduateImg from '../assets/images/pages/graduate.jpg';
import undergraduateImg from '../assets/images/pages/undergraduate.jpg';
import newsImg from '../assets/images/pages/news.jpg';
import aboutImg from '../assets/images/pages/about.jpg';

export const PAGE_CONTENTS = {
  about: {
    title: '학과소개',
    description:
      '미래 바이오산업을 선도할 혁신적인 기술과 인재를 양성하는 바이오융합공학전공',
    image: aboutImg,
    path: '/about',
    subPages: {
      faculty: {
        title: '교수 소개',
        description:
          '최고의 전문성과 열정을 가진 바이오융합공학전공 교수진을 소개합니다',
        image: aboutImg,
        path: '/about/faculty',
      },
      organization: {
        title: '조직도',
        description:
          '바이오융합공학전공의 체계적인 조직 구성을 확인하실 수 있습니다',
        image: aboutImg,
        path: '/about/organization',
      },
      studentconcil: {
        title: '학생회 소개',
        description: '미래를 이끌어나갈 바이오융합공학부 학생회를 소개합니다.',
        image: aboutImg,
        path: '/about/studentcouncil',
      },
    },
  },
  undergraduate: {
    title: '학부과정',
    description:
      '체계적인 교육과정과 실무중심 교육을 통한 바이오융합 전문가 육성',
    image: undergraduateImg,
    path: '/undergraduate',
    subPages: {
      curriculum: {
        title: '교과과정',
        description:
          '체계적이고 전문적인 바이오융합공학전공의 교과과정을 소개합니다',
        image: undergraduateImg,
        path: '/undergraduate/curriculum',
      },
      admissionScholarship: {
        title: '입학/장학',
        description:
          '바이오융합공학전공의 입학정보와 다양한 장학제도를 확인하실 수 있습니다',
        image: undergraduateImg,
        path: '/undergraduate/admission-scholarship',
      },
    },
  },
  graduate: {
    title: '대학원',
    description:
      '첨단 연구시설과 우수한 교수진이 함께하는 바이오융합 분야 전문 연구과정',
    image: graduateImg,
    path: '/graduate',
    subPages: {
      overview: {
        title: '대학원 소개',
        description: '바이오융합공학전공 대학원의 특성과 비전을 소개합니다',
        image: graduateImg,
        path: '/graduate/overview',
      },
    },
  },
  news: {
    title: '학부 뉴스',
    description: '바이오융합공학전공의 최신 소식과 연구 성과를 전달합니다',
    image: newsImg,
    path: '/news',
    subPages: {
      noticeBoard: {
        title: '공지사항',
        description:
          '바이오융합공학전공의 주요 공지사항을 확인하실 수 있습니다',
        image: newsImg,
        path: '/news/noticeboard',
      },
      thesis: {
        title: '논문',
        description:
          '바이오융합공학전공의 연구 성과와 논문을 살펴보실 수 있습니다',
        image: newsImg,
        path: '/news/thesis',
      },
      seminar: {
        title: '세미나',
        description: '바이오융합공학전공 세미나 조회',
        image: newsImg,
        path: '/news/seminar',
      },
    },
  },
  seminar: {
    title: '세미나실',
    description: '최신 시설을 갖춘 세미나실에서 학술적 교류의 장을 마련합니다',
    image: aboutImg,
    path: '/seminar-rooms',
    subPages: {
      reservation: {
        title: '세미나실 예약',
        description: '세미나실 예약 현황을 확인하고 예약하실 수 있습니다',
        image: aboutImg,
        path: '/seminar-rooms/reservation',
      },
    },
  },
} as const;
export interface MainContent {
  title: string;
  videos: {
    id: string;
    title: string[];
  }[];
  logoSrc?: string;
}

export const MAIN_CONTENT: MainContent = {
  title: 'integrative\n' + 'bioscience and\n' + 'biotechnology',
  videos: [
    {
      id: 'video1',
      title: ['integrative', 'bioscience', 'biotechnology'],
    },
    {
      id: 'video2',
      title: ['integrative', 'bioscience', 'biotechnology'],
    },
  ],
};
export type PageContent = {
  title: string;
  description: string;
  image: string;
  path: string;
  subPages?: {
    [key: string]: Omit<PageContent, 'subPages'>;
  };
};
