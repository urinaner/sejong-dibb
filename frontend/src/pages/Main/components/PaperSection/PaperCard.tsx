import { Paper } from './types';
import {
  PaperCard as StyledPaperCard,
  PaperTitle,
  PaperAuthor,
  PaperInfo,
} from './styles';

interface PaperCardProps {
  paper: Paper;
}

export const PaperCard = ({ paper }: PaperCardProps) => {
  const handleClick = () => {
    window.open(paper.link, '_blank', 'noopener,noreferrer');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  };

  return (
    <StyledPaperCard
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyPress={handleKeyPress}
    >
      <img
        src={paper.thesisImage}
        alt={`${paper.content} 논문 이미지`}
        loading="lazy"
      />
      <PaperTitle>{paper.content}</PaperTitle>
      <PaperAuthor>{paper.author}</PaperAuthor>
      <PaperInfo>
        {paper.journal} ({paper.publicationDate})
      </PaperInfo>
    </StyledPaperCard>
  );
};
