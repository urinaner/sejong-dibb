import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../../../constants/colors';
import { AlertTriangle, ChevronLeft } from 'lucide-react';
import Button from '../Button/Button';

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
  hasBackButton?: boolean;
  onBack?: () => void;
  backButtonText?: string;
}

const Container = styled.div`
  max-width: 1400px;
  width: 80vw;
  margin: 0 auto;
  padding: 40px 20px;

  @media (max-width: 768px) {
    width: 100%;
    padding: 20px 16px;
  }

  @media (max-width: 1024px) {
    width: 90%;
    padding: 30px 20px;
  }
`;

const Header = styled.div<{ hasSubtitle: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${(props) => (props.hasSubtitle ? '0.5rem' : '0')};
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid ${SEJONG_COLORS.CRIMSON_RED};

  @media (max-width: 768px) {
    gap: ${(props) => (props.hasSubtitle ? '0.25rem' : '0')};
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
  }
`;

const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  margin: 0;
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.grey[500]};
  margin: 0;
  line-height: 1.4;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 1024px) {
    font-size: 1.1rem;
  }
`;

const Content = styled.div`
  position: relative;
`;

const BackButton = styled(Button)`
  margin-bottom: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${(props) => props.theme.colors.grey[500]};

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
  }
`;

const LoadingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  z-index: 10;
`;

const ErrorDisplay = styled.div`
  padding: 1.5rem;
  background-color: #fff5f5;
  color: ${SEJONG_COLORS.CRIMSON_RED};
  border-radius: 8px;
  font-size: 1rem;
  border: 1px solid #feb2b2;
  text-align: center;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  svg {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    font-size: 0.9rem;
    margin: 1rem 0;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  button {
    background-color: ${SEJONG_COLORS.CRIMSON_RED};
    color: white;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary.crimsonDark};
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    button {
      width: 100%;
      justify-content: center;
    }
  }
`;

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  actions,
  isLoading,
  isError,
  errorMessage,
  hasBackButton,
  onBack,
  backButtonText = '목록으로',
}) => {
  return (
    <Container>
      {hasBackButton && onBack && (
        <BackButton variant="ghost" size="small" onClick={onBack}>
          <ChevronLeft size={18} />
          {backButtonText}
        </BackButton>
      )}

      {(title || actions) && (
        <Header hasSubtitle={!!subtitle}>
          <HeaderTop>
            {title && <Title>{title}</Title>}
            {actions && <ActionsContainer>{actions}</ActionsContainer>}
          </HeaderTop>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Header>
      )}

      <Content>
        {isLoading && (
          <LoadingOverlay>데이터를 불러오는 중입니다...</LoadingOverlay>
        )}

        {isError ? (
          <ErrorDisplay>
            <AlertTriangle size={20} />
            {errorMessage || '오류가 발생했습니다. 다시 시도해주세요.'}
          </ErrorDisplay>
        ) : (
          children
        )}
      </Content>
    </Container>
  );
};

export default PageContainer;
