import styled from 'styled-components';

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
  border: 1px solid #e2e8f0;
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
  background: #f8f9fa;
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
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e2e8f0;
`;

export const MajorTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const MajorTag = styled.span`
  background: #ebf4ff;
  color: #1a73e8;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    background: #1a73e8;
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
  color: #4a5568;
  font-size: 0.95rem;

  svg {
    color: #1a73e8;
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
  color: #1a73e8;
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
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: #f1f5f9;
    color: #1a73e8;
  }

  &:active {
    background: #e2e8f0;
  }
`;

export const CopySuccessMessage = styled.div`
  background: #2c3e50;
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;
