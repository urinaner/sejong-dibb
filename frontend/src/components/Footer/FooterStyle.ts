// styles.ts
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Footer = styled.footer`
  width: 100%;
  padding: 40px;
  background-color: #d7e8ff;

  /* 1180px 미만일 때 */
  @media (max-width: 1180px) {
    width: 100%;
  }

  /* 휴대폰 */
  @media (max-width: 768px) {
    width: 100%;
  }
  box-sizing: border-box;
`;

export const FooterContainer = styled.div`
  display: flex;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  box-sizing: border-box;
`;

export const Address = styled.div`
  flex: 1 0 0;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans';

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const AddressTitle = styled.div`
  font-size: 32px;
  font-weight: 600;
  margin: 0 0 20px 0;
`;

export const SightMap = styled.div`
  display: flex;
  flex: 2 0 0;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const SightMapHeader = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 20px;
  font-size: 20px;
  font-family: 'Noto Serif KR', serif;
  font-weight: 600;

  @media (max-width: 768px) {
    flex-direction: row;
  }
`;

export const SightMapContent = styled.a`
  font-size: 16px;
  font-weight: 300;
  margin-top: 16px;
  font-family: 'Noto Sans';
`;

export const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid grey;
  margin-top: 36px;
  padding-top: 36px;
  font-weight: 600;
`;

// 기본 스타일을 없앤 Link 컴포넌트
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const AdminSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #333;

  span {
    font-size: 0.9rem;
  }
`;

export const AdminButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  color: inherit;

  img,
  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
