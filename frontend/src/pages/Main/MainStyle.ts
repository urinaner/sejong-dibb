import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainContainer = styled.div``;

export const PaperContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  margin: 50px 0 40px 0;
  font-size: 30px;
  font-weight: 700;
  color: #5d5a88;
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
  }

  p:first-of-type {
    margin: 0;
    font-family: 'Noto Sans KR';
    color: #5d5a88;
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 8px;
  }

  p:last-of-type {
    margin: 0;
    font-family: 'Noto Sans KR';
    color: #5d5a88;
    font-size: 18;
    font-weight: 400;
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  justify-content: space-around;
  margin-top: 48px;
  margin-bottom: 50px;
`;

export const AnnouncementAndSeminar = styled.section`
  flex: 45%;
  width: 90%;
  margin-right: 100px;
  font-family: 'Noto Sans KR';

  display: flex;
  flex-direction: column;
`;

export const AnnouncementContainer = styled.div`
  flex: 2;

  p {
    font-size: 22px;
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

  // 세미나 정보
  button:first-of-type {
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
    }

    div {
      display: flex;
      flex-direction: column;
      text-align: left; /* 텍스트 왼쪽 정렬 */
    }

    img {
      position: relative;
      left: 90%;
      bottom: 15%;
    }
  }
`;

// 세미나실 예약
export const SeminarRoomReservation = styled(Link)`
  flex: 1;
  border-radius: 0;
  border: none;
  color: white;
  font-family: 'Noto Sans KR';
  cursor: pointer;

  p {
    margin: 16px 0 16px 0;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px 0 24px;
  font-size: 22px;
  background-color: #358bbf;
  text-decoration: none;
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
`;

export const Shortcut = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;

  img {
    width: 90px;
    height: auto;
  }

  &:hover {
    background-color: rgba(240, 240, 240, 0.3);
    cursor: pointer;
  }
`;
