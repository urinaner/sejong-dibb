import styled from 'styled-components';

export const ButtonListContainer = styled.section`
  width: 100%;
  margin: 2rem 0;
`;

export const ButtonListList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: stretch; /* 아이템 높이를 맞추고 싶으면 stretch */
  list-style: none;
  padding: 0;
  margin: 0;

  /* 화면이 좁아졌을 때 아이템들이 줄바꿈되어 2열 이상으로 배치되도록 */
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const ButtonListItem = styled.li`
  flex: 1;
  margin: 0 0.5rem;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  a {
    display: flex;
    flex-direction: column; /* 아이콘과 텍스트를 세로 배치 */
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit; /* 부모 컬러 상속 */
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    transition: background-color 0.3s ease;

    img {
      width: 40px;
      height: 40px;
      margin-bottom: 0.5rem;
    }

    span {
      font-size: 1rem;
      font-weight: 500;
    }

    &:hover {
      background-color: #f9f9f9;
    }
  }

  /* 모바일 환경에서는 2개씩 배치 */
  @media (max-width: 768px) {
    flex: 0 0 calc(50% - 1rem);
    margin-bottom: 1rem;
  }
`;
