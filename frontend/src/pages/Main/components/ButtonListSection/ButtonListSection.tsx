// ButtonListSection.tsx
import React from 'react';
import {
  ButtonListContainer,
  ButtonListList,
  ButtonListItem,
  SeminarInfoWrapper,
  SeminarInfoTitle,
  SeminarInfoSubtitle,
  InfoIconWrapper,
  SeminarInfoTop,
} from './ButtonListSectionStyle';
import { buttonItems } from './data';
import { useSeminarList } from '../../../../hooks/queries/useSeminar';

const ButtonListSection: React.FC = () => {
  const {
    data: seminarData,
    isLoading: isSeminarLoading,
    error: seminarError,
  } = useSeminarList({
    page: 0,
    size: 1,
    sortDirection: 'DESC',
  });

  return (
    <ButtonListContainer>
      <ButtonListList>
        {buttonItems.map((item, index) => {
          if (item.isSeminar) {
            return (
              <ButtonListItem key={index} isSeminar>
                <SeminarInfoWrapper>
                  <SeminarInfoTop>{'예정된 세미나'}</SeminarInfoTop>
                  {isSeminarLoading ? (
                    <div>세미나 로딩중...</div>
                  ) : seminarError ? (
                    <div>세미나 정보를 불러오지 못했습니다.</div>
                  ) : seminarData &&
                    seminarData.data &&
                    seminarData.data.length > 0 ? (
                    <>
                      <SeminarInfoTitle>
                        {seminarData.data[0].name}
                      </SeminarInfoTitle>
                      <SeminarInfoSubtitle>
                        {'시간 : '}
                        {seminarData.data[0].startTime}
                        {' ~ '}
                        {seminarData.data[0].endTime}
                      </SeminarInfoSubtitle>
                      {seminarData.data[0].writer && (
                        <SeminarInfoSubtitle>
                          {'예약자 : '}
                          {seminarData.data[0].writer}
                        </SeminarInfoSubtitle>
                      )}
                      {seminarData.data[0].place && (
                        <SeminarInfoSubtitle>
                          {'장소 : '}
                          {seminarData.data[0].place}
                        </SeminarInfoSubtitle>
                      )}
                      <SeminarInfoSubtitle>
                        {'부서 : '}
                        {seminarData.data[0].company}
                      </SeminarInfoSubtitle>
                    </>
                  ) : (
                    <div>세미나 정보가 없습니다.</div>
                  )}
                  <InfoIconWrapper>
                    <span>i</span>
                  </InfoIconWrapper>
                </SeminarInfoWrapper>
              </ButtonListItem>
            );
          }

          // 일반 버튼 아이템인 경우
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
