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

  ${media.mobile} {
    font-size: 1.5rem;
  }
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
    padding: 1.5rem 0;
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
  padding: 0.5rem 1rem;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #edf2f7;
    border-color: #cbd5e0;
    text-decoration: none;
  }

  ${media.mobile} {
    font-size: 0.9rem;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;

  ${media.mobile} {
    flex-wrap: wrap;
    gap: 0.75rem;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background-color: white;
  color: #4a5568;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #f7fafc;
    border-color: #cbd5e0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${media.mobile} {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
  }
`;

export const EditButton = styled(Button)`
  background-color: #3182ce;
  border-color: #3182ce;
  color: white;

  &:hover {
    background-color: #2c5282;
    border-color: #2c5282;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #e53e3e;
  border-color: #e53e3e;
  color: white;

  &:hover {
    background-color: #c53030;
    border-color: #c53030;
  }

  &:disabled {
    background-color: #fc8181;
    border-color: #fc8181;
  }
`;

export const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: #4a5568;
  font-size: 1.1rem;
`;

export const Error = styled.div`
  margin: 2rem auto;
  padding: 1rem;
  max-width: 600px;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 6px;
  text-align: center;
  font-size: 1.1rem;
  border: 1px solid #feb2b2;

  ${media.mobile} {
    font-size: 1rem;
    margin: 1.5rem auto;
  }
`;

// 새로운 상태 표시 컴포넌트
export const StatusMessage = styled.div<{ type: 'success' | 'error' | 'info' }>`
  margin: 1rem 0;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  font-size: 1rem;

  ${(props) => {
    switch (props.type) {
      case 'success':
        return `
          background-color: #f0fff4;
          color: #2f855a;
          border: 1px solid #9ae6b4;
        `;
      case 'error':
        return `
          background-color: #fff5f5;
          color: #c53030;
          border: 1px solid #feb2b2;
        `;
      case 'info':
        return `
          background-color: #ebf8ff;
          color: #2c5282;
          border: 1px solid #90cdf4;
        `;
    }
  }}
`;
