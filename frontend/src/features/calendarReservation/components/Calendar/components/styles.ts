// src/features/calendarReservation/components/Calendar/styles.ts
import styled from 'styled-components';

export const CalendarToolbar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 16px;
  }
`;

export const NavigationButtons = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-self: start;

  @media (max-width: 768px) {
    justify-self: center;
    width: 100%;
    justify-content: center;
  }
`;

export const TodayButton = styled.button`
  background-color: #b71c1c;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);

  &:hover {
    background-color: #8b0000;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }
`;

export const ArrowButton = styled.button`
  background-color: white;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f5f5f5;
    color: #b71c1c;
    border-color: #b71c1c;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const CurrentDate = styled.h2`
  font-size: 20px;
  font-weight: 500;
  margin: 0;
  padding: 0;
  text-align: center;
  justify-self: center;
  color: #333;

  @media (max-width: 768px) {
    font-size: 18px;
    order: -1; /* 모바일에서 맨 위로 배치 */
  }
`;

export const ViewButtons = styled.div`
  display: flex;
  border: 1px solid #ddd;
  border-radius: 20px;
  overflow: hidden;
  justify-self: end;

  @media (max-width: 768px) {
    justify-self: center;
    width: 100%;
    max-width: 280px;
  }
`;

export const ViewButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) => (props.active ? '#B71C1C' : 'white')};
  color: ${(props) => (props.active ? 'white' : '#555')};
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.active ? '#8B0000' : '#f5f5f5')};
  }

  @media (max-width: 768px) {
    flex: 1;
    padding: 8px 12px;
    font-size: 13px;
  }
`;

export const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #b71c1c;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const CalendarContainer = styled.div`
  position: relative;
  width: 100%;
`;
