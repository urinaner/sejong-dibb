import PageLayout from '../../components/layout/PageLayout';
import { ContentWrapper, AnnouncementAndSeminar } from './MainStyle';
import { AnnouncementSection } from './components/AnnouncementSection';
import { SeminarSection } from './components/SeminarSection';
import { ShortcutSection } from './components/ShortcutSection';
import { PaperSection } from './components/PaperSection';
import { NewsSection } from './components/NewsSection';

function Main(): JSX.Element {
  return (
    <PageLayout>
      <ContentWrapper>
        <AnnouncementAndSeminar>
          <AnnouncementSection />
          <SeminarSection />
        </AnnouncementAndSeminar>
        <ShortcutSection />
      </ContentWrapper>
      <PaperSection />
      <NewsSection />
    </PageLayout>
  );
}

export default Main;
