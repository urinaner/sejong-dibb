// import PageLayout from '../../components/layout/PageLayout';
import { ContentWrapper, AnnouncementAndSeminar } from './MainStyle';
import { AnnouncementSection } from './components/AnnouncementSection';
// import { SeminarSection } from './components/SeminarSection';
// import { ShortcutSection } from './components/ShortcutSection';
// import { PaperSection } from './components/PaperSection';
import { NewsSection } from './components/NewsSection';
import Container from '../../styles/Container';
import ButtonListSection from './components/ButtonListSection/ButtonListSection';
import VerticalButtonSection from './components/VerticalButtonSection/VerticalButtonSection';

function Main() {
  return (
    <>
      <ButtonListSection />
      <Container type="main">
        <ContentWrapper>
          <AnnouncementAndSeminar>
            <AnnouncementSection />
            {/* <SeminarSection /> */}
          </AnnouncementAndSeminar>
          {/* <ShortcutSection /> */}
          <VerticalButtonSection />
        </ContentWrapper>
        {/* <PaperSection /> */}
        <NewsSection />
      </Container>
    </>
  );
}

export default Main;
