import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import * as S from './TabSectionStyle';
// import BasicInfo from './tabs/BasicInfo';
import Publications from './tabs/Publications';

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
      // case 'basic':
      // return <BasicInfo professorId={professorId} />;
      // case 'research':
      case 'publications':
        return <Publications professorId={professorId} />;
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
    <S.TabContainer>
      <S.TabList role="tablist">
        {tabs.map((tab) => (
          <S.TabButton
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => handleTabChange(tab.id)}
            $isActive={activeTab === tab.id}
          >
            {tab.label}
          </S.TabButton>
        ))}
      </S.TabList>

      <S.TabContent role="tabpanel">{renderTabContent()}</S.TabContent>
    </S.TabContainer>
  );
};

export default TabSection;
