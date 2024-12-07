import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  color: #4a5568;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1557b0;
  }
`;
