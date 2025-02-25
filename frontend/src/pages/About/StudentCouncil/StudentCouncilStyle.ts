import styled from 'styled-components';
import { media } from '../../../styles/media';

// Wrapper를 제거하고 전역 Container로 대체

export const Content = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  width: 200px;
  height: auto;
  margin: 0 0 50px;

  ${media.mobile} {
    width: 150px;
    margin: 0 0 30px;
  }
`;

export const Title = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #333;
  width: 100%;

  ${media.mobile} {
    font-size: 2rem;
    margin-bottom: 20px;
  }
`;

export const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  margin-bottom: 60px;
  color: #666;
  width: 100%;

  ${media.mobile} {
    font-size: 1.2rem;
    margin-bottom: 40px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  margin-bottom: 40px;

  ${media.mobile} {
    gap: 30px;
  }
`;

export const InfoCard = styled.div`
  width: 100%;
  padding: 30px 0;
  box-sizing: border-box;

  ${media.mobile} {
    padding: 20px 0;
  }
`;

export const InfoTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  color: #333;
  padding-bottom: 15px;
  display: inline-block;
  width: 100%;
  text-align: left;

  ${media.mobile} {
    font-size: 1.6rem;
    margin-bottom: 20px;
    padding-bottom: 10px;
  }
`;

export const OrganizationImage = styled.img`
  width: 100%;
  height: auto;
  margin: 20px auto;
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #333;
  text-decoration: none;
  margin-top: 40px;
  padding: 16px 0;
  transition: color 0.3s ease;

  &:hover {
    color: #e1306c;
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
  }

  ${media.mobile} {
    margin-top: 30px;
    padding: 14px 0;

    span {
      font-size: 1.2rem;
    }
  }
`;

export const MarkdownContainer = styled.div`
  text-align: left;
  line-height: 2;
  color: #444;
  font-size: 1.2rem;
  width: 100%;

  p {
    margin: 1.2em 0;
  }

  strong {
    color: #333;
    font-weight: 600;
  }

  em {
    color: #666;
    font-style: italic;
  }

  ${media.mobile} {
    font-size: 1.1rem;
    line-height: 1.8;
  }
`;
