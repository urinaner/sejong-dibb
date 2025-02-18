import styled from 'styled-components';

// ReservationFormStyle.ts
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-weight: 500;
    color: #374151;
  }
`;

export const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.1);
  }
`;

export const SubmitButton = styled.button`
  padding: 10px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }
`;

// CalendarViewStyle.ts
export const TileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 2px;
  font-size: 8px;
`;

export const ReservationTile = styled.div`
  padding: 1px;
  margin: 1px;
  border-radius: 2px;
  color: white;
  font-size: 8px;
`;

// DailyReservationModalStyle.ts
export const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
`;

export const ReservationItem = styled.div`
  padding: 12px;
  border-radius: 6px;
  color: white;

  .time {
    font-weight: 500;
    margin-bottom: 4px;
  }

  .purpose {
    font-size: 14px;
  }

  .etc {
    font-size: 12px;
    opacity: 0.9;
    margin-top: 4px;
  }
`;
