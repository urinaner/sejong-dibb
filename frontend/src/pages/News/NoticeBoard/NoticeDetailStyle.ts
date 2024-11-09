import styled from 'styled-components';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.div`
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 8px 8px 0 0;
  background-color: #f8fafc;
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 16px;
  font-weight: 600;

  ${media.mobile} {
    font-size: 1.25rem;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  color: #4a5568;
  font-size: 0.95rem;

  ${media.mobile} {
    gap: 16px;
    font-size: 0.9rem;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

export const Content = styled.div`
  padding: 32px 24px;
  min-height: 300px;
  line-height: 1.8;
  color: #2d3748;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  white-space: pre-wrap;
  word-break: break-word;

  ${media.mobile} {
    padding: 24px 16px;
    font-size: 0.95rem;
  }
`;

export const FileSection = styled.div`
  padding: 16px 24px;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-top: none;

  ${media.mobile} {
    padding: 12px 16px;
  }
`;

export const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #3182ce;
  font-size: 0.95rem;
  text-decoration: none;
  padding: 8px 16px;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #ebf8ff;
    border-color: #3182ce;
  }

  ${media.mobile} {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 32px;
  padding: 0 24px;

  ${media.mobile} {
    padding: 0 16px;
  }
`;

export const Button = styled.button`
  padding: 12px 24px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #2c5282;
  }

  ${media.mobile} {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
`;

export const Error = styled.div`
  color: #ff4444;
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #ffeeee;
  border-radius: 4px;
`;
