import { IconBaseProps } from 'react-icons';
import { FaChalkboardTeacher, FaBook } from 'react-icons/fa';

export interface CardItem {
  icon: React.ComponentType<IconBaseProps>;
  title: string;
  subText: string;
  link: string;
}

const ProfessorIcon = FaChalkboardTeacher as React.ComponentType<IconBaseProps>;
const BookIcon = FaBook as React.ComponentType<IconBaseProps>;

export const cardData: CardItem[] = [
  {
    icon: ProfessorIcon,
    title: '교수진 소개',
    subText: 'Meet our esteemed professors',
    link: 'https://ibb.sejong.ac.kr/about/faculty',
  },
  {
    icon: BookIcon,
    title: '교과과정 안내',
    subText: 'See our curriculum details',
    link: 'https://ibb.sejong.ac.kr/graduate/curriculum',
  },
];
