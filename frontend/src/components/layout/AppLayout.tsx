import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { media } from '../../styles/media';

export type LayoutType = 'default' | 'full' | 'auth';

interface AppLayoutProps {
  children: React.ReactNode;
  type?: LayoutType;
  isAuthPage?: boolean;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  scroll-behavior: smooth;
`;

const layoutStyles = css<{ $type: LayoutType }>`
  width: ${({ theme, $type }) => theme.layout.types[$type].width} !important;
  max-width: ${({ theme, $type }) =>
    theme.layout.types[$type].maxWidth} !important;
  margin: 0 auto !important;
  padding: ${({ theme, $type }) =>
    theme.layout.types[$type].padding} !important;
  position: relative !important;
  z-index: ${({ theme }) => theme.layout.zIndexes.base} !important;

  ${media.mobile} {
    width: 100% !important;
    padding: ${({ theme }) => theme.layout.mobilePadding} !important;
  }

  ${media.tablet} {
    width: ${({ $type }) => ($type === 'full' ? '100%' : '90%')} !important;
    padding: ${({ theme }) => theme.layout.tabletPadding} !important;
  }

  // 기존 페이지 컨테이너 스타일 오버라이드
  & > div[class*='Container'],
  & > div[class*='Wrapper'],
  & > div[class*='Content'],
  & > div[class*='Layout'] {
    width: 100% !important;
    max-width: none !important;
    margin: 0 !important;
    padding: 0 !important;
  }
`;

const MainContent = styled(motion.main)<{ $isAuthPage: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  height: 100%;
  align-items: center;
  padding: ${(props) => (props.$isAuthPage ? '0' : '20px')};
`;

const PageContentContainer = styled.div<{ $type: LayoutType }>`
  ${layoutStyles}
`;

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  type = 'default',
  isAuthPage = false,
}) => {
  return (
    <PageContainer>
      <Header />
      <MainContent
        $isAuthPage={isAuthPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <PageContentContainer $type={type}>{children}</PageContentContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};
