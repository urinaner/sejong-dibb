import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { MomentInput } from 'moment';

interface StyledButtonProps {
  isActive?: boolean;
}

interface StyledCalendarProps {
  onChange: (date: MomentInput) => void;
}

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

// 세종대학교 컬러 상수
const colors = {
  primary: '#B71C1C', // 세종대 메인 레드
  primaryDark: '#8B0000', // 더 진한 레드
  primaryLight: '#D32F2F', // 더 밝은 레드
  hover: '#F5F5F5', // 호버시 밝은 회색

  // 추가된 캘린더 전용 컬러
  calendarHeader: '#1a73e8', // 구글 캘린더 헤더 블루
  todayHighlight: '#1a73e8', // 오늘 날짜 하이라이트
  todayBorder: '#4285f4', // 오늘 날짜 테두리
  selectedDay: '#e8f0fe', // 선택된 날짜 배경색
  selectedDayText: '#1a73e8', // 선택된 날짜 텍스트
  weekendText: '#70757a', // 주말 텍스트 색상

  // 예약 목적별 컬러
  seminar: '#1a73e8', // 세미나: 파란색
  class: '#0b8043', // 수업: 초록색
  meeting: '#f6bf26', // 회의: 노란색
  other: '#616161', // 기타: 회색
};

export const Container = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  padding: 30px 20px 60px;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  background: white;
  border-radius: 8px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.12),
    0 1px 2px rgba(0, 0, 0, 0.24);

  ${media.mobile} {
    padding: 20px 10px 40px;
    width: 98%;
  }
`;

export const HeaderContainer = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const CalendarTitle = styled.h1`
  font-size: 24px;
  font-weight: 500;
  color: #202124;
  margin: 0;

  ${media.mobile} {
    font-size: 20px;
  }
`;

export const NavButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const NavButton = styled.button<StyledButtonProps>`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  background: ${(props) =>
    props.isActive ? colors.calendarHeader : 'transparent'};
  color: ${(props) => (props.isActive ? 'white' : '#5f6368')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? colors.calendarHeader : 'rgba(66, 133, 244, 0.04)'};
    color: ${(props) => (props.isActive ? 'white' : colors.calendarHeader)};
  }

  ${media.mobile} {
    padding: 6px 12px;
    font-size: 13px;
  }
`;

export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 24px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;

  ${media.mobile} {
    padding: 16px;
  }
`;

export const RoomInfo = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const RoomImageContainer = styled.div`
  flex-shrink: 0;
`;

export const RoomDetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const RoomName = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #202124;
  margin: 0 0 8px 0;

  ${media.mobile} {
    font-size: 18px;
  }
`;

export const RoomImg = styled.img`
  width: 240px;
  height: 160px;
  border-radius: 8px;
  object-fit: cover;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

  ${media.mobile} {
    width: 100%;
    height: auto;
    max-height: 200px;
  }
`;

export const RoomDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5f6368;
  font-size: 14px;
`;

export const RoomDetailLabel = styled.span`
  font-weight: 500;
  color: ${colors.primary};
  min-width: 80px;
`;

export const ReservationBtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
`;

export const ReservationBtn = styled.button`
  padding: 10px 20px;
  background-color: ${colors.calendarHeader};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #1765cc;
  }

  &:active {
    background-color: #185abc;
  }

  ${media.mobile} {
    padding: 8px 16px;
    font-size: 13px;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
  padding: 12px 16px;
  background: #f9f9f9;
  border-radius: 4px;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #5f6368;
`;

export const LegendColor = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background-color: ${(props) => props.color};
`;

// 캘린더 스타일 개선
export const StyledCalendar = styled(Calendar)<StyledCalendarProps>`
  width: 100%;
  border: none;
  background-color: white;
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  margin-top: 8px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    0 1px 2px rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);

  .react-calendar__navigation {
    height: 60px;
    margin: 0;
    background-color: ${colors.calendarHeader};
    display: flex;
    align-items: center;
    padding: 0 16px;

    ${media.mobile} {
      height: 50px;
      padding: 0 8px;
    }
  }

  .react-calendar__navigation button {
    min-width: 40px;
    height: 40px;
    background-color: transparent;
    color: white;
    font-size: 16px;
    border-radius: 50%;
    margin: 0 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }

    &:disabled {
      opacity: 0.5;
      background-color: transparent;
    }

    ${media.mobile} {
      min-width: 32px;
      height: 32px;
      font-size: 14px;
    }
  }

  .react-calendar__navigation__label {
    font-weight: 500;
    color: white;
    flex-grow: 1;
    max-width: none;
    pointer-events: none;
  }

  // 월 표시 영역
  .react-calendar__viewContainer {
    padding: 8px;
  }

  // 요일 헤더
  .react-calendar__month-view__weekdays {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 12px;
    padding: 12px 0 8px;
    color: #70757a;
    text-align: center;

    abbr {
      text-decoration: none;
      cursor: default;
    }
  }

  // 날짜 타일
  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #e8eaed;
    border-radius: 0;
    padding: 8px 4px 4px;
    height: 110px;
    aspect-ratio: auto;
    font-size: 14px;
    position: relative;
    transition: background-color 0.1s;
    color: #202124;

    &:not(.react-calendar__month-view__days__day--neighboringMonth):hover {
      background-color: #f8f9fa;
    }

    ${media.mobile} {
      height: 80px;
      padding: 6px 2px 2px;
      font-size: 12px;
    }

    // 날짜 표시를 왼쪽 상단에 배치
    &::before {
      content: attr(aria-label);
      position: absolute;
      top: 8px;
      left: 8px;
      font-size: 14px;
      font-weight: 400;
      color: inherit;

      ${media.mobile} {
        font-size: 12px;
        top: 4px;
        left: 6px;
      }
    }
  }

  // 활성화된 날짜(선택된 날짜)
  .react-calendar__tile--active {
    background-color: ${colors.selectedDay} !important;
    color: ${colors.selectedDayText} !important;
    font-weight: 500;

    &::before {
      font-weight: 500;
    }
  }

  // 오늘 날짜
  .react-calendar__tile--now {
    background-color: white;
    position: relative;

    &::before {
      color: ${colors.todayHighlight};
      font-weight: 600;
    }

    &::after {
      content: '';
      position: absolute;
      top: 8px;
      left: 8px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid ${colors.todayBorder};
      z-index: 1;

      ${media.mobile} {
        width: 20px;
        height: 20px;
        top: 4px;
        left: 4px;
      }
    }
  }

  // 오늘이면서 활성화된 날짜
  .react-calendar__tile--now.react-calendar__tile--active {
    background-color: ${colors.selectedDay} !important;

    &::before {
      color: ${colors.selectedDayText};
    }
  }

  // 주말
  .react-calendar__month-view__days__day--weekend {
    color: ${colors.weekendText};
  }

  // 다른 달 날짜
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #dadce0;
  }

  // 예약 정보 컨테이너 스타일링
  .reservation-container {
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 100%;
    padding-top: 28px;
    overflow: hidden;

    ${media.mobile} {
      padding-top: 22px;
    }
  }
`;

// 타일 내 예약 항목 스타일
export const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 28px;
  width: 100%;
  overflow: hidden;

  ${media.mobile} {
    margin-top: 22px;
    gap: 2px;
  }
`;

export const ReservationTile = styled.div`
  padding: 2px 4px;
  margin: 0;
  border-radius: 4px;
  color: white;
  font-size: 11px;
  width: calc(100% - 8px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 500;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);

  ${media.mobile} {
    font-size: 9px;
    padding: 1px 2px;
  }
`;

export const MoreCount = styled.div`
  width: calc(100% - 8px);
  font-size: 11px;
  color: #5f6368;
  text-align: center;
  background-color: #f1f3f4;
  border-radius: 4px;
  padding: 2px 0;
  margin-top: 2px;
  cursor: pointer;

  &:hover {
    background-color: #e8eaed;
  }

  ${media.mobile} {
    font-size: 9px;
  }
`;

// 예약 모달 스타일
export const ModalHeader = styled.div`
  font-size: 18px;
  font-weight: 500;
  padding: 16px 24px;
  color: #202124;
  border-bottom: 1px solid #e8eaed;
`;

export const ModalContent = styled.div`
  padding: 16px 24px;
  max-height: 70vh;
  overflow-y: auto;
`;

export const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ReservationItem = styled.div`
  padding: 12px;
  border-radius: 8px;
  color: white;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .time {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 6px;
  }

  .purpose {
    font-size: 14px;
    margin-bottom: 4px;
  }

  .etc {
    font-size: 12px;
    opacity: 0.9;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #70757a;
  padding: 32px 0;
  font-size: 14px;
`;

// 예약 폼 스타일
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 500;
    color: #5f6368;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  color: #202124;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.calendarHeader};
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
  }

  &:disabled {
    background-color: #f1f3f4;
    cursor: not-allowed;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  color: #202124;
  background-color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.calendarHeader};
    box-shadow: 0 0 0 2px rgba(26, 115, 232, 0.1);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;

export const SubmitButton = styled.button`
  padding: 10px 24px;
  background-color: ${colors.calendarHeader};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1765cc;
  }

  &:disabled {
    background-color: #a8c7fa;
    cursor: not-allowed;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 24px;
  background-color: transparent;
  color: #5f6368;
  border: 1px solid #dadce0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f1f3f4;
  }
`;

// 색상 내보내기
export const calendarColors = colors;
