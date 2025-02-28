import { IconBaseProps } from 'react-icons';
import {
  FaUniversity,
  FaGraduationCap,
  FaGlobe,
  FaUsers,
  FaChalkboardTeacher,
} from 'react-icons/fa';

// 아이콘을 "React.ComponentType<IconBaseProps>" 형태로 캐스팅
const UniversityIcon = FaUniversity as React.ComponentType<IconBaseProps>;
const ScholarshipIcon = FaGraduationCap as React.ComponentType<IconBaseProps>;
const PortalIcon = FaGlobe as React.ComponentType<IconBaseProps>;
const StudentIcon = FaUsers as React.ComponentType<IconBaseProps>;
const SeminarIcon = FaChalkboardTeacher as React.ComponentType<IconBaseProps>;

/** ButtonList에서 사용할 데이터 구조 */
export interface ButtonItem {
  title: string;
  icon: React.ComponentType<IconBaseProps>;
  link: string;
  isSeminar: boolean;
}

/** 실제 렌더링할 데이터 목록 */
export const buttonItems: ButtonItem[] = [
  {
    title: '세종대학교',
    icon: UniversityIcon,
    link: '/',
    isSeminar: false,
  },
  {
    title: '장학안내',
    icon: ScholarshipIcon,
    link: '/',
    isSeminar: false,
  },
  {
    title: '포털 시스템',
    icon: PortalIcon,
    link: '/',
    isSeminar: false,
  },
  {
    title: '학생회 안내',
    icon: StudentIcon,
    link: '/',
    isSeminar: false,
  },
  {
    title: '세미나 정보',
    icon: SeminarIcon,
    link: '/',
    isSeminar: true,
  },
];
