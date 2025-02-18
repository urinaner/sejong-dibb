import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
  desktop: '@media(min-width: 1025px)',
};

export const ProfileContainer = styled.section`
  display: flex;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    

  ${media.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ImageWrapper = styled.div`
  flex-shrink: 0;
  position: relative;

  ${media.mobile} {
    width: 100%;
  }
`;

export const ImageSection = styled.div`
  width: 300px;
  height: 360px;
  background: ${(props) => props.theme.colors.grey[100]};
  position: relative;
  overflow: hidden;

  ${media.tablet} {
    width: 250px;
    height: 300px;
  }

  ${media.mobile} {
    width: 100%;
    height: 280px;
    border-radius: 0;
  }
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  ${media.mobile} {
    object-position: top center;
  }
`;

export const InfoSection = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;

  ${media.mobile} {
    padding: 1rem;
    gap: 1.25rem;
  }
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InfoTitle = styled.h3`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};

  ${media.mobile} {
    font-size: 1rem;
  }
`;

export const TagCount = styled.span`
  background-color: ${SEJONG_COLORS.CRIMSON_RED}15;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const MajorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;

  ${media.mobile} {
    gap: 0.4rem;
  }
`;

export const MajorTag = styled.span`
  background: ${(props) => props.theme.colors.grey[50]};
  color: ${SEJONG_COLORS.CRIMSON_RED};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED}30;
  transition: all 0.2s;

  &:hover {
    background: ${SEJONG_COLORS.CRIMSON_RED}10;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  ${media.mobile} {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
  }
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  ${media.mobile} {
    gap: 0.6rem;
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 0.95rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.grey[50]};
  }

  ${media.mobile} {
    font-size: 0.9rem;
    gap: 0.6rem;
  }
`;

export const ContactIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  flex-shrink: 0;
  width: 24px;
`;

export const ContactText = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const ContactLink = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  background: none;
  border: none;
  padding: 0;
  font-size: 0.95rem;
  cursor: pointer;
  text-align: left;

  span {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
    opacity: 0.7;
  }

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.primary.crimsonDark};

    svg {
      opacity: 1;
    }
  }

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: ${(props) => props.theme.colors.grey[400]};
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${(props) => props.theme.colors.grey[100]};
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  &:active {
    background: ${(props) => props.theme.colors.grey[200]};
  }

  ${media.mobile} {
    width: 28px;
    height: 28px;
  }
`;

export const CopySuccessMessage = styled.div`
  background: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  box-shadow:
    0 4px 6px -1px rgba(163, 20, 50, 0.1),
    0 2px 4px -1px rgba(163, 20, 50, 0.06);

  ${media.mobile} {
    padding: 0.75rem 1.5rem;
    font-size: 0.85rem;
  }
`;
