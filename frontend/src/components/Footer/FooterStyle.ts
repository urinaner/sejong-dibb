import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as token from '../../constants/colors';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Footer = styled.footer`
  width: 100%;
  background-color: ${token.SEJONG_COLORS.GRAY};
  color: white;
  box-sizing: border-box;
`;

export const FooterInner = styled.div`
  max-width: 1920px;
  width: 100%;
  margin: 0 auto;
  padding: 40px;

  ${media.tablet} {
    padding: 24px 40px;
  }

  ${media.mobile} {
    padding: 24px 20px;
  }
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${media.tablet} {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const Address = styled.div`
  flex: 1;
  font-size: 16px;
  font-weight: 500;

  ${media.tablet} {
    text-align: center;
    font-size: 15px;
  }

  ${media.mobile} {
    text-align: center;
    font-size: 14px;
    line-height: 1.5;
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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    justify-items: center;
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

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`;

export const Copyright = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 36px;
  padding-top: 36px;
  font-weight: 600;
  text-align: center;

  span {
    font-size: 14px;
    text-align: center;

    ${media.mobile} {
      font-size: 12px;
      line-height: 1.4;
    }
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const TermsWrapper = styled.div`
  margin-bottom: 1rem;
`;
export const TermsButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  font-size: inherit;
  padding: 0;
  text-align: left;
  width: 100%;

  &:hover {
    text-decoration: underline;
  }
`;
