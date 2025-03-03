import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 0.6;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const CardButton = styled.a`
  display: flex;
  align-items: center;
  background-color: #e9dfda;
  border-radius: 8px;
  padding: 1.5rem;
  height: 140px;
  text-decoration: none;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #d8cdc6;
  }

  @media (max-width: 768px) {
    height: 80px;
  }
`;

export const IconWrapper = styled.div`
  margin-right: 1rem;
  font-size: 3rem;
  color: #a30027;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const TextWrapper = styled.div`
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0;
  font-weight: bold;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

export const SubText = styled.p`
  margin: 0.25rem 0 0;
  font-size: 0.95rem;
  color: #555;

  @media (max-width: 768px) {
    /* font-size: 0.85rem; */
    display: none;
  }
`;

export const ArrowWrapper = styled.div`
  margin-left: auto;
  font-size: 1.5rem;
  color: #a30027;

  @media (max-width: 768px) {
    /* font-size: 1.2rem; */
    display: none;
  }
`;
