import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { SEJONG_COLORS } from '../../../../../constants/colors';
import BasicInfo from './BasicInfo';
import Publications from './Publications';

// 스타일 컴포넌트
const TabContainer = styled.div`
  margin-top: 1rem;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    margin-top: 0.5rem;
    min-height: auto;
  }
`;

const TabList = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-radius: 8px 8px 0 0;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    justify-content: flex-start;
    border-radius: 0;
  }
`;

const TabButton = styled.button<{ $isActive: boolean }>`
  padding: 1rem 2rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1rem;
  font-weight: ${(props) => (props.$isActive ? '600' : '500')};
  color: ${(props) =>
    props.$isActive ? SEJONG_COLORS.CRIMSON_RED : props.theme.colors.grey[500]};
  background: ${(props) =>
    props.$isActive ? SEJONG_COLORS.CRIMSON_RED + '10' : 'transparent'};
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  position: relative;

  svg {
    color: currentColor;
    transition: color 0.2s ease;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${(props) =>
      props.$isActive ? SEJONG_COLORS.CRIMSON_RED : 'transparent'};
    transition: all 0.2s ease;
  }

  &:hover {
    color: ${SEJONG_COLORS.CRIMSON_RED};
    background: ${SEJONG_COLORS.CRIMSON_RED}10;
  }

  @media (max-width: 768px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.95rem;
  }
`;

const TabContent = styled.div`
  background: white;
  border: 1px solid ${(props) => props.theme.colors.grey[200]};
  border-top: none;
  border-radius: 0 0 8px 8px;
  padding: 1.5rem;
  flex: 1;

  @media (max-width: 768px) {
    padding: 1rem;
    border-radius: 0;
    border-left: 0;
    border-right: 0;
  }
`;

interface TabSectionProps {
  professorId: number;
}

type TabType = 'basic' | 'research' | 'publications';

const TabSection: React.FC<TabSectionProps> = ({ professorId }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<TabType>('basic');

  useEffect(() => {
    const tab = searchParams.get('tab') as TabType;
    if (tab && ['basic', 'research', 'publications'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return <BasicInfo professorId={professorId} />;
      case 'publications':
        return <Publications professorId={professorId} />;
      case 'research':
        return <div>연구 분야 정보가 준비 중입니다.</div>;
      default:
        return null;
    }
  };

  const tabs = [
    { id: 'basic', label: '기본 정보' },
    { id: 'research', label: '연구 분야' },
    { id: 'publications', label: '논문 목록' },
  ] as const;

  return (
    <TabContainer>
      <TabList role="tablist">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
            $isActive={activeTab === tab.id}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>

      <TabContent role="tabpanel">{renderTabContent()}</TabContent>
    </TabContainer>
  );
};

export default TabSection;
