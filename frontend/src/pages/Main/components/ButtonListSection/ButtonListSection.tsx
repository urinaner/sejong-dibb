import React from 'react';
import {
  ButtonListContainer,
  ButtonListList,
  ButtonListItem,
  SeminarInfoWrapper,
  SeminarInfoTitle,
  SeminarInfoSubtitle,
  InfoIconWrapper,
} from './ButtonListSectionStyle';

// react-icons에서 사용할 아이콘 불러오기
import {
  FaUniversity,
  FaGraduationCap,
  FaGlobe,
  FaUsers,
  FaChalkboardTeacher,
} from 'react-icons/fa';
import { IconBaseProps } from 'react-icons';

const buttonItems: {
  title: string;
  icon: React.ComponentType<IconBaseProps>; // 아이콘 타입
  link: string;
  isSeminar: boolean;
}[] = [
  {
    title: '세종대학교',
    icon: FaUniversity as React.ComponentType<IconBaseProps>,
    link: '/',
    isSeminar: false,
  },
  {
    title: '장학안내',
    icon: FaGraduationCap as React.ComponentType<IconBaseProps>,
    link: '/',
    isSeminar: false,
  },
  {
    title: '포털 시스템',
    icon: FaGlobe as React.ComponentType<IconBaseProps>,
    link: '/',
    isSeminar: false,
  },
  {
    title: '학생회 안내',
    icon: FaUsers as React.ComponentType<IconBaseProps>,
    link: '/',
    isSeminar: false,
  },
  {
    title: '세미나 정보',
    icon: FaChalkboardTeacher as React.ComponentType<IconBaseProps>,
    link: '/',
    isSeminar: true,
  },
];

const ButtonListSection: React.FC = () => {
  return (
    <ButtonListContainer>
      <ButtonListList>
        {buttonItems.map((item, index) => {
          if (item.isSeminar) {
            // 마지막 '세미나 정보' 아이템
            return (
              <ButtonListItem key={index} isSeminar>
                <SeminarInfoWrapper>
                  <SeminarInfoTitle>세미나</SeminarInfoTitle>
                  <SeminarInfoSubtitle>최신 세미나 제목</SeminarInfoSubtitle>
                  <SeminarInfoSubtitle>최신 세미나 일정</SeminarInfoSubtitle>
                  <SeminarInfoSubtitle>최신 세미나 담당자</SeminarInfoSubtitle>
                  <SeminarInfoSubtitle>
                    최신 세미나 진행 장소
                  </SeminarInfoSubtitle>
                  <InfoIconWrapper>
                    <span>i</span>
                  </InfoIconWrapper>
                </SeminarInfoWrapper>
              </ButtonListItem>
            );
          }

          // 일반 버튼 아이템
          return (
            <ButtonListItem key={index} isSeminar={item.isSeminar}>
              <a href={item.link} target="_blank" rel="noopener noreferrer">
                {React.createElement(item.icon, {
                  size: 0 /* 무시하거나 기본값 */,
                })}
                <span>{item.title}</span>
              </a>
            </ButtonListItem>
          );
        })}
      </ButtonListList>
    </ButtonListContainer>
  );
};

export default ButtonListSection;
