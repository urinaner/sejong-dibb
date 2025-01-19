import { Container, Title, GridContainer } from './styles';
import { PaperCard } from './PaperCard';
import { useThesisList } from '../../../../hooks/queries/useThesis';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';

export const PaperSection = () => {
  const { data, isLoading, error } = useThesisList({
    page: 0,
    size: 4,
  });

  if (isLoading)
    return <LoadingSpinner text={'논문정보를 불러오는중 입니다.'} />;
  if (error) return <div>논문 데이터를 불러오는데 실패했습니다.</div>;

  const papers = data?.data || [];

  return (
    <Container>
      <Title>연구 논문</Title>
      {papers.length === 0 ? (
        <p>논문이 없습니다.</p>
      ) : (
        <GridContainer>
          {papers.map((paper) => (
            <PaperCard key={paper.id} paper={paper} />
          ))}
        </GridContainer>
      )}
    </Container>
  );
};
