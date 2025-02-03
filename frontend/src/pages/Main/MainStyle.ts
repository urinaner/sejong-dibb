import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as token from '../../constants/colors';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

// 공통 레이아웃 상수
const LAYOUT = {
  maxWidth: '1200px',
  padding: '20px',
  mobilePadding: '16px',
};

export const MainContainer = styled.div`
  width: 100%;
  max-width: ${LAYOUT.maxWidth};
  margin: 5vh auto 0;
  padding: 0 ${LAYOUT.padding};
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.tablet} {
    max-width: 90%;
  }

  ${media.mobile} {
    max-width: 100%;
    padding: 0 ${LAYOUT.mobilePadding};
  }
`;

export const PaperContainer = styled.section`
  width: 100%;
  max-width: ${LAYOUT.maxWidth};
  margin: 0 auto;
  padding: ${LAYOUT.padding};
  display: flex;
  flex-direction: column;
  align-items: center;

  ${media.mobile} {
    padding: ${LAYOUT.mobilePadding};
  }
`;

export const NewsSection = styled.section`
  width: 100%;
  max-width: ${LAYOUT.maxWidth};
  margin: 0 auto;
  padding: 40px ${LAYOUT.padding};
  position: relative;
  z-index: 2;

  ${media.mobile} {
    padding: 20px ${LAYOUT.mobilePadding};
  }
`;

export const TMP = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 0;

  ${media.tablet} {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }

  ${media.mobile} {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
  }
`;

export const Title = styled.div`
  width: 100%;
  margin: 2rem 0;
  font-size: 30px;
  font-weight: 800;
  color: #5d5a88;

  ${media.tablet} {
    font-size: 24px;
    margin: 32px 0 24px 0;
  }

  ${media.mobile} {
    font-size: 22px;
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

  ${media.tablet} {
    font-size: 28px;
  }

  ${media.mobile} {
    font-size: 24px;
    margin: 0 0 12px 0;
  }
`;

export const Paper = styled.article`
  cursor: pointer;
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${LAYOUT.padding};
  border: solid 1px #d4d2e3;
  border-radius: 16px;
  background-color: white;

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

    ${media.tablet} {
      max-width: 200px;
    }

    ${media.mobile} {
      max-width: 160px;
    }
  }

  p {
    width: 100%;
    margin: 0;
    margin-bottom: 8px;
    color: #5d5a88;
    word-break: break-all;
  }

  p:nth-of-type(1) {
    font-size: 16px;
    font-weight: 800;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 48px;
  }

  p:nth-of-type(2) {
    font-size: 14px;
  }

  p:nth-of-type(3) {
    font-size: 14px;
    color: #9e9e9e;
  }

  ${media.mobile} {
    padding: 12px;

    p:nth-of-type(1) {
      font-size: 14px;
      height: 42px;
    }

    p:nth-of-type(2),
    p:nth-of-type(3) {
      font-size: 12px;
    }
  }
`;

export const ContentWrapper = styled.section`
  width: 100%;
  max-width: ${LAYOUT.maxWidth};
  margin: 48px auto;
  padding: 0 ${LAYOUT.padding};
  display: flex;
  justify-content: space-between;
  gap: 24px;

  ${media.tablet} {
    margin: 32px auto;
    padding: 0 ${LAYOUT.mobilePadding};
    gap: 20px;
  }

  ${media.mobile} {
    flex-direction: column;
    margin: 24px auto;
    gap: 16px;
  }
`;

export const AnnouncementAndSeminar = styled.section`
  flex: 2;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  ${media.mobile} {
    gap: 16px;
  }
`;

export const AnnouncementContainer = styled.div`
  width: 100%;
  padding: ${LAYOUT.padding};
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  > p {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 16px 0;

    ${media.mobile} {
      font-size: 18px;
      margin: 0 0 12px 0;
    }
  }

  ${media.mobile} {
    padding: ${LAYOUT.mobilePadding};
  }
`;

export const TabContainer = styled.div`
  display: flex;
  margin-bottom: 16px;

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
    padding: 8px;
    font-size: 13px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const AnnouncementItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease;
  border-bottom: 1px solid #e2e3e5;

  &:hover {
    background-color: #f8f9fa;
  }

  span {
    font-size: 14px;
  }

  span:first-of-type {
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

  span:last-of-type {
    color: #666;
    white-space: nowrap;
  }

  ${media.mobile} {
    padding: 10px 6px;

    span {
      font-size: 13px;
    }

    span:first-of-type img {
      margin-right: 6px;
      width: 14px;
      height: 14px;
    }
  }
`;

export const SeminarContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 24px;

  ${media.tablet} {
    gap: 20px;
  }

  ${media.mobile} {
    gap: 16px;
  }

  button:first-of-type {
    font-family: 'NanumSquare';
    flex: 2;
    min-height: 180px;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: center;
    padding: ${LAYOUT.padding};
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
    }

    p:first-of-type {
      font-size: 20px;
      font-weight: 600;
    }

    p:last-of-type {
      font-size: 16px;
      font-weight: 800;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex-shrink: 1;
      min-width: 0;
      max-width: 100%;

      ${media.mobile} {
        font-size: 14px;
        margin-bottom: 8px;
      }
    }

    div {
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
      opacity: 0.9;
    }

    ${media.mobile} {
      min-height: 160px;
      padding: ${LAYOUT.mobilePadding};

      p:first-of-type {
        font-size: 18px;
      }

      p:last-of-type {
        font-size: 14px;
      }

      div {
        font-size: 12px;
      }
    }
  }
`;

export const SeminarRoomReservation = styled(Link)`
  flex: 1;
  min-height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${LAYOUT.padding};
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

  ${media.mobile} {
    min-height: 160px;
    padding: ${LAYOUT.mobilePadding};

    span {
      font-size: 18px;
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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  padding: ${LAYOUT.padding};
  background-color: #e9dfda;
  border-radius: 8px;

  a {
    text-decoration: none;
    color: inherit;
  }

  ${media.mobile} {
    padding: ${LAYOUT.mobilePadding};
    gap: 16px;
  }
`;

export const Shortcut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${LAYOUT.mobilePadding};
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

  ${media.mobile} {
    padding: 12px;
    gap: 8px;
    font-size: 14px;

    img {
      width: 40px;
      height: 40px;
    }
  }
`;
