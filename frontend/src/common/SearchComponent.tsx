import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Search as SearchIcon } from 'lucide-react';
import { SEJONG_COLORS } from '../constants/colors';
import { media } from '../styles/media';

interface SearchComponentProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
  initialValue?: string;
  searchInProgress?: boolean;
  section?: 'board' | 'news' | 'seminar' | 'thesis';
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSearch,
  placeholder = '검색어를 입력하세요',
  initialValue = '',
  searchInProgress = false,
  section = 'board',
}) => {
  const [keyword, setKeyword] = useState<string>(initialValue);

  // 초기값이 컴포넌트 외부에서 변경될 경우 업데이트
  useEffect(() => {
    setKeyword(initialValue);
  }, [initialValue]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (keyword.trim()) {
        onSearch(keyword.trim());
      }
    },
    [keyword, onSearch],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [],
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (keyword.trim()) {
          onSearch(keyword.trim());
        }
      }
    },
    [keyword, onSearch],
  );

  const handleClear = useCallback(() => {
    setKeyword('');
    if (initialValue) {
      onSearch('');
    }
  }, [initialValue, onSearch]);

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInputContainer>
          <SearchInput
            type="text"
            placeholder={placeholder}
            value={keyword}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            data-section={section}
          />
          {keyword && (
            <ClearButton type="button" onClick={handleClear}>
              ✕
            </ClearButton>
          )}
          <SearchButton type="submit" disabled={searchInProgress}>
            {searchInProgress ? (
              <SpinnerContainer>
                <Spinner />
              </SpinnerContainer>
            ) : (
              <SearchIcon size={18} />
            )}
            <ButtonText>검색</ButtonText>
          </SearchButton>
        </SearchInputContainer>
      </SearchForm>
    </SearchContainer>
  );
};

// 컨테이너 스타일 변경 - 마진 감소, width 조정
const SearchContainer = styled.div`
  margin: 0; // 마진 제거
  width: 100%;
  max-width: 400px; // 너비 제한
`;

const SearchForm = styled.form`
  width: 100%;
  display: flex;
`;

const SearchInputContainer = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  position: relative;

  &:focus-within {
    border-color: ${SEJONG_COLORS.CRIMSON_RED};
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1rem;
  padding-right: 2.5rem; /* Space for clear button */
  border: none;
  outline: none;
  font-size: 0.95rem;
  color: #333;

  &::placeholder {
    color: #a0aec0;
  }

  ${media.mobile} {
    padding: 0.7rem 0.8rem;
    font-size: 0.9rem;
  }
`;

// 삭제 버튼 z-index 조정 및 위치 조정
const ClearButton = styled.button`
  position: absolute;
  right: 6rem; /* Position before search button */
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #a0aec0;
  font-size: 1rem;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
  z-index: 1;

  &:hover {
    color: #4a5568;
  }

  ${media.mobile} {
    right: 3rem;
  }
`;

const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  background-color: ${SEJONG_COLORS.CRIMSON_RED};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  position: relative; // 상대 위치 설정
  z-index: 0; // z-index 설정

  &:hover {
    background-color: #b71c1c;
  }

  &:disabled {
    background-color: #e57373;
    cursor: not-allowed;
  }

  ${media.mobile} {
    padding: 0.7rem 1rem;
  }
`;

const ButtonText = styled.span`
  ${media.mobile} {
    display: none;
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
`;

const Spinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 0.8s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export default SearchComponent;
