import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnnouncementContainer, AnnouncementHeader } from '../../MainStyle';
import { AnnouncementTab } from './AnnouncementTab';
import { AnnouncementList } from './AnnouncementList';
import { useGetNoticeList } from '../../../../hooks/queries/useNotice';
import { CATEGORY_MAP } from '../../constants';
import styled from 'styled-components';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { IconBaseProps } from 'react-icons';

const ArrowIcon = styled(
  AiOutlineArrowRight as React.ComponentType<IconBaseProps>,
)`
  cursor: pointer;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
  font-size: 1.5rem;

  &:hover {
    transform: translateX(5px);
    color: #a30027;
  }
`;

export const AnnouncementSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('학부');

  const { data, isLoading, error } = useGetNoticeList({
    category: CATEGORY_MAP[activeTab as keyof typeof CATEGORY_MAP],
    page: 0,
    size: 5,
    sort: 'DESC',
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleAnnouncementClick = (id: number) => {
    navigate(`/news/noticeboard/${id}`);
  };

  const handleArrowClick = () => {
    navigate('/news/noticeboard');
  };

  return (
    <AnnouncementContainer>
      <AnnouncementHeader>
        <p>공지사항</p>
        <ArrowIcon onClick={handleArrowClick} />
      </AnnouncementHeader>
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
