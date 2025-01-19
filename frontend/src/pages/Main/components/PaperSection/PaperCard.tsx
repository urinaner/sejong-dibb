import type { Paper } from './types';
import { PaperCardWrapper } from './styles';

interface PaperCardProps {
  paper: Paper;
}

export const PaperCard = ({ paper }: PaperCardProps) => {
  return (
    <PaperCardWrapper
      onClick={() => window.open(paper.link, '_blank', 'noopener,noreferrer')}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          window.open(paper.link, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      <img src={paper.thesisImage} alt={`${paper.content} 논문 이미지`} />
      <p>{paper.content}</p>
      <p>{paper.author}</p>
      <p>
        {paper.journal} ({paper.publicationDate})
      </p>
    </PaperCardWrapper>
  );
};
