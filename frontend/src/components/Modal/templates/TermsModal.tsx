import React from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Modal } from '../index';
import { termsContent, privacyContent, collectionContent } from './contents';

const StyledContent = styled.div`
  min-width: 80vw;
  max-width: 1200px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
`;

const ScrollableContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
  min-height: 0;

  scrollbar-width: thin;
  scrollbar-color: #cbd5e0 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 3px;
  }
`;

const MarkdownWrapper = styled.div`
  text-align: left;
  font-size: 1.125rem;
  line-height: 1.7;
  color: #1a1a1a;

  h1,
  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 1.5em 0 0.8em;
    color: #111827;
  }

  h3,
  h4 {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 1.2em 0 0.6em;
    color: #1f2937;
  }

  p {
    margin: 1em 0;
    color: #374151;
  }

  ul,
  ol {
    padding-left: 2em;
    margin: 1em 0;
  }

  li {
    margin: 0.5em 0;
    color: #374151;
  }

  strong {
    font-weight: 600;
    color: #111827;
  }
`;

const StyledHeader = styled(Modal.Header)`
  padding: 1.5rem 2rem;
  font-size: 1.5rem;
  font-weight: 700;
  border-bottom: 1px solid #e5e7eb;
`;

const StyledFooter = styled(Modal.Footer)`
  padding: 1.5rem 2rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;

const CloseButton = styled(Modal.CloseButton)`
  padding: 0.75rem 2rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, sans-serif;
  font-size: 1rem;
  letter-spacing: -0.01em;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;

  &:hover {
    background-color: #1557b0;
  }

  &:focus {
    outline: none;
  }
`;

export interface TermsModalProps {
  type: 'terms' | 'privacy' | 'collection';
  isOpen: boolean;
  onClose: () => void;
}

const getContent = (type: TermsModalProps['type']) => {
  switch (type) {
    case 'terms':
      return {
        title: '이용약관',
        content: termsContent,
      };
    case 'privacy':
      return {
        title: '개인정보 처리방침',
        content: privacyContent,
      };
    case 'collection':
      return {
        title: '개인정보 수집 및 이용 동의',
        content: collectionContent,
      };
  }
};

export const TermsModal: React.FC<TermsModalProps> = ({
  type,
  isOpen,
  onClose,
}) => {
  const { title, content } = getContent(type);

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <StyledContent>
        <StyledHeader>{title}</StyledHeader>
        <Modal.Content>
          <ScrollableContent>
            <MarkdownWrapper>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </MarkdownWrapper>
          </ScrollableContent>
        </Modal.Content>
      </StyledContent>
    </Modal>
  );
};
