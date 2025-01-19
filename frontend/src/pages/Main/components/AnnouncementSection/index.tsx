import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnnouncementContainer } from '../../MainStyle';
import { AnnouncementTab } from './AnnouncementTab';
import { AnnouncementList } from './AnnouncementList';
import { useGetNoticeList } from '../../../../hooks/queries/useNotice';
import { CATEGORY_MAP } from '../../constants';

export const AnnouncementSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('학부');

  const { data, isLoading, error } = useGetNoticeList({
    category: CATEGORY_MAP[activeTab as keyof typeof CATEGORY_MAP],
    page: 0,
    size: 5,
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAnnouncementClick = (id: number) => {
    navigate(`/news/noticeboard/${id}`);
  };

  return (
    <AnnouncementContainer>
      <p>공지사항</p>
      <AnnouncementTab activeTab={activeTab} onTabChange={handleTabChange} />
      <AnnouncementList
        announcements={data?.data || []}
        loading={isLoading}
        error={error}
        onAnnouncementClick={handleAnnouncementClick}
      />
    </AnnouncementContainer>
  );
};
