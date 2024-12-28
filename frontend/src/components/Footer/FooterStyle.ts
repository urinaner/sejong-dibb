import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as token from '../../constants/colors';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Footer = styled.footer`
  width: 100%;
  padding: 40px;
  background-color: ${token.SEJONG_COLORS.GRAY};
  color: white;
  box-sizing: border-box;

  ${media.tablet} {
    padding: 24px 40px;
  }

  ${media.mobile} {
    padding: 24px 40px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.tablet} {
    flex-direction: column; /* 태블릿에서는 세로 정렬 */
    align-items: center;
    gap: 20px;
  }

  ${media.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const Address = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Plus Jakarta Sans';

  ${media.tablet} {
    text-align: center;
    font-size: 15px;
  }

  ${media.mobile} {
    text-align: center;
    font-size: 14px;
    line-height: 1.5; /* 텍스트 줄 간격 조정 */
  }
`;

export const AddressTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin: 0 0 12px 0;
`;

export const SightMap = styled.div`
  display: flex;
  flex: 2;
  gap: 20px;

  ${media.tablet} {
    display: grid; /* grid 레이아웃 사용 */
    grid-template-columns: repeat(2, 1fr); /* 2열 레이아웃 */
    gap: 20px;
    justify-items: center; /* 중앙 정렬 */
  }

  ${media.mobile} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    justify-items: center;
  }
`;

export const SightMapHeader = styled.div`
  flex-grow: 1;
  margin-right: 20px;
  font-size: 18px;
  font-family: 'Noto Serif KR', serif;
  font-weight: 600;

  ${media.tablet} {
    margin-right: 0;
    text-align: center;
    font-size: 16px;
  }

  ${media.mobile} {
    margin-right: 0;
    font-size: 15px;
    text-align: center;
  }
`;

export const SightMapContent = styled.div`
  font-size: 16px;
  font-weight: 300;
  margin-top: 18px;
  font-family: 'Noto Sans';

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: none; /* 모바일에서 숨기기 */
  }
`;

export const Copyright = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid grey;
  margin-top: 36px;
  padding-top: 36px;
  font-weight: 600;
  text-align: center;

  span {
    flex: 1; /* 왼쪽 영역을 채우도록 설정 */
    text-align: left; /* 카피라이트 왼쪽 정렬 */
    align-content: center;
    font-size: 14px;

    ${media.mobile} {
      font-size: 12px;
      text-align: center;
      line-height: 1.4;
    }
  }

  ${media.tablet} {
    flex-direction: column; /* 태블릿에서 세로 정렬 */
    align-items: center;
    text-align: center;
  }

  ${media.mobile} {
    flex-direction: column; /* 모바일에서 세로 정렬 */
    align-items: center;
    text-align: center;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const AdminSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;

  span {
    font-size: 0.9rem;
    display: inline-block; /* 내용이 부모 안에 포함되도록 설정 */
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    padding: 8px;

    ${media.mobile} {
      max-width: 70%;
    }
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
  white-space: nowrap;
  width: auto; /* 버튼 크기를 텍스트에 맞게 조정 */

  img {
    width: 108px;
    height: auto;

    ${media.tablet} {
      margin-top: 8px;
    }

    ${media.mobile} {
      width: 92px;
      margin-top: 8px;
    }
  }

  svg {
    width: 24px;
    height: 24px;
  }

  &:hover {
    opacity: 0.8;
  }
`;
