import styled from 'styled-components';

export const ReservationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

export const ReservationItem = styled.div`
  padding: 16px;
  border-radius: 8px;
  color: white;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(4px);
  }

  .time {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
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
  color: #6b7280;
  padding: 24px;
  font-size: 14px;
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
`;

export const ModalHeader = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 16px 24px;
  border-bottom: 1px solid #e5e7eb;
  color: #1f2937;
`;

export const ModalContent = styled.div`
  padding: 16px 24px;
  max-height: 70vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 24px;
  border-top: 1px solid #e5e7eb;
  gap: 8px;
`;
