// CATEGORY_MAP을 상수 객체와 타입으로 정의
export const CATEGORY_MAP = {
  학부: 'undergraduate',
  대학원: 'graduate',
  취업: 'employment',
  장학: 'scholarship',
} as const;

// 카테고리 맵의 키와 값에 대한 타입 생성
export type CategoryKey = keyof typeof CATEGORY_MAP;
export type CategoryValue = (typeof CATEGORY_MAP)[CategoryKey];

// 공지사항 탭 목록
export const ANNOUNCEMENT_TABS: CategoryKey[] = [
  '학부',
  '대학원',
  '취업',
  '장학',
];

// 바로가기 링크 정보
export const SHORTCUT_LINKS = [
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
] as const;

// 바로가기 링크 타입 정의
export interface ShortcutLink {
  icon: string;
  title: string;
  link: string;
}
