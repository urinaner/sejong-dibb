import graduateImg from '../assets/images/pages/graduate.jpg';
import undergraduateImg from '../assets/images/pages/undergraduate.jpeg';
import newsImg from '../assets/images/pages/news.jpg';
import aboutImg from '../assets/images/pages/graduate.jpg';
import mainVideo from '../assets/videos/main.mp4';
import sejongIcon from '../assets/images/sejong-icon.svg';

export const PAGE_CONTENTS = {
  about: {
    title: "학과소개",
    description: "미래 바이오산업을 선도할 혁신적인 기술과 인재를 양성하는 바이오융합공학전공",
    image: aboutImg,
    path: "/about"
  },
  undergraduate: {
    title: "학부과정",
    description: "체계적인 교육과정과 실무중심 교육을 통한 바이오융합 전문가 육성",
    image: undergraduateImg,
    path: "/undergraduate"
  },
  graduate: {
    title: "대학원",
    description: "첨단 연구시설과 우수한 교수진이 함께하는 바이오융합 분야 전문 연구과정",
    image: graduateImg,
    path: "/graduate"
  },
  news: {
    title: "바융소식",
    description: "바이오융합공학전공의 최신 소식과 연구 성과를 전달합니다",
    image: newsImg,
    path: "/news"
  },
  seminar: {
    title: "세미나실",
    description: "최신 시설을 갖춘 세미나실에서 학술적 교류의 장을 마련합니다",
    image: aboutImg,
    path: "/seminar-rooms"
  }
} as const;

export const MAIN_CONTENT = {
  videoSrc: mainVideo,
  title: "세종대학교 바이오융합공학전공",
  logoSrc: sejongIcon
} as const;
