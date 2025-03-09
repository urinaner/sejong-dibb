import styled from 'styled-components';
import { SEJONG_COLORS } from '../../constants/colors';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
  desktop: '@media(min-width: 1025px)',
};

// 페이지 전체 래퍼
export const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 125px);
  width: 100%;
  padding: 2rem 1rem;
  margin-top: -60px; // 상단 배너의 margin-bottom 값을 상쇄

  ${media.mobile} {
    padding: 1.5rem 1rem;
  }
`;

// 로그인 컨테이너 (전역 컨테이너 적용)
export const LoginContainer = styled.div`
  max-width: 500px;
  padding-top: 180px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// 콘텐츠 래퍼
export const ContentWrapper = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem;

  ${media.mobile} {
    padding: 0.5rem;
  }
`;

// 로고 컨테이너
export const LogoContainer = styled.div`
  margin-bottom: 2rem;

  img {
    width: 120px;
    height: auto;
  }

  ${media.mobile} {
    margin-bottom: 1.5rem;

    img {
      width: 100px;
    }
  }
`;

// 제목 및 부제목
export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin-bottom: 1rem;
  line-height: 1.3;

  ${media.mobile} {
    font-size: 1.6rem;
    margin-bottom: 0.75rem;
  }
`;

export const SubTitle = styled.p`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;

  ${media.mobile} {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
`;

// 폼 요소
export const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  margin-top: 1rem;
  width: 100%;

  ${media.mobile} {
    padding: 1.5rem;
    border-radius: 8px;
  }
`;

export const InputWrapper = styled.div`
  margin-bottom: 1.25rem;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 6px;
  font-size: 0.95rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 2px rgba(163, 20, 50, 0.1);
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.grey[300]};
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: ${(props) => props.theme.colors.grey[300]};
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: ${(props) => props.theme.colors.primary.crimsonDark};
  }

  ${media.mobile} {
    padding: 0.875rem;
    font-size: 0.95rem;
  }
`;

// 탭 컴포넌트
export const Tabs = styled.div`
  display: flex;
  margin: -2rem -2rem 2rem -2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey[200]};

  ${media.mobile} {
    margin: -1.5rem -1.5rem 1.5rem -1.5rem;
  }
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  background: ${(props) =>
    props.active ? 'white' : props.theme.colors.grey[50]};
  border: none;
  border-top: 3px solid
    ${(props) => (props.active ? SEJONG_COLORS.CRIMSON_RED : 'transparent')};
  color: ${(props) =>
    props.active ? props.theme.colors.grey[500] : props.theme.colors.grey[500]};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) =>
      props.active ? 'white' : props.theme.colors.grey[100]};
  }

  ${media.mobile} {
    padding: 0.875rem 0.5rem;
    font-size: 0.9rem;
  }
`;

// 푸터 컴포넌트
export const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 0.875rem;

  ${media.mobile} {
    margin-top: 1.5rem;
    font-size: 0.8rem;
  }
`;

export const HelpLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1.5rem;
`;

export const HelpLink = styled.a`
  color: ${(props) => props.theme.colors.grey[500]};
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    text-decoration: underline;
  }
`;

// 에러 메시지 컴포넌트
export const ErrorMessage = styled.div`
  color: #e53e3e;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 6px;
  padding: 0.875rem;
  margin-bottom: 1.25rem;
  font-size: 0.875rem;
  text-align: center;
`;

// 개인정보 동의 관련 컴포넌트
export const PrivacyWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 1.25rem 0;
  gap: 0.75rem;
`;

export const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
  margin-top: 2px;
`;

export const PrivacyLabel = styled.label`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.grey[500]};
  cursor: pointer;
  display: inline-block;
  line-height: 1.5;
  text-align: left;

  button {
    background: none;
    border: none;
    padding: 0;
    color: ${SEJONG_COLORS.CRIMSON_RED};
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      text-decoration: underline;
      color: ${(props) => props.theme.colors.primary.crimsonDark};
    }

    &:focus {
      outline: none;
      text-decoration: underline;
    }
  }
`;
