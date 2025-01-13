import styled from 'styled-components';

const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 80vw;
  margin: 0;
  padding: 40px 20px;

  ${media.tablet} {
    width: 90%;
    padding: 30px 15px;
  }

  ${media.mobile} {
    width: 95%;
    padding: 20px 10px;
  }
`;

export const ContentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 2rem;

  ${media.tablet} {
    padding: 1.5rem;
  }

  ${media.mobile} {
    padding: 1rem;
  }
`;

export const Header = styled.div`
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 1.5rem;
  width: 100%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: #1a202c;
  line-height: 1.4;
  word-break: keep-all;

  ${media.mobile} {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

export const QuillContent = styled.div`
  padding: 2rem 0;
  min-height: 300px;
  font-size: 1.1rem;
  line-height: 1.7;
  color: #2d3748;
  width: 100%;

  img {
    max-width: 100%;
    height: auto;
    margin: 1rem auto;
    display: block;
  }

  p {
    margin-bottom: 1rem;
    width: 100%;
  }

  // 기존 Quill 스타일 유지
  &.ql-editor {
    padding: 0;
    width: 100%;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin: 1.5rem 0 1rem;
      font-weight: 600;
      color: #1a202c;
      width: 100%;
    }
  }

  ${media.mobile} {
    font-size: 1rem;
    padding: 1.5rem 0;
  }
`;

export const FileSection = styled.div`
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  width: 100%;
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #e2e8f0;
  width: 100%;

  ${media.mobile} {
    gap: 0.5rem;
  }
`;

// 기본 버튼 스타일
export const Button = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ddd;
  background-color: white;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  min-width: 80px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;

  &:hover {
    background-color: #f8f9fa;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${media.mobile} {
    padding: 0.375rem 0.75rem;
    min-width: 70px;
    height: 32px;
  }
`;

// 수정 버튼
export const EditButton = styled(Button)`
  background-color: #f8f9fa;
  border-color: #ddd;
  color: #333;

  &:hover {
    background-color: #e9ecef;
    border-color: #ccc;
  }
`;

// 삭제 버튼
export const DeleteButton = styled(Button)`
  background-color: white;
  border-color: #ddd;
  color: #dc3545;

  &:hover {
    background-color: #fff5f5;
    border-color: #dc3545;
  }

  &:disabled {
    background-color: #ffe3e3;
    border-color: #ffc9c9;
    color: #fa5252;
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

export const FileListHeader = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 1rem;
`;

export const FileList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const FileItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f7fafc;
  }
`;

export const FileIcon = styled.span`
  font-size: 1.2rem;
`;

export const FileName = styled.span`
  flex: 1;
  font-size: 0.95rem;
  color: #4a5568;
  word-break: break-all;
`;

export const FileDownloadButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  color: #3182ce;
  background-color: transparent;
  border: 1px solid #3182ce;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;

  &:hover {
    background-color: #3182ce;
    color: white;
  }

  ${media.mobile} {
    padding: 0.375rem 0.75rem;
    font-size: 0.85rem;
  }
`;

export const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  color: #4a5568;
  font-size: 1.1rem;
  position: relative;

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

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);

  ${media.mobile} {
    position: static;
    transform: none;
    margin-top: 1rem;
    justify-content: flex-end;
    width: 100%;
  }
`;
