import {
  ContentContainer,
  AnnouncementItem,
  NoAnnouncements,
} from '../../MainStyle';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';

export interface Announcement {
  id: number;
  title: string;
  createdDate: string;
  viewCount: number;
  writer: string;
  category: string;
}
interface AnnouncementListProps {
  announcements: Announcement[];
  loading: boolean;
  error: Error | null;
  onAnnouncementClick: (id: number) => void;
}

export const AnnouncementList = ({
  announcements,
  loading,
  error,
  onAnnouncementClick,
}: AnnouncementListProps) => {
  if (loading) return <LoadingSpinner text={'공지사항을 불러오는중 입니다.'} />;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;
  if (announcements.length === 0)
    return <NoAnnouncements>등록된 공지사항이 없습니다.</NoAnnouncements>;

  return (
    <ContentContainer>
      {announcements.slice(0, 5).map((announcement) => (
        <AnnouncementItem
          key={announcement.id}
          onClick={() => onAnnouncementClick(announcement.id)}
        >
          <span>
            <img src="/bullet.svg" alt="bullet" />
            {announcement.title}
          </span>
          <span>{announcement.createdDate}</span>
        </AnnouncementItem>
      ))}
    </ContentContainer>
  );
};
