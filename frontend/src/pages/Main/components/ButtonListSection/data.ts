import { IconBaseProps } from 'react-icons';
import {
  FaUniversity,
  FaGraduationCap,
  FaGlobe,
  FaUsers,
  FaChalkboardTeacher,
} from 'react-icons/fa';

const UniversityIcon = FaUniversity as React.ComponentType<IconBaseProps>;
const ScholarshipIcon = FaGraduationCap as React.ComponentType<IconBaseProps>;
const PortalIcon = FaGlobe as React.ComponentType<IconBaseProps>;
const StudentIcon = FaUsers as React.ComponentType<IconBaseProps>;
const SeminarIcon = FaChalkboardTeacher as React.ComponentType<IconBaseProps>;
export interface ButtonItem {
  title: string;
  icon: React.ComponentType<IconBaseProps>;
  link: string;
  isSeminar: boolean;
}

export const buttonItems: ButtonItem[] = [
  {
    title: '세종대학교',
    icon: UniversityIcon,
    link: 'http://sejong.ac.kr/',
    isSeminar: false,
  },
  {
    title: '장학안내',
    icon: ScholarshipIcon,
    link: 'http://www.sejong.ac.kr/unilife/newscholarship.html',
    isSeminar: false,
  },
  {
    title: '포털 시스템',
    icon: PortalIcon,
    link: 'https://portal.sejong.ac.kr',
    isSeminar: false,
  },
  {
    title: '학생회 안내',
    icon: StudentIcon,
    link: '/about/studentcouncil',
    isSeminar: false,
  },
  {
    title: '세미나 정보',
    icon: SeminarIcon,
    link: '/',
    isSeminar: true,
  },
];
