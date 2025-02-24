import styled from 'styled-components';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const ErrorTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #dc2626;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.pre`
  font-size: 0.875rem;
  background-color: #f3f4f6;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const RefreshButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563eb;
  }
`;

function ErrorFallback({ error }: { error: Error }) {
  return (
    <ErrorContainer>
      <ErrorTitle>오류가 발생했습니다</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <RefreshButton onClick={() => window.location.reload()}>
        새로고침
      </RefreshButton>
    </ErrorContainer>
  );
}

export default ErrorFallback;
