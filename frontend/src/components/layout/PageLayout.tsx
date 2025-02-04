import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5vh;
`;

const Container = styled.div`
  width: 90vw;
  max-width: 1200px;
  padding: 0 20px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    max-width: 90%;
    padding: 0 16px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 12px;
  }
`;

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
}): JSX.Element => {
  return (
    <Layout>
      <Container>{children}</Container>
    </Layout>
  );
};

export default PageLayout;
