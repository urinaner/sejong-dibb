import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const HeaderSection = styled.div`
  margin-bottom: 40px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 600;
  color: #1a202c;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 16px;
  color: #4a5568;
  line-height: 1.5;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;
`;

export const SearchContainer = styled.form`
  position: relative;
  width: 300px;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  padding-right: 44px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 15px;
  transition: all 0.2s;
  background-color: #f8fafc;

  &:focus {
    outline: none;
    border-color: #3182ce;
    background-color: white;
    box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 8px;
  color: #4a5568;
  cursor: pointer;
  transition: color 0.2s;

  &:hover {
    color: #2d3748;
  }
`;

export const ThesisList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const ThesisItem = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #cbd5e0;
  }
`;

export const ThesisThumbnail = styled.div`
  width: 140px;
  height: 180px;
  background-color: #f7fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #718096;
  font-size: 15px;
  flex-shrink: 0;
  overflow: hidden;
  transition: all 0.2s;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    border-color: #cbd5e0;
  }
`;

export const ThesisContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 8px 0;
`;

export const ThesisTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0;
  line-height: 1.4;

  &:hover {
    color: #2b6cb0;
  }
`;

export const ThesisInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
`;

export const Label = styled.span`
  color: #e53e3e;
  font-weight: 500;
  margin-right: 4px;
  width: 60px;
`;

export const Value = styled.span`
  color: #4a5568;
  font-weight: 400;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 48px;
`;

export const PageButton = styled.button<{ $isActive?: boolean }>`
  padding: 8px 12px;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => (props.$isActive ? '#3182ce' : '#e2e8f0')};
  border-radius: 6px;
  background-color: ${(props) => (props.$isActive ? '#3182ce' : 'white')};
  color: ${(props) => (props.$isActive ? 'white' : '#4a5568')};
  font-weight: ${(props) => (props.$isActive ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: ${(props) => (props.$isActive ? '#2c5282' : '#f7fafc')};
    border-color: ${(props) => (props.$isActive ? '#2c5282' : '#cbd5e0')};
  }

  &:disabled {
    background-color: #f7fafc;
    border-color: #e2e8f0;
    color: #a0aec0;
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.div`
  text-align: center;
  padding: 48px;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: 8px;
  font-size: 15px;
  border: 1px solid #feb2b2;
  margin-bottom: 24px;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #4a5568;
  font-size: 15px;
  margin-bottom: 24px;
`;

export const NoResultsMessage = styled.div`
  text-align: center;
  padding: 48px;
  color: #4a5568;
  font-size: 15px;
  background-color: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
`;
