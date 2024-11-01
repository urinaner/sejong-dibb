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

export const AnnouncementAndSeminar = styled.section``;

export const AnnouncementContainer = styled.div``;

export const SeminarContainer = styled.div``;

export const ShortcutContainer = styled.section``;

// export const PaperContainer = styled.div``;
// export const PaperContainer = styled.div``;
// export const PaperContainer = styled.div``;
