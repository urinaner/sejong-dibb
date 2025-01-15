import styled from 'styled-components';

// Container components
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 120vh;
  padding: 2rem;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 460px;
  text-align: center;
  margin-top: 64px;
`;

// Logo and header components
export const LogoContainer = styled.div`
  margin-bottom: 2.5rem;

  img {
    width: 140px;
    height: auto;
    margin-bottom: 1rem;
  }
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 1rem;
`;

export const SubTitle = styled.p`
  color: #666;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  line-height: 1.5;
`;

// Form components
export const Form = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 1.5rem;
`;

export const InputWrapper = styled.div`
  margin-bottom: 1rem;
  text-align: left;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
  font-size: 0.9rem;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #3182ce;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #c02327;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s ease;

  &:disabled {
    background-color: #e2e8f0;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #b01e22;
  }
`;

// Toggle components
export const Tabs = styled.div`
  display: flex;
  margin: -2rem -2rem 2rem -2rem;
  border-bottom: 1px solid #e2e8f0;
`;

export const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 1rem;
  background: ${(props) => (props.active ? 'white' : '#F8FAFC')};
  border: none;
  border-top: 3px solid ${(props) => (props.active ? '#C02327' : 'transparent')};
  color: ${(props) => (props.active ? '#1A1A1A' : '#666666')};
  font-weight: ${(props) => (props.active ? '600' : '400')};
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${(props) => (props.active ? 'white' : '#F1F5F9')};
  }
`;

// Footer components
export const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  color: #666;
  font-size: 0.875rem;
`;

export const HelpLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const HelpLink = styled.a`
  color: #666;
  font-size: 0.875rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Error message component
export const ErrorMessage = styled.div`
  color: #e53e3e;
  background-color: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 4px;
  padding: 0.875rem;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
`;
