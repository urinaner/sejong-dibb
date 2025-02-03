import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as token from '../../constants/colors';

const media = {
  mobile: '@media(max-width: 479px)',
  tablet: '@media(min-width: 480px) and (max-width: 767px)',
  desktop: '@media(min-width: 768px) and (max-width: 1023px)',
  wide: '@media(min-width: 1024px)',
};

const CommonSection = styled.section`
  width: 100%;
  margin: 0 auto;
  max-width: 1200px;

  ${media.desktop} {
    max-width: 960px;
  }

  ${media.tablet} {
    max-width: 720px;
  }

  ${media.mobile} {
    max-width: 100%;
    padding: 0 16px;
  }
`;

export const Title = styled.div`
  width: 100%;
  margin: 2rem 0;
  font-size: 30px;
  font-weight: 800;
  color: #5d5a88;

  ${media.desktop} {
    font-size: 28px;
    margin: 36px 0 28px 0;
  }

  ${media.tablet} {
    font-size: 24px;
    margin: 32px 0 24px 0;
  }

  ${media.mobile} {
    font-size: 20px;
    margin: 24px 0 20px 0;
  }
`;

export const NewsTitle = styled.h2`
  width: 100%;
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 800;
  color: ${token.SEJONG_COLORS.CRIMSON_RED};
  text-align: center;

  ${media.desktop} {
    font-size: 30px;
    margin: 0 0 14px 0;
  }

  ${media.tablet} {
    font-size: 28px;
    margin: 0 0 12px 0;
  }

  ${media.mobile} {
    font-size: 24px;
    margin: 0 0 10px 0;
  }
`;

export const ContentWrapper = styled(CommonSection)`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  margin: 48px auto;

  ${media.desktop} {
    gap: 22px;
    margin: 40px auto;
  }

  ${media.tablet} {
    gap: 20px;
    margin: 32px auto;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 16px;
    margin: 24px auto;
  }
`;

export const NewsSection = styled(CommonSection)`
  padding: 40px 0;
  position: relative;
  z-index: 2;

  ${media.desktop} {
    padding: 36px 0;
  }

  ${media.tablet} {
    padding: 32px 0;
  }

  ${media.mobile} {
    padding: 24px 0;
  }
`;

export const PaperContainer = styled(CommonSection)`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: center;
  padding: 20px 0;

  ${media.desktop} {
    gap: 22px;
    padding: 18px 0;
  }

  ${media.tablet} {
    gap: 20px;
    padding: 16px 0;
  }

  ${media.mobile} {
    gap: 16px;
    padding: 12px 0;
  }
`;

export const AnnouncementAndSeminar = styled.section`
  flex: 2;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media.desktop} {
    gap: 22px;
  }

  ${media.tablet} {
    gap: 20px;
  }

  ${media.mobile} {
    gap: 16px;
  }
`;

export const AnnouncementContainer = styled.div`
  width: 100%;
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  > p {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px 0;

    ${media.desktop} {
      font-size: 19px;
      margin: 0 0 14px 0;
    }

    ${media.tablet} {
      font-size: 18px;
      margin: 0 0 12px 0;
    }

    ${media.mobile} {
      font-size: 16px;
      margin: 0 0 10px 0;
    }
  }

  ${media.desktop} {
    padding: 22px;
  }

  ${media.tablet} {
    padding: 20px;
  }

  ${media.mobile} {
    padding: 16px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 16px;
  border-radius: 4px;
  overflow: hidden;

  ${media.mobile} {
    margin-bottom: 12px;
  }
`;

interface TabButtonProps {
  isActive: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 12px;
  background: ${({ isActive }) =>
    isActive ? token.SEJONG_COLORS.CRIMSON_RED : '#F1F1F3'};
  border: none;
  color: ${({ isActive }) => (isActive ? 'white' : '#333')};
  font-size: 14px;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? token.SEJONG_COLORS.DARK_RED : '#e9e9eb'};
  }

  ${media.mobile} {
    padding: 10px;
    font-size: 13px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  ${media.mobile} {
    gap: 6px;
  }
`;

export const AnnouncementItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #e2e3e5;

  &:hover {
    background-color: #f8f9fa;
  }

  span {
    font-size: 14px;

    &:first-of-type {
      flex: 1;
      margin-right: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;

      img {
        margin-right: 8px;
        vertical-align: middle;
      }
    }

    &:last-of-type {
      color: #666;
      white-space: nowrap;
    }
  }

  ${media.desktop} {
    padding: 11px 8px;
  }

  ${media.tablet} {
    padding: 10px 8px;
  }

  ${media.mobile} {
    padding: 10px 6px;

    span {
      font-size: 13px;

      &:first-of-type {
        margin-right: 12px;

        img {
          margin-right: 6px;
          width: 14px;
          height: 14px;
        }
      }
    }
  }
`;

export const SeminarContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;

  ${media.desktop} {
    gap: 22px;
  }

  ${media.tablet} {
    gap: 20px;
  }

  ${media.mobile} {
    flex-direction: column;
    gap: 16px;
  }
`;

export const MainSeminarButton = styled.button`
  flex: 2;
  min-width: 0;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 24px;
  background-color: ${token.SEJONG_COLORS.WARM_GRAY1};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${token.SEJONG_COLORS.WARM_GRAY2};
  }

  p {
    margin: 0 0 12px 0;

    &:first-of-type {
      font-size: 20px;
      font-weight: 600;
    }

    &:last-of-type {
      font-size: 16px;
      font-weight: 800;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  div {
    font-size: 14px;
    line-height: 1.5;
    text-align: left;
    opacity: 0.9;
  }

  ${media.desktop} {
    min-height: 170px;
    padding: 22px;

    p {
      &:first-of-type {
        font-size: 19px;
      }
    }
  }

  ${media.tablet} {
    min-height: 160px;
    padding: 20px;

    p {
      &:first-of-type {
        font-size: 18px;
      }

      &:last-of-type {
        font-size: 15px;
      }
    }

    div {
      font-size: 13px;
    }
  }

  ${media.mobile} {
    min-height: 150px;
    padding: 16px;

    p {
      margin: 0 0 8px 0;

      &:first-of-type {
        font-size: 16px;
      }

      &:last-of-type {
        font-size: 14px;
      }
    }

    div {
      font-size: 12px;
    }
  }
`;

export const SeminarRoomReservation = styled(Link)`
  flex: 1;
  min-width: 200px;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background-color: ${token.SEJONG_COLORS.WARM_GRAY1};
  border-radius: 8px;
  color: white;
  text-decoration: none;
  text-align: center;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${token.SEJONG_COLORS.WARM_GRAY2};
  }

  span {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 12px;
    line-height: 1.3;
  }

  ${media.desktop} {
    min-height: 170px;
    padding: 22px;
    min-width: 180px;

    span {
      font-size: 19px;
    }
  }

  ${media.tablet} {
    min-height: 160px;
    padding: 20px;
    min-width: 160px;

    span {
      font-size: 18px;
    }

    img {
      width: 28px;
      height: 28px;
    }
  }

  ${media.mobile} {
    min-height: 150px;
    padding: 16px;
    min-width: 0;

    span {
      font-size: 16px;
      margin-bottom: 8px;
    }

    img {
      width: 24px;
      height: 24px;
    }
  }
`;

export const ShortcutContainer = styled.section`
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: 40px 24px;
  background-color: #e9dfda;
  border-radius: 8px;
  align-self: flex-start;

  a {
    text-decoration: none;
    color: inherit;
  }

  ${media.desktop} {
    min-width: 260px;
    padding: 36px 22px;
    gap: 22px;
  }

  ${media.tablet} {
    min-width: 240px;
    padding: 32px 20px;
    gap: 20px;
  }

  ${media.mobile} {
    max-width: 100%;
    min-width: 0;
    padding: 24px 16px;
    gap: 16px;
  }
`;

export const TMP = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;

  ${media.desktop} {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 22px;
  }

  ${media.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

export const Paper = styled.article`
  width: 280px;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #d4d2e3;
  border-radius: 16px;
  background-color: white;
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    max-width: 240px;
    height: auto;
    margin-bottom: 16px;
    border-radius: 8px;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }

  p {
    width: 100%;
    margin: 0;
    margin-bottom: 8px;
    color: #5d5a88;
    word-break: break-all;

    &:nth-of-type(1) {
      font-size: 16px;
      font-weight: 800;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      height: 48px;
    }

    &:nth-of-type(2) {
      font-size: 14px;
    }

    &:nth-of-type(3) {
      font-size: 14px;
      color: #9e9e9e;
    }
  }

  ${media.desktop} {
    width: 260px;
    padding: 22px;

    img {
      max-width: 220px;
    }

    p {
      &:nth-of-type(1) {
        font-size: 15px;
        height: 45px;
      }
    }
  }

  ${media.tablet} {
    width: 240px;
    padding: 20px;

    img {
      max-width: 200px;
      margin-bottom: 14px;
    }

    p {
      &:nth-of-type(1) {
        font-size: 14px;
        height: 42px;
      }

      &:nth-of-type(2),
      &:nth-of-type(3) {
        font-size: 13px;
      }
    }
  }

  ${media.mobile} {
    width: 100%;
    max-width: 280px;
    padding: 16px;
    margin: 0 auto;

    img {
      max-width: 180px;
      margin-bottom: 12px;
    }

    p {
      &:nth-of-type(1) {
        font-size: 14px;
        height: 42px;
      }

      &:nth-of-type(2),
      &:nth-of-type(3) {
        font-size: 12px;
      }
    }
  }
`;

export const Shortcut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 16px;
  gap: 12px;
  text-align: center;
  color: ${token.SEJONG_COLORS.GRAY};
  font-size: 16px;
  border-radius: 8px;
  transition: all 0.2s ease;

  img {
    width: 48px;
    height: 48px;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  ${media.desktop} {
    padding: 14px;
    gap: 10px;
    font-size: 15px;

    img {
      width: 44px;
      height: 44px;
    }
  }

  ${media.tablet} {
    padding: 12px;
    gap: 8px;
    font-size: 14px;

    img {
      width: 40px;
      height: 40px;
    }
  }

  ${media.mobile} {
    padding: 10px;
    gap: 6px;
    font-size: 13px;

    img {
      width: 36px;
      height: 36px;
    }
  }
`;
