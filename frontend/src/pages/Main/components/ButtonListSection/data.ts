import { SvgIconProps } from '@mui/material';
import { IconType } from './icons';

export interface ButtonItem {
  title: string;
  icon: IconType;
  link: string;
  isSeminar: boolean;
}

export const buttonItems: ButtonItem[] = [
  {
    title: '세종대학교',
    icon: 'university',
    link: 'http://sejong.ac.kr/',
    isSeminar: false,
  },
  {
    title: '장학안내',
    icon: 'scholarship',
    link: 'http://www.sejong.ac.kr/unilife/newscholarship.html',
    isSeminar: false,
  },
  {
    title: '포털 시스템',
    icon: 'portal',
    link: 'https://portal.sejong.ac.kr',
    isSeminar: false,
  },
  {
    title: '학생회 안내',
    icon: 'student',
    link: '/about/studentcouncil',
    isSeminar: false,
  },
  {
    title: '세미나 정보',
    icon: 'seminar',
    link: '/',
    isSeminar: true,
  },
];
