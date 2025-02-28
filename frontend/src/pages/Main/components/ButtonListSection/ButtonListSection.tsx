import React from 'react';
import {
  ButtonListContainer,
  ButtonListList,
  ButtonListItem,
} from './ButtonListSectionStyle';

// 아이콘과 링크, 텍스트 등을 실제 데이터로 교체하면 됩니다.
const buttonItems = [
  {
    title: '세종대학교',
    icon: '/icons/univ.svg', // 예: 아이콘 경로
    link: 'https://www.sejong.ac.kr/', // 예: 외부 링크
  },
  {
    title: '장학안내',
    icon: '/icons/scholarship.svg',
    link: '#',
  },
  {
    title: '포털 시스템',
    icon: '/icons/portal.svg',
    link: '#',
  },
  {
    title: '학생회 안내',
    icon: '/icons/student.svg',
    link: '#',
  },
  {
    title: '세미나 정보',
    icon: '/icons/seminar.svg',
    link: '#',
  },
];

const ButtonListSection: React.FC = () => {
  return (
    <ButtonListContainer>
      <ButtonListList>
        {buttonItems.map((item, index) => (
          <ButtonListItem key={index}>
            <a href={item.link} target="_blank" rel="noopener noreferrer">
              {/* 아이콘이 없다면 img 태그는 빼거나 아이콘 폰트 등을 사용해도 됩니다. */}
              <img src={item.icon} alt={item.title} />
              <span>{item.title}</span>
            </a>
          </ButtonListItem>
        ))}
      </ButtonListList>
    </ButtonListContainer>
  );
};

export default ButtonListSection;
