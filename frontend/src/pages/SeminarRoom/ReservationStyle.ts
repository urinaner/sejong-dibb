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

export const RoomContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: ${colors.hover};
  border-radius: 8px;
  margin-bottom: 20px;

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
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;

  ${media.mobile} {
    font-size: 1.2rem;
  }
`;

export const RoomImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ${media.mobile} {
    width: 100%;
    height: auto;
  }
`;

export const Capacity = styled.span`
  font-weight: 600;
  color: ${colors.primaryLight};
  margin-right: 10px;
  display: inline-block;
  margin-bottom: 10px;
`;

export const Location = styled.span`
  font-weight: 600;
  color: ${colors.primaryLight};
  margin-right: 10px;
  display: inline-block;
`;

export const ReservationBtn = styled.button`
  padding: 12px 24px;
  background-color: ${colors.primary};
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${colors.primaryDark};
  }

  ${media.mobile} {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

export const StyledCalendar = styled(Calendar)<StyledCalendarProps>`
  width: 100%;
  margin: 12px auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Noto Sans KR';

  .react-calendar__navigation {
    height: 60px;
    margin: 0;
    background-color: ${colors.primary};
    border-radius: 8px 8px 0 0;

    ${media.mobile} {
      height: 44px;
    }
  }

  .react-calendar__navigation button {
    min-width: 44px;
    color: white;
    font-size: 16px;
    font-weight: 600;

    &:disabled {
      background: ${colors.primaryDark};
    }

    &:enabled:hover,
    &:enabled:focus {
      background: ${colors.primaryDark};
    }
  }
  .react-calendar__tile {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    border: 1px solid #e6e6e6;
    padding: 10px;
    height: auto;
    aspect-ratio: 1 / 0.8;
    font-size: 16px;
    position: relative;

    &:enabled:hover {
      background-color: ${colors.hover};
    }

    div {
      width: 100%;
      font-size: 10px;
    }

    div:first-child {
      margin-top: 8px;
      width: 100%;
    }

    ${media.mobile} {
      padding: 5px;
      aspect-ratio: 1 / 0.6;
      font-size: 14px;
    }
  }

  .react-calendar__tile--now {
    background-color: #e8f0fe;
    color: ${colors.primary};
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background-color: #d9e7fd;
  }

  .react-calendar__tile--active {
    background-color: ${colors.primary} !important;
    color: white !important;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: ${colors.primaryDark} !important;
  }

  .react-calendar__month-view__weekdays {
    text-align: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 0.9rem;
    padding: 10px 8px;
    background-color: ${colors.hover};
    border-bottom: 1px solid #e6e6e6;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 0.5rem;
    abbr {
      text-decoration: none;
      cursor: default;
    }
  }

  .react-calendar__month-view__days__day--weekend {
    color: ${colors.primary};
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    color: #999999;
  }

  .has-reservation {
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background-color: ${colors.primary};
    }
  }
`;

// Modal 관련 스타일 추가
export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-weight: 500;
  color: #333;
`;

export const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }

  &:disabled {
    background-color: ${colors.hover};
  }
`;

export const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: ${colors.primary};
  }
`;

export const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  ${media.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const ErrorMessage = styled.p`
  color: ${colors.primary};
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;
