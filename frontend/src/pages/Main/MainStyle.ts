import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
`;

export const TMP = styled.div`
  display: flex;
  ${media.tablet} {
    display: flex;
    flex-wrap: wrap; /* 태블릿에서는 기존 flex 레이아웃 */
    justify-content: space-between; /* 태블릿에서는 4열로 가로 배치 */
  }

  ${media.mobile} {
    display: grid; /* 모바일에서는 grid 레이아웃 */
    grid-template-columns: repeat(2, 1fr); /* 2열 */
    grid-template-rows: repeat(2, auto); /* 2행 */
    justify-items: center; /* 카드 중앙 정렬 */
  }
`;

export const Title = styled.div`
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

export const Paper = styled.article`
  display: flex;
  flex-direction: column;
  margin: 0 40px 0 40px;
  padding: 24px;
  border: solid 1px #d4d2e3;
  border-radius: 24px;

  img {
    width: 200px;
    height: auto;
    margin-bottom: 12px;

    ${media.tablet} {
      width: auto;
    }

    ${media.mobile} {
      width: auto;
    }
  }

  p:first-of-type {
    margin: 0;
    font-family: 'Noto Sans KR';
    color: #5d5a88;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;

    ${media.mobile} {
      font-size: 16px;
    }
  }

  p:last-of-type {
    margin: 0;
    font-family: 'Noto Sans KR';
    color: #5d5a88;
    font-size: 16px;
    font-weight: 400;

    ${media.mobile} {
      font-size: 14px;
    }
  }

  ${media.tablet} {
    flex: 1 0 calc(25% - 20px); /* 태블릿: 25% 너비 (4열) */
    max-width: 220px;
  }

  ${media.mobile} {
    max-width: 160px; /* 모바일에서 카드 크기 축소 */
    padding: 18px;
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
  padding: 12px 0 12px 0;
  background: ${({ isActive }) => (isActive ? '#D7E8FF' : '#F1F1F3')};
  border: ${({ isActive }) => (isActive ? '1px solid #65B2D3' : 'none')};
  font-family: 'Noto Sans KR';
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.5s;
`;

export const ContentContainer = styled.div`
  margin-top: 8px;
`;

export const AnnouncementItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid #e2e3e5;
  cursor: pointer;

  img {
    margin: 0 8px 0 8px;
  }

  span {
    font-size: 15px;
    font-weight: 400;
    margin-right: 8px;
  }
`;

export const SeminarContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-end;

  // 세미나 정보
  button:first-of-type {
    height: 200px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 24px;
    padding: 0 30px;
    background-color: #3271c7;

    border-radius: 0;
    border: none;
    color: white;
    font-family: 'Noto Sans KR';
    cursor: pointer;

    p {
      margin: 16px 0 16px 0;

      ${media.mobile} {
        margin: 0 0 0 8px;
      }
    }

    p:first-of-type {
      font-size: 22px;
      margin-bottom: 0;

      ${media.mobile} {
        font-size: 16px;
        margin-top: 10px;
        margin-bottom: 10px;
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

// 세미나실 예약
export const SeminarRoomReservation = styled(Link)`
  height: 200px;
  flex: 1;
  border-radius: 0;
  border: none;
  color: white;
  font-family: 'Noto Sans KR';
  cursor: pointer;

  p {
    margin: 16px 0 16px 0;
  }

  span {
    margin-right: 20px;

    ${media.mobile} {
      margin-right: 0;
      margin-bottom: 8px;
    }
  }

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px 0 24px;
  font-size: 22px;
  background-color: #358bbf;
  text-decoration: none;

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
  grid-template-rows: repeat(3, auto); /* 3개의 행 */
  grid-template-columns: repeat(2, 1fr); /* 2개의 열 */
  gap: 50px 0; /* 요소들 사이의 간격 설정 */
  padding: 95px 0 95px 0;

  background: linear-gradient(135deg, #d1f1ff 0%, #d1f1ff 50%, #71c9ff0a 100%);

  a {
    width: 100%;
    text-decoration: none;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR';
    font-size: 22px;
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

  ${media.tablet} {
    font-size: 18px;
  }
`;
