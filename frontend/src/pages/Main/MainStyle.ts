import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as token from '../../constants/colors';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};
export const MainContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PaperContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const TMP = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  padding: 0; // 패딩 조정
`;
export const Title = styled.h2`
  margin: 40px 0 32px 0;
  font-size: 28px;
  font-weight: 700;
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
  margin: 0 0 16px 0;
  font-size: 32px;
  font-weight: 700;
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 320px;
  padding: 24px;
  border: solid 1px #d4d2e3;
  border-radius: 24px;
  background-color: white;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 272px;
    height: auto;
    margin-bottom: 16px;
    border-radius: 12px;

    ${media.tablet} {
      width: 220px;
    }

    ${media.mobile} {
      width: 160px;
    }
  }

  p {
    width: 272px;
    margin: 0;
    margin-bottom: 8px;
    font-family: 'Noto Sans KR';
    color: #5d5a88;
    word-break: break-all;
  }

  p:nth-of-type(1) {
    font-size: 18px;
    font-weight: 700;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 54px;
  }

  p:nth-of-type(2) {
    font-size: 16px;
    font-weight: 500;
    color: #7a7a7a;
  }

  p:nth-of-type(3) {
    font-size: 14px;
    font-weight: 400;
    color: #9e9e9e;
  }

  ${media.tablet} {
    width: calc(50% - 30px);
    max-width: 280px;
    padding: 20px;

    p {
      width: 220px;
    }
  }

  ${media.mobile} {
    width: calc(100% - 30px);
    max-width: 240px;
    padding: 16px;

    p {
      width: 160px;
    }

    p:nth-of-type(1) {
      font-size: 16px;
      height: 48px;
    }

    p:nth-of-type(2) {
      font-size: 14px;
    }

    p:nth-of-type(3) {
      font-size: 12px;
    }
  }
`;
export const ContentWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  margin: 48px auto;
  padding: 0 20px;
  max-width: 1200px;
  gap: 24px;

  ${media.tablet} {
    margin: 32px auto;
    padding: 0 16px;
    gap: 20px;
  }

  ${media.mobile} {
    flex-direction: column;
    margin: 24px auto;
    padding: 0 12px;
    gap: 16px;
  }
`;

export const AnnouncementAndSeminar = styled.section`
  flex: 45%;
  width: 90%;
  margin-right: 100px;
  font-family: 'Noto Sans KR';
  display: flex;
  flex-direction: column;

  ${media.tablet} {
    margin-right: 40px;
  }

  ${media.mobile} {
    max-width: 100%;
    gap: 16px;
  }
`;

export const AnnouncementContainer = styled.div`
  flex: 2;

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
    padding: 16px;
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
    width: 60px;
  }
`;

export const SeminarContainer = styled.div`
  display: flex;
  gap: 16px;
  height: auto;

  ${media.mobile} {
    gap: 12px;
  }

  button:first-of-type {
    flex: 2;
    min-height: 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
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
      font-weight: 500;
    }

    div {
      font-size: 14px;
      line-height: 1.5;
      text-align: left;
      opacity: 0.9;
    }

    ${media.mobile} {
      min-height: 160px;
      padding: 16px;

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
  padding: 20px;
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
    padding: 16px;

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
  flex: 45%;
  display: grid;
  justify-items: center;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(2, 1fr);
  gap: 50px 0;
  padding: 95px 0 95px 0;
  background-color: #e9dfda;

  a {
    width: 100%;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR';
    font-size: 20px;
    color: ${token.SEJONG_COLORS.GRAY};
  }

  ${media.mobile} {
    width: 90%;
    padding: 40px 0;
  }
`;

export const Shortcut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;

  img {
    width: 90px;
    height: auto;

    ${media.tablet} {
      width: 80px;
    }

    ${media.mobile} {
      width: 72px;
    }
  }

  &:hover {
    background-color: rgba(240, 240, 240, 0.3);
    cursor: pointer;
  }

  ${media.tablet} {
    font-size: 20px;
  }

  ${media.mobile} {
    font-size: 18px;
  }
`;
