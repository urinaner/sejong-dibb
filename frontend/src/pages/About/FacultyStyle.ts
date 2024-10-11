import styled from 'styled-components';

export const ProfessorCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 20px;
  width: fit-content;
  margin: 20px auto;
`;

export const ProfessorImage = styled.img`
  width: 200px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 40px;
`;

export const ProfessorInfo = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: flex-start;
  flex: 1;
`;

export const ProfessorName = styled.h2`
  font-size: 24px;
  margin: 0;
  font-weight: 600;
`;

export const ProfessorTitle = styled.p`
  font-size: 16px;
  margin: 4px 0;
  color: #666;
`;

export const HorizontalBar = styled.svg`
  width: 100%;
  height: 2px;
  margin: 10px 0;
  background: #d8d8d8;
`;

export const InfoGroup = styled.div`
  margin-top: 20px;
`;

export const InfoItem = styled.p`
  margin-bottom: -8px;
  font-size: 16px;
`;

export const Highlight = styled.p`
  margin: 0 0 -4px 0;
  font-weight: 600;
`;
