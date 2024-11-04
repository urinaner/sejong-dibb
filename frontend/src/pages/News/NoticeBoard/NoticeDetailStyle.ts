import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
`;

export const Header = styled.div`
  margin-bottom: 30px;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 16px;
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 14px;
  color: #4a5568;
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  font-weight: 600;
`;

export const Content = styled.div`
  min-height: 300px;
  line-height: 1.8;
  color: #2d3748;
  white-space: pre-wrap;
  margin: 30px 0;
`;

export const FileSection = styled.div`
  margin: 30px 0;
  padding: 15px;
  background-color: #f7fafc;
  border-radius: 8px;
`;

export const FileLink = styled.a`
  color: #3182ce;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 40px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #4a5568;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2d3748;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #4a5568;
`;

export const Error = styled.div`
  text-align: center;
  padding: 40px;
  color: #e53e3e;
  font-size: 16px;
`;
