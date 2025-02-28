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

import { buttonItems } from './data'; 

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
              <a href={item.link} rel="noopener noreferrer">
                {React.createElement(item.icon, {
                  size: 0,
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
