import styled from 'styled-components';

export const MainContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

export const PaperContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.div`
  margin: 20px 0 40px 0;
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
`;

export const AnnouncementAndSeminar = styled.section`
  flex: 45%;
  width: 90%;
  margin-right: 100px;

  display: flex;
  flex-direction: column;
`;

export const AnnouncementContainer = styled.div`
  background-color: aqua;
  flex: 2;
`;

export const SeminarContainer = styled.div`
  flex: 1;
  display: flex;

  button {
    flex: 1;
    border-radius: 0;
    border: none;
    color: white;
    font-family: 'Noto Sans KR';
    cursor: pointer;

    p {
      margin: 16px 0 16px 0;
    }
  }

  // 세미나 정보
  button:first-of-type {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-right: 24px;
    padding-left: 30px;
    background-color: #3271c7;

    div {
      display: flex;
      flex-direction: column;
      text-align: left; /* 텍스트 왼쪽 정렬 */
    }

    img {
      position: relative;
      left: 80%;
      bottom: 15%;
    }
  }

  // 세미나실 예약
  button:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24px 0 24px;
    font-size: 22px;
    background-color: #358bbf;
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

// export const PaperContainer = styled.div``;
// export const PaperContainer = styled.div``;
