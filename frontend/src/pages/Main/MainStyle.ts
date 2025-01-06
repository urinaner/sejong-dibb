//MainStyle.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as token from '../../constants/colors';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const MainContainer = styled.div`
  ${media.mobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const PaperContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const NewsSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto 40px;
  padding: 40px 20px;
  background-color: #f8f9fa;

  ${media.mobile} {
    padding: 20px;
    margin-bottom: 20px;
  }
`;

export const TMP = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
  width: 100%;

  ${media.tablet} {
    gap: 20px;
  }

  ${media.mobile} {
    gap: 15px;
  }
`;

export const Title = styled.h2`
  margin: 50px 0 40px 0;
  font-size: 30px;
  font-weight: 700;
  color: #5d5a88;

  ${media.tablet} {
    margin: 40px 0 30px 0;
    font-size: 28px;
  }
  ${media.mobile} {
    margin: 30px 0 20px 0;
    font-size: 24px;
  }
`;

export const NewsTitle = styled.h2`
  margin: 0 0 20px 0;
  font-size: 36px;
  font-weight: 700;
  color: ${token.SEJONG_COLORS.CRIMSON_RED};
  text-align: center;

  ${media.tablet} {
    font-size: 32px;
  }

  ${media.mobile} {
    font-size: 28px;
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
  margin-top: 48px;
  margin-bottom: 50px;

  ${media.mobile} {
    align-items: center;
    flex-direction: column;
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
    flex: 100%;
    margin-right: 0;
  }
`;

export const AnnouncementContainer = styled.div`
  flex: 2;

  p {
    font-size: 22px;

    ${media.mobile} {
      font-size: 20px;
      margin-top: 0;
    }
  }

  ${media.mobile} {
    margin-bottom: 40px;
  }
`;

export const TabContainer = styled.div`
  display: flex;
`;

interface TabButtonProps {
  isActive: boolean;
}

export const TabButton = styled.button<TabButtonProps>`
  flex: 1;
  padding: 12px 0;
  background: ${({ isActive }) =>
    isActive ? `${token.SEJONG_COLORS.CRIMSON_RED}` : '#F1F1F3'};
  border: ${({ isActive }) =>
    isActive ? `1px solid ${token.SEJONG_COLORS.CRIMSON_RED}` : 'none'};
  color: ${({ isActive }) => (isActive ? 'white' : '#333')};
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ isActive }) =>
      isActive ? token.SEJONG_COLORS.CRIMSON_RED : '#e9e9eb'};
  }
`;

export const ContentContainer = styled.div``;

export const AnnouncementItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #e2e3e5;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f8f9fa;
  }

  img {
    margin: 0 8px;
  }

  span {
    font-size: 15px;
    font-weight: 400;
    margin-right: 8px;
  }

  span:first-of-type {
    flex-shrink: 1;
    flex-basis: 100%;
    max-width: calc(100% - 80px);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
  }

  span:last-of-type {
    width: 60px;
    text-align: right;
  }
`;

export const SeminarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;

  button:first-of-type {
    height: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 24px;
    padding: 0 30px;
    background-color: ${token.SEJONG_COLORS.WARM_GRAY1};
    border-radius: 0;
    border: none;
    color: white;
    font-family: 'Noto Sans KR';
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: ${token.SEJONG_COLORS.WARM_GRAY2};
    }

    p {
      margin: 16px 0;

      ${media.mobile} {
        margin: 0 0 0 8px;
      }
    }

    p:first-of-type {
      font-size: 22px;
      margin-bottom: 0;

      ${media.mobile} {
        font-size: 16px;
        margin: 10px 0;
      }
    }

    p:last-of-type {
      font-size: 16px;
      font-weight: 700;

      ${media.mobile} {
        font-size: 14px;
        margin-bottom: 8px;
      }
    }

    div {
      font-size: 14px;
      font-weight: 300;
      text-align: left;

      ${media.mobile} {
        margin-left: 8px;
      }
    }

    img {
      position: relative;
      left: 90%;
      bottom: 15%;

      ${media.mobile} {
        width: 24px;
        height: auto;
        left: 80%;
        bottom: 80%;
      }
    }

    ${media.tablet} {
      height: 180px;
    }

    ${media.mobile} {
      height: 148px;
      margin-right: 8px;
      padding: 0;
      flex: 1;
    }
  }

  ${media.mobile} {
    margin-bottom: 40px;
  }
`;

export const SeminarRoomReservation = styled(Link)`
  height: 200px;
  flex: 1;
  border-radius: 0;
  border: none;
  color: white;
  font-family: 'Noto Sans KR';
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  font-size: 22px;
  background-color: ${token.SEJONG_COLORS.WARM_GRAY1};
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${token.SEJONG_COLORS.WARM_GRAY2};
  }

  span {
    margin-right: 20px;

    ${media.mobile} {
      margin-right: 0;
      margin-bottom: 8px;
    }
  }

  ${media.tablet} {
    height: 180px;
    font-size: 20px;
  }

  ${media.mobile} {
    flex-direction: column;
    flex: 1;
    padding: 0;
    height: 148px;
    font-size: 16px;
    margin-left: 8px;
  }
`;

export const ShortcutContainer = styled.section`
  flex: 45%;
  display: grid;
  justify-items: center;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: repeat(2, 1fr);
  gap: 50px 0;
  padding: 95px 0;
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
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease;

  img {
    width: 90px;
    height: auto;
    margin-bottom: 10px;

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
