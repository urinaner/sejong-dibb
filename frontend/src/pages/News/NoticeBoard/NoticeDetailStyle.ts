import styled from 'styled-components';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  color: #1a202c;
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  color: #4a5568;
  font-size: 1.1rem;

  ${media.mobile} {
    gap: 1.5rem;
    font-size: 0.9rem;
  }
`;

export const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const Label = styled.span`
  font-weight: 600;
  color: #2d3748;
`;

export const QuillContent = styled.div`
  padding: 2rem 0;
  min-height: 300px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #2d3748;

  /* Quill 스타일 커스터마이징 */
  &.ql-editor {
    padding: 0;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1.5rem 0 1rem;
      font-weight: 600;
      color: #1a202c;
    }

    h1 {
      font-size: 2em;
    }
    h2 {
      font-size: 1.5em;
    }
    h3 {
      font-size: 1.17em;
    }

    p {
      margin-bottom: 1rem;
    }

    ul,
    ol {
      padding-left: 2rem;
      margin-bottom: 1rem;
    }

    li {
      margin-bottom: 0.5rem;
    }

    blockquote {
      border-left: 4px solid #e2e8f0;
      padding-left: 1rem;
      margin: 1rem 0;
      color: #4a5568;
    }

    pre {
      background-color: #f8fafc;
      padding: 1rem;
      border-radius: 6px;
      margin: 1rem 0;
    }

    code {
      background-color: #f8fafc;
      padding: 0.2rem 0.4rem;
      border-radius: 4px;
      font-family: monospace;
    }

    img {
      max-width: 100%;
      height: auto;
      margin: 1rem 0;
      border-radius: 6px;
    }

    a {
      color: #3182ce;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  ${media.mobile} {
    font-size: 1rem;
  }
`;

export const FileSection = styled.div`
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #e2e8f0;
`;

export const FileLink = styled.a`
  display: inline-flex;
  align-items: center;
  color: #3182ce;
  text-decoration: none;
  font-size: 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
`;

export const Button = styled.button`
  padding: 12px 24px;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #4a5568;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #edf2f7;
    border-color: #cbd5e0;
  }

  ${media.mobile} {
    padding: 10px 20px;
    font-size: 0.9rem;
  }
`;

export const Loading = styled.div`
  text-align: center;
  padding: 2rem;
  color: #4a5568;
  font-size: 1.1rem;
`;

export const Error = styled.div`
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  background-color: #fff5f5;
  color: #e53e3e;
  border-radius: 6px;
  font-size: 1.1rem;
`;
