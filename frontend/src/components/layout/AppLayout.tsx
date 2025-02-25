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
  width: ${({ theme, $type }) => theme.layout.types[$type].width};
  max-width: ${({ theme, $type }) => theme.layout.types[$type].maxWidth};
  margin: 0 auto;
  padding: ${({ theme, $type }) => theme.layout.types[$type].padding};
  position: relative;
  z-index: ${({ theme }) => theme.layout.zIndexes.base};

  ${media.mobile} {
    width: 100%;
    padding: ${({ theme }) => theme.layout.mobilePadding};
  }

  ${media.tablet} {
    width: ${({ $type }) => ($type === 'full' ? '100%' : '90%')};
    padding: ${({ theme }) => theme.layout.tabletPadding};
  }
`;

export const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  type = 'default',
  isAuthPage = false,
}) => {
  return (
    <PageContainer>
      <Header />
      <MainContent $isAuthPage={isAuthPage}>
        <PageContentContainer $type={type}>{children}</PageContentContainer>
      </MainContent>
      <Footer />
    </PageContainer>
  );
};
