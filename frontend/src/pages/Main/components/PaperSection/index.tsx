import { PaperContainer, Title, TMP } from '../../MainStyle';
import { PaperCard } from './PaperCard';
import { useThesisList } from '../../../../hooks/queries/useThesis';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';
import { Paper, ThesisFilter } from './types';

export const PaperSection = () => {
  const filter: ThesisFilter = {
    page: 0,
    size: 4,
  };
  const { data, isLoading, error } = useThesisList(filter);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div>논문 데이터를 불러오는데 실패했습니다.</div>;

  // API 응답을 Paper 타입으로 캐스팅
  const papers: Paper[] = data?.data || [];

  return (
    <PaperContainer>
      <Title>연구 논문</Title>
      {papers.length === 0 ? (
        <p>논문이 없습니다.</p>
      ) : (
        <TMP>
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </TMP>
      )}
    </PaperContainer>
  );
};
