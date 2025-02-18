import styled from 'styled-components';

export const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 2px;
  width: 100%;
  height: 100%;
`;

export const ReservationTile = styled.div`
  padding: 2px 4px;
  border-radius: 4px;
  color: white;
  font-size: 10px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  opacity: 0.9;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

export const MoreCount = styled.div`
  margin-top: 2px;
  font-size: 10px;
  color: #555;
  text-align: center;
  cursor: pointer;
  padding: 2px;
  background-color: #f3f4f6;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #e5e7eb;
  }
`;

export const TileWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &.has-reservation {
    background-color: #f8fafc;
  }

  &.today {
    background-color: #eff6ff;
  }
`;

export const DateNumber = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  font-size: 12px;
  color: #374151;
`;

export const ReservationList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const WeekdayHeader = styled.div`
  padding: 8px;
  text-align: center;
  font-weight: 500;
  color: #4b5563;
  border-bottom: 1px solid #e5e7eb;

  &.weekend {
    color: #ef4444;
  }
`;

export const NavigationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }

  &:active {
    background-color: #f3f4f6;
  }

  &.today-btn {
    color: #2563eb;
    border-color: #2563eb;

    &:hover {
      background-color: #eff6ff;
    }
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
`;

export const MonthTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
`;

export const DayCell = styled.div<{
  isToday?: boolean;
  hasReservations?: boolean;
}>`
  aspect-ratio: 1;
  padding: 8px;
  border: 1px solid #e5e7eb;
  background-color: ${(props) =>
    props.isToday ? '#eff6ff' : props.hasReservations ? '#f8fafc' : 'white'};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => (props.isToday ? '#dbeafe' : '#f9fafb')};
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

export const SpinnerWrapper = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;
