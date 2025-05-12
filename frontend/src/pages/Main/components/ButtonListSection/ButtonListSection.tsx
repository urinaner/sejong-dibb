import React from 'react';
import { Box, Grid, Card, Typography, Fade, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { keyframes } from '@mui/system';
import { buttonItems } from './data';
import { getIcon } from './icons';
import { useSeminarList } from '../../../../hooks/queries/useSeminar';

// 페이드인 애니메이션 정의
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 퍼지는 배경 애니메이션 정의
const rippleEffect = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
`;

// 스타일 컴포넌트 정의
const ButtonListContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  margin: '0 auto',
}));

const ButtonListGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'stretch',
  padding: 0,
  margin: 0,
  borderBottom: `1px solid #ddd`,
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    borderBottom: 'none',
  },
}));

interface ButtonItemProps {
  isSeminar?: boolean;
  animationIndex?: number;
}

const ButtonItem = styled(Card, {
  shouldForwardProp: (prop) =>
    prop !== 'isSeminar' && prop !== 'animationIndex',
})<ButtonItemProps>(({ theme, isSeminar, animationIndex = 0 }) => ({
  flex: isSeminar ? 1.5 : 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 0,
  borderLeft: `1px solid #ddd`,
  cursor: 'pointer',
  position: 'relative',
  backgroundColor: isSeminar ? '#a30027' : '#fafafa',
  color: isSeminar ? '#fff' : 'inherit',
  overflow: 'hidden',
  '&:first-of-type': {
    borderLeft: 'none',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    backgroundColor: isSeminar ? '#d92c4c' : '#e8f4f9',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%) scale(0)',
    opacity: 0,
    transition:
      'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.8s ease-out',
    zIndex: 0,
  },
  '&:hover': {
    '&::before': {
      transform: 'translate(-50%, -50%) scale(2.5)',
      opacity: 0.9,
    },
    '& .icon-wrapper': {
      transform: 'scale(1.1)',
      color: isSeminar ? '#ffffff' : '#a30027',
    },
    '& .button-title': {
      color: isSeminar ? '#fff' : '#a30027',
    },
  },
  animation: `${fadeInAnimation} 0.5s ease forwards`,
  animationDelay: `${animationIndex * 0.1}s`,
  opacity: 0,

  [theme.breakpoints.down('md')]: {
    flex: '0 0 calc(50% - 1px)',
    borderLeft: 'none',
    borderTop: `1px solid #ddd`,
    '&:first-of-type, &:nth-of-type(2)': {
      borderTop: 'none',
    },
    ...(isSeminar && {
      flex: '0 0 100%',
      marginTop: '1rem',
    }),
  },
}));

const ButtonContent = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    padding: '1rem 0.5rem',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  width: '6rem',
  height: '6rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '0.5rem',
  transition: 'transform 0.3s ease, color 0.3s ease',
  zIndex: 2,
  '& svg': {
    width: '6rem',
    height: '6rem',
  },
  [theme.breakpoints.down('md')]: {
    '& svg': {
      width: '3rem',
      height: '3rem',
    },
  },
}));

const ButtonTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 800,
  padding: '1rem 0',
  transition: 'color 0.3s ease',
  zIndex: 2,
}));

const SeminarInfoWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '2rem',
  height: '100%',
  position: 'relative',
  zIndex: 1,
}));

const SeminarInfoTop = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  margin: '0 0 0.5rem 0',
}));

const SeminarInfoTitle = styled(Typography)(({ theme }) => ({
  fontSize: '1.4rem',
  fontWeight: 700,
  margin: '0 0 1rem 0',
}));

const SeminarInfoSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  margin: '0.25rem 0',
  lineHeight: 1.4,
}));

const InfoIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  width: 32,
  height: 32,
  borderRadius: '50%',
  border: '2px solid #fff',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  color: '#fff',
  zIndex: 2,
}));

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

  const handleButtonClick = (link: string) => {
    window.location.href = link;
  };

  return (
    <ButtonListContainer>
      <ButtonListGrid container>
        {buttonItems.map((item, index) => {
          if (item.isSeminar) {
            return (
              <ButtonItem
                key={`button-${index}`}
                isSeminar={true}
                onClick={handleSeminarClick}
                animationIndex={index}
              >
                <SeminarInfoWrapper>
                  <SeminarInfoTop variant="subtitle1" fontWeight="medium">
                    예정된 세미나
                  </SeminarInfoTop>

                  {isSeminarLoading ? (
                    <>
                      <Skeleton variant="text" width="80%" height={40} />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="70%" />
                      <Skeleton variant="text" width="65%" />
                    </>
                  ) : seminarError ? (
                    <Typography variant="body2">
                      세미나 정보를 불러오지 못했습니다.
                    </Typography>
                  ) : seminarData?.data && seminarData.data.length > 0 ? (
                    <>
                      <SeminarInfoTitle variant="h6">
                        {seminarData.data[0].name}
                      </SeminarInfoTitle>

                      {seminarData.data[0].speaker && (
                        <SeminarInfoSubtitle variant="body2">
                          {'연사 : '}
                          {seminarData.data[0].speaker}
                        </SeminarInfoSubtitle>
                      )}

                      <SeminarInfoSubtitle variant="body2">
                        {'소속 : '}
                        {seminarData.data[0].company}
                      </SeminarInfoSubtitle>

                      <SeminarInfoSubtitle variant="body2">
                        {'일시 : '}
                        {seminarData.data[0].startTime} ~{' '}
                        {seminarData.data[0].endTime}
                      </SeminarInfoSubtitle>

                      {seminarData.data[0].place && (
                        <SeminarInfoSubtitle variant="body2">
                          {'장소 : '}
                          {seminarData.data[0].place}
                        </SeminarInfoSubtitle>
                      )}
                    </>
                  ) : (
                    <Typography variant="body2">
                      세미나 정보가 없습니다.
                    </Typography>
                  )}

                  <InfoIcon>
                    <Typography variant="body2">i</Typography>
                  </InfoIcon>
                </SeminarInfoWrapper>
              </ButtonItem>
            );
          }

          return (
            <ButtonItem
              key={`button-${index}`}
              onClick={() => handleButtonClick(item.link)}
              animationIndex={index}
            >
              <ButtonContent>
                <IconWrapper className="icon-wrapper">
                  {React.createElement(getIcon(item.icon), {
                    fontSize: 'inherit',
                    color: 'inherit',
                  })}
                </IconWrapper>
                <ButtonTitle className="button-title">{item.title}</ButtonTitle>
              </ButtonContent>
            </ButtonItem>
          );
        })}
      </ButtonListGrid>
    </ButtonListContainer>
  );
};

export default ButtonListSection;
