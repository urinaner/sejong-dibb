import styled from 'styled-components';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    padding: 20px 16px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a202c;
  margin: 0;

  ${media.mobile} {
    font-size: 1.5rem;
    width: 100%;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;

  ${media.mobile} {
    width: 100%;

    button {
      width: 100%;
    }
  }
`;

export const ProfessorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
`;

export const ProfessorCardWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;

export const ImageSection = styled.div`
  flex-shrink: 0;
  width: 200px;
  height: 240px;
  background: #f5f5f5;
  position: relative;

  ${media.mobile} {
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

  ${media.mobile} {
    flex-direction: column;
  }
`;

export const MainInfo = styled.div`
  flex: 1;
  margin-right: 24px;
  min-width: 200px;

  ${media.mobile} {
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

  ${media.mobile} {
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

export const EditButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

  ${ProfessorCardWrapper}:hover & {
    opacity: 1;
  }

  ${media.mobile} {
    opacity: 1;
    position: relative;
    top: auto;
    right: auto;
    margin-top: 0.5rem;
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem 1rem;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2.5rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid ${(props) => (props.disabled ? '#e2e8f0' : '#1a73e8')};
  border-radius: 50%;
  background: white;
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
    color: ${(props) => (props.disabled ? '#a0aec0' : '#1a73e8')};
    transition: color 0.2s;
  }

  ${media.mobile} {
    width: 32px;
    height: 32px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const PageNumber = styled.span`
  font-size: 1rem;
  color: #4a5568;
  min-width: 80px;
  text-align: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #4a5568;
  font-size: 1.1rem;

  ${media.mobile} {
    min-height: 200px;
    font-size: 1rem;
  }
`;

export const ErrorContainer = styled.div`
  margin: 2rem 0;
  padding: 1rem;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 8px;
  text-align: center;
  font-size: 1.1rem;
  border: 1px solid #feb2b2;

  ${media.mobile} {
    margin: 1.5rem 0;
    font-size: 1rem;
  }
`;

export const EmptyStateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: #f8f9fa;
  color: #4a5568;
  border-radius: 8px;
  font-size: 1.1rem;
  border: 1px dashed #cbd5e0;
  margin: 2rem 0;

  ${media.mobile} {
    min-height: 150px;
    font-size: 1rem;
    margin: 1.5rem 0;
  }
`;

export const ProfessorCard = styled.div`
  display: flex;
  background: white;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;

  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px #1a73e8;
  }

  ${media.mobile} {
    flex-direction: column;
  }
`;
