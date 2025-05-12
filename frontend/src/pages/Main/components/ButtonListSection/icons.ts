import React from 'react';
import { SvgIconProps } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LanguageIcon from '@mui/icons-material/Language';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';

// 아이콘 타입 정의
export type IconType =
  | 'university'
  | 'scholarship'
  | 'portal'
  | 'student'
  | 'seminar';

// 아이콘 매핑
const iconMap: Record<IconType, React.ComponentType<SvgIconProps>> = {
  university: SchoolIcon, // 대학교 아이콘
  scholarship: EmojiEventsIcon, // 장학금 아이콘
  portal: LanguageIcon, // 포털 아이콘
  student: PeopleIcon, // 학생회 아이콘
  seminar: EventNoteIcon, // 세미나 아이콘
};

/**
 * 아이콘 이름으로부터 실제 아이콘 컴포넌트를 반환하는 함수
 * @param iconName 아이콘 이름
 * @returns 해당하는 아이콘 컴포넌트
 */
export const getIcon = (
  iconName: IconType,
): React.ComponentType<SvgIconProps> => {
  return iconMap[iconName] || SchoolIcon; // 기본값은 SchoolIcon
};

export default iconMap;
