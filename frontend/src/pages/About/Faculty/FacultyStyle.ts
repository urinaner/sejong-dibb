import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
  desktop: '@media(min-width: 1025px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 80vw;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: ${(props) => props.theme.colors.grey[50]};

  ${media.mobile} {
    width: 100%;
    padding: 20px 16px;
  }

  ${media.tablet} {
    width: 90%;
    padding: 30px 20px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid ${SEJONG_COLORS.CRIMSON_RED};

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 2rem;
  font-weight: bold;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;

  ${media.mobile} {
    font-size: 1.6rem;
    width: 100%;
  }
`;

export const ProfessorCard = styled.div`
  position: relative;
  display: flex;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 4px 12px rgba(163, 20, 50, 0.1);
    transform: translateY(-2px);
  }

  ${media.mobile} {
    flex-direction: column;
    border-radius: 8px;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  padding: 28px;
  display: flex;
  background: white;

  ${media.mobile} {
    flex-direction: column;
    padding: 20px;
    gap: 20px;
  }
`;

export const MainInfo = styled.div`
  flex: 1;
  margin-right: 32px;
  min-width: 220px;

  ${media.mobile} {
    margin-right: 0;
    margin-bottom: 20px;
    min-width: auto;
  }
`;

export const ProfessorName = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 26px;
  font-weight: 600;
  color: ${(props) => props.theme.colors.grey[500]};
  margin: 0 0 12px 0;

  ${media.mobile} {
    font-size: 22px;
    margin-bottom: 8px;
  }
`;

export const Position = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 6px 0;
  font-weight: 500;

  ${media.mobile} {
    font-size: 15px;
  }
`;

export const Major = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: ${(props) => props.theme.colors.grey[400]};
  margin: 0 0 20px 0;

  ${media.mobile} {
    font-size: 14px;
    margin-bottom: 16px;
  }
`;

export const ContactInfo = styled.div`
  flex: 2;
  min-width: 320px;
  background: ${(props) => props.theme.colors.grey[50]};
  padding: 20px;
  border-radius: 8px;

  ${media.mobile} {
    min-width: auto;
    padding: 16px;
  }
`;

export const InfoTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0 0 16px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};

  ${media.mobile} {
    font-size: 16px;
    margin-bottom: 12px;
    padding-bottom: 8px;
  }
`;

export const InfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  ${media.mobile} {
    gap: 10px;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 15px;
  color: ${(props) => props.theme.colors.grey[500]};
  padding: 4px 0;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    min-width: 20px;
  }

  ${media.mobile} {
    font-size: 14px;
    gap: 8px;
  }
`;

export const Link = styled.a`
  color: ${SEJONG_COLORS.CRIMSON_RED};
  text-decoration: none;
  transition: color 0.2s;
  font-weight: 500;

  &:hover {
    color: ${(props) => props.theme.colors.primary.crimsonDark};
    text-decoration: underline;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${(props) => props.theme.colors.grey[200]};
`;

export const PaginationButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid
    ${(props) =>
      props.disabled
        ? props.theme.colors.grey[200]
        : SEJONG_COLORS.CRIMSON_RED};
  border-radius: 50%;
  background: white;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: ${SEJONG_COLORS.CRIMSON_RED};
    svg {
      color: white;
    }
  }

  svg {
    width: 22px;
    height: 22px;
    color: ${(props) =>
      props.disabled
        ? props.theme.colors.grey[300]
        : SEJONG_COLORS.CRIMSON_RED};
    transition: color 0.2s;
  }
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;

  button {
    background-color: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary.crimsonDark};
    }
  }

  ${media.mobile} {
    width: 100%;
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

export const ProfessorList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${media.mobile} {
    gap: 1rem;
  }
`;
export const ProfessorCardWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);

    ${media.desktop} {
      button {
        opacity: 1;
      }
    }
  }
`;

export const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem auto;
  padding: 1rem;
  max-width: 600px;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #feb2b2;
  text-align: center;

  svg {
    flex-shrink: 0;
  }

  ${media.mobile} {
    margin: 1rem;
    padding: 0.75rem;
    font-size: 0.875rem;
    gap: 0.375rem;
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
    font-size: 0.9rem;
    margin: 1.5rem 0;
  }
`;

export const EditButtonContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;

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
export const PageNumber = styled.span`
  font-size: 1rem;
  color: #4a5568;
  min-width: 80px;
  text-align: center;

  ${media.mobile} {
    font-size: 0.9rem;
    min-width: 60px;
  }
`;
export const ImageSection = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  padding: 20px;
  background: ${(props) => props.theme.colors.grey[100]};
  position: relative;
  border-right: 1px solid ${(props) => props.theme.colors.grey[200]};
  overflow: hidden;

  ${media.mobile} {
    width: 100%;
    height: 400px;
    border-right: none;
    border-bottom: 1px solid ${(props) => props.theme.colors.grey[200]};
  }

  ${media.tablet} {
    width: 300px;
    height: 380px;
  }
`;

export const ProfessorImage = styled.img`
  width: 240px;
  height: 300px;
  object-fit: cover;
  object-position: center center;
  border-radius: 8px;
  transform: scale(1.01);
  transition: transform 0.3s ease;

  ${media.mobile} {
    width: 300px;
    height: 300px;
  }

  ${media.tablet} {
    width: 260px;
    height: 320px;
  }

  ${ProfessorCard}:hover & {
    transform: scale(1.05);
  }
`;
