import styled from 'styled-components';

export const media = {
  mobile: '@media(max-width: 768px)',
  tablet: '@media(max-width: 1024px)',
  desktop: '@media(min-width: 1025px)',
};

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;

  ${media.mobile} {
    width: 100%;
    padding: 16px;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #e2e8f0;

  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.8rem;
  font-weight: bold;
  color: #1a202c;
  margin: 0;

  ${media.mobile} {
    font-size: 1.4rem;
    width: 100%;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  ${media.mobile} {
    gap: 1rem;
  }
`;

export const FormSection = styled.div`
  position: relative;
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  ${media.mobile} {
    border-radius: 8px;
    box-shadow: none;
  }
`;

export const FormTitle = styled.h2`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.2rem;
  font-weight: 500;
  color: #333333;
  margin: 0;
  padding: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eaeaea;

  ${media.mobile} {
    font-size: 1.1rem;
    padding: 1rem;
    padding-bottom: 0.8rem;
  }
`;

export const FormContent = styled.div`
  padding: 1.5rem;

  ${media.mobile} {
    padding: 1rem;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${media.mobile} {
    margin-bottom: 1rem;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  color: #4a5568;

  ${media.mobile} {
    font-size: 0.8rem;
    margin-bottom: 0.3rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
  background-color: white;

  &:focus {
    border-color: #1a73e8;
    outline: none;
    box-shadow: 0 0 0 3px rgba(26, 115, 232, 0.1);
  }

  &:disabled {
    background-color: #f8f9fa;
    cursor: not-allowed;
  }

  &::placeholder {
    color: #a0aec0;
  }

  ${media.mobile} {
    padding: 0.6rem;
    font-size: 0.8rem;
    border-radius: 4px;
  }
`;

export const InputWithIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    right: 12px;
    color: #1a73e8;
    min-width: 18px;
  }

  input {
    padding-right: 2.5rem;
  }

  ${media.mobile} {
    svg {
      right: 8px;
      width: 16px;
      height: 16px;
    }

    input {
      padding-right: 2rem;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;

  ${media.mobile} {
    flex-direction: column;
    padding: 1rem;
    gap: 0.5rem;
    margin-top: 1rem;
    border-radius: 8px;

    button {
      width: 100%;
      height: 44px; // 모바일에서 터치 영역 확대
      font-size: 0.9rem;
    }
  }
`;

export const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 12px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.875rem;
  border: 1px solid #feb2b2;

  svg {
    flex-shrink: 0;
    min-width: 18px;
  }

  ${media.mobile} {
    padding: 0.75rem;
    font-size: 0.8rem;
    border-radius: 8px;

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  color: #4a5568;
  font-size: 1.1rem;
  font-family: 'Noto Sans KR', sans-serif;

  ${media.mobile} {
    min-height: 200px;
    font-size: 0.9rem;
  }
`;

export const RequiredMark = styled.span`
  color: #e53e3e;
  margin-left: 2px;
`;

export const HelperText = styled.p`
  margin-top: 0.25rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  color: #718096;

  ${media.mobile} {
    font-size: 0.7rem;
    margin-top: 0.2rem;
  }
`;

// 스크롤바 스타일링
export const GlobalStyle = styled.div`
  * {
    scrollbar-width: thin;
    scrollbar-color: #cbd5e0 #f8f9fa;
  }

  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: #f8f9fa;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #cbd5e0;
    border-radius: 3px;
  }

  ${media.mobile} {
    *::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
  }
`;
