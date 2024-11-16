import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment, { Moment, MomentInput } from 'moment';

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
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;
  font-family: 'Noto Sans KR';

  ${media.mobile} {
    padding: 20px 10px;
  }
`;

export const HeaderContainer = styled.div`
  margin-bottom: 30px;
`;

export const Navigation = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid ${colors.primary};
`;

export const NavButtonGroup = styled.div`
  display: flex;
`;

export const NavButton = styled.button<StyledButtonProps>`
  padding: 12px 32px;
  font-size: 1.1rem;
  border: none;
  background: ${(props) => (props.isActive ? colors.primary : 'transparent')};
  color: ${(props) => (props.isActive ? 'white' : '#333')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;

  &:hover {
    background-color: ${(props) =>
      props.isActive ? colors.primaryDark : colors.hover};
    color: ${(props) => (props.isActive ? 'white' : colors.primary)};
  }

  ${(props) =>
    props.isActive &&
    `
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${colors.primary};
    }
  `}

  ${media.mobile} {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

// export const RoomContainer = styled.div``;
// export const RoomInfo = styled.div``;
// export const RoomName = styled.div``;
// export const RoomImg = styled.img``;
// export const Capacity = styled.span``;
// export const Location = styled.span``;

export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${colors.hover};
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;

  ${media.mobile} {
    padding: 15px;
  }
`;

export const RoomInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const RoomName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black; /* 검은색으로 변경 */
  margin-bottom: 10px;

  ${media.mobile} {
    font-size: 1.2rem;
  }
`;

export const RoomImg = styled.img`
  width: 200px;
  height: auto;
  border-radius: 8px;
`;

export const Capacity = styled.span`
  font-weight: 600;
  color: ${colors.primaryLight};
  margin-right: 20px;
`;

export const Location = styled.span`
  font-weight: 600;
  color: ${colors.primaryLight};
  margin-right: 50px;
`;

export const ReservationBtn = styled.button`
  padding: 12px 20px;
  margin-top: 40px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 14px;
  cursor: pointer;

  ${media.mobile} {
    padding: 8px 16px;
  }
`;

// 캘린더 스타일 추가
export const StyledCalendar = styled(Calendar)<StyledCalendarProps>`
  width: 100%; /* Container 크기와 동일하게 설정 */
  margin: 12px auto;
  background-color: white;
  font-family: 'Noto Sans KR';

  .react-calendar__navigation {
    height: 52px;

    ${media.mobile} {
      height: 44px;
    }
  }

  .react-calendar__navigation button {
    min-width: 44px;
    background-color: #324d60;
    color: white;
    font-size: 16px;
    font-weight: 600;
  }

  .react-calendar__navigation button:disabled {
    background: #324d60;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background: #324d60;
  }

  .react-calendar__tile {
    padding: 10px;
    height: 100px;

    ${media.mobile} {
      padding: 0;
      height: 50px;
    }
  }

  .react-calendar__tile--active {
    background-color: #8ca2b1;
    color: white;
  }

  // 오늘
  .react-calendar__tile--now {
    background: none;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #e6e6e6;
  }

  .react-calendar__tile--active {
    background: #8ca2b1;
    color: white !important;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #8ca2b1;
  }

  // 요일
  .react-calendar__month-view__weekdays {
    font-size: 16px;
    font-size: 1rem;
  }

  // 주말
  .react-calendar__month-view__days__day--weekend {
    color: inherit;
  }

  .react-calendar__month-view__weekdays__weekday abbr {
    text-decoration: none;
  }

  // 저번달, 다음달 날짜
  .react-calendar__month-view__days__day--neighboringMonth {
    /* color: lightgray; */
    color: #999999;
  }
`;

// export const RoomContainer = styled.div``;
