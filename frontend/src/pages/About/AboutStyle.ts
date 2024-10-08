// AboutStyle.ts
import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #ffffff;
`;

export const Content = styled.div`
  text-align: center;
  padding: 20px;
`;

export const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: #666;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const InfoCard = styled.div`
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fafafa;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
  max-width: 480px;
`;

export const InfoTitle = styled.h3`
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
`;

export const InfoDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
`;
