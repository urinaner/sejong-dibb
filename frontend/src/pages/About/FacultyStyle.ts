import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  color: #333333;
  margin-bottom: 48px;
`;

export const ProfessorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ProfessorCard = styled.div`
  display: flex;
  background: white;
  border: 1px solid #eaeaea;
  border-radius: 12px;
  width: 100%;
  overflow: hidden;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ImageSection = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 240px;
  background: #f5f5f5;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    height: 250px;
  }
`;

export const ProfessorImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
`;

export const InfoSection = styled.div`
  flex: 1;
  padding: 24px;
  display: flex;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MainInfo = styled.div`
  flex: 1;
  margin-right: 24px;
  min-width: 200px;

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 24px;
  }
`;

export const ProfessorName = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 24px;
  font-weight: 500;
  color: #333333;
  margin: 0 0 8px 0;
`;

export const Position = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: #666666;
  margin: 0 0 4px 0;
`;

export const Major = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: #1a73e8;
  margin: 0 0 16px 0;
`;

export const ContactInfo = styled.div`
  flex: 2;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

export const InfoTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  margin: 0 0 12px 0;
  padding-bottom: 8px;
  border-bottom: 2px solid #eaeaea;
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 14px;
  color: #666666;
  padding: 4px 0;

  svg {
    color: #1a73e8;
    min-width: 18px;
  }
`;

export const Link = styled.a`
  color: inherit;
  text-decoration: none;
  transition: color 0.2s;
  word-break: break-all;

  &:hover {
    color: #1a73e8;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin-top: 40px;
  padding: 20px 0;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${(props) => (props.disabled ? '#EAEAEA' : '#1a73e8')};
  border-radius: 50%;
  background: ${(props) => (props.disabled ? '#F5F5F5' : 'white')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #1a73e8;

    svg {
      color: white;
    }
  }

  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => (props.disabled ? '#999999' : '#1a73e8')};
    transition: color 0.2s;
  }
`;

export const PageNumber = styled.span`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: #666666;
  min-width: 80px;
  text-align: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  color: #666666;
`;

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  color: #dc3545;
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  color: #666666;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
`;
