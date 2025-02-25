import styled from 'styled-components';
import { media } from '../../../styles/media';

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 600px;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  box-sizing: border-box;

  ${media.mobile} {
    min-height: 450px;
    padding: 30px 0;
  }
`;

export const Information = styled.div`
  display: flex;
  text-align: center;
  width: fit-content;
  max-width: 100%;
  padding: 30px 30px;
  line-height: 1.6;
  font-weight: 600;
  font-size: 28px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  box-sizing: border-box;

  ${media.tablet} {
    padding: 30px 60px;
    margin-bottom: 40px;
    font-size: 26px;
  }

  ${media.mobile} {
    padding: 20px 30px;
    margin-bottom: 30px;
    max-width: 95%;
    font-size: 24px;
  }
`;

export const HyperlinksContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  gap: 40px;

  ${media.tablet} {
    gap: 30px;
  }

  ${media.mobile} {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    width: 90%;
  }
`;

export const Hyperlinks = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: auto;
  cursor: pointer;
  box-sizing: border-box;
  overflow: visible;
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  img {
    width: 150%;
    height: auto;
    display: block;
  }

  ${media.tablet} {
    width: 180px;
  }

  ${media.mobile} {
    width: 100%;
    min-width: 140px;
  }
`;
