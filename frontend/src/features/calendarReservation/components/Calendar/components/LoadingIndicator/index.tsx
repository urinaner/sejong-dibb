// src/features/calendarReservation/components/Calendar/components/LoadingIndicator.tsx
import React from 'react';
import { LoadingOverlay, Spinner } from '../styles';

interface LoadingIndicatorProps {
  isLoading: boolean;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <LoadingOverlay>
      <Spinner />
    </LoadingOverlay>
  );
};

export default LoadingIndicator;
