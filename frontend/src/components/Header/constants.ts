export const navItems = [
  {
    title: '학과',
    path: '/about',
    menuItems: [
      { name: '학과소개', path: '/about' },
      { name: '교수소개', path: '/about/faculty' },
      { name: '조직도', path: '/about/organization' },
      { name: '학생회', path: '/about/studentcouncil' },
    ],
  },
  {
    title: '대학',
    path: '/undergraduate/curriculum',
    menuItems: [
      { name: '학부교과과정', path: '/undergraduate/curriculum' },
      {
        name: '입학/장학 (학사/입학)',
        path: '/undergraduate/admission-scholarship',
      },
    ],
  },
  {
    title: '대학원',
    path: '/graduate/overview',
    menuItems: [
      { name: '소개', path: '/graduate/overview' },
      { name: '교과과정', path: '/graduate/curriculum' },
    ],
  },
  {
    title: '바융소식',
    path: '/news',
    menuItems: [
      { name: '학부뉴스', path: '/news' },
      { name: '공지사항', path: '/news/noticeboard' },
      { name: '세미나', path: '/news/seminar' },
      { name: '연구논문', path: '/news/thesis' },
    ],
  },
  {
    title: '⏱ 서비스',
    path: '/seminar-rooms/reservation',
    menuItems: [{ name: '예약센터', path: '/seminar-rooms/reservation' }],
  },
];
