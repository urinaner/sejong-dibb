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

  const handleSeminarClick = () => {
    if (seminarData && seminarData.data && seminarData.data.length > 0) {
      window.location.href = `/news/seminar/${seminarData.data[0].id}`;
    }
  };

  return (
    <ButtonListContainer>
      <ButtonListList>
        {buttonItems.map((item, index) => {
          if (item.isSeminar) {
            return (
              <ButtonListItem
                key={index}
                isSeminar
                onClick={handleSeminarClick}
                style={{ cursor: 'pointer' }}
              >
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
                      {seminarData.data[0].speaker && (
                        <SeminarInfoSubtitle>
                          {'연사 : '}
                          {seminarData.data[0].speaker}
                        </SeminarInfoSubtitle>
                      )}
                      <SeminarInfoSubtitle>
                        {'소속 : '}
                        {seminarData.data[0].company}
                      </SeminarInfoSubtitle>
                      <SeminarInfoSubtitle>
                        {'일시 : '}
                        {seminarData.data[0].startTime} ~{' '}
                        {seminarData.data[0].endTime}
                      </SeminarInfoSubtitle>
                      {seminarData.data[0].place && (
                        <SeminarInfoSubtitle>
                          {'장소 : '}
                          {seminarData.data[0].place}
                        </SeminarInfoSubtitle>
                      )}
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

          return (
            <ButtonListItem key={index} isSeminar={item.isSeminar}>
              <a href={item.link} rel="noopener noreferrer">
                {React.createElement(item.icon, { size: 0 })}
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
