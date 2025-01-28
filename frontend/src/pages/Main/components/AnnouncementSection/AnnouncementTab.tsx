import { TabContainer, TabButton } from '../../MainStyle';

interface AnnouncementTabProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AnnouncementTab = ({
  activeTab,
  onTabChange,
}: AnnouncementTabProps) => {
  const tabs = ['학부', '대학원', '취업', '장학'];

  return (
    <TabContainer>
      {tabs.map((tab) => (
        <TabButton
          key={tab}
          isActive={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </TabButton>
      ))}
    </TabContainer>
  );
};
