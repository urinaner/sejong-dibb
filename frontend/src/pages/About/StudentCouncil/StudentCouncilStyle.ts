import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px 0;
  width: 80vw;
  max-width: 900px;
  margin: 0 auto;
`;

export const Content = styled.div`
  width: 100%;
  text-align: center;
  padding: 20px;
`;

export const Logo = styled.img`
  width: 35vw;
  height: auto;
  margin: 0 0 50px;

  @media (max-width: 768px) {
    width: 200px;
    margin: 0 0 30px;
  }
`;

export const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 30px;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2.4rem;
    margin-bottom: 20px;
  }
`;

export const Description = styled.p`
  font-size: 1.8rem;
  line-height: 1.6;
  margin-bottom: 60px;
  color: #666;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin-bottom: 40px;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 20px;
  padding: 50px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 30px;
  }
`;

export const InfoTitle = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
  margin-bottom: 40px;
  color: #333;
  border-bottom: 4px solid #ff69b4;
  padding-bottom: 15px;
  display: inline-block;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 30px;
  }
`;

export const OrganizationImage = styled.img`
  width: 100%;
  height: auto;
  margin: 20px auto;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
`;

export const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #333;
  text-decoration: none;
  margin-top: 70px;
  padding: 16px 32px;
  border-radius: 40px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    color: #e1306c;
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  span {
    font-size: 1.4rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    margin-top: 50px;
    padding: 14px 28px;

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

  @media (max-width: 768px) {
    font-size: 1.1rem;
    line-height: 1.8;
  }
`;
