import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const ProfileContainer = styled.section`
  display: flex;
  gap: 2rem;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  margin-bottom: 2rem;

  ${media.mobile} {
    flex-direction: column;
    gap: 1rem;
  }
`;

export const ImageSection = styled.div`
  flex-shrink: 0;
  width: 300px;
  height: 360px;
  background: ${(props) => props.theme.colors.grey[100]};
  position: relative;

  ${media.mobile} {
    width: 100%;
    height: 300px;
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
`;

export const InfoSection = styled.div`
  flex: 1;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
`;

export const InfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.theme.colors.grey[200]};
`;

export const MajorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const MajorTag = styled.span`
  background: ${(props) => props.theme.colors.grey[50]};
  color: ${SEJONG_COLORS.CRIMSON_RED};
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid ${SEJONG_COLORS.CRIMSON_RED};
  transition: all 0.2s;

  &:hover {
    background: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;
  }
`;

export const ContactList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 0.95rem;

  svg {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    flex-shrink: 0;
  }
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
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
    color: ${(props) => props.theme.colors.primary.crimsonDark};
  }

  svg {
    flex-shrink: 0;
  }
`;

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
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
`;
