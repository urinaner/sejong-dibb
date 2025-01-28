import { SeminarContainer } from '../../MainStyle';
import { CurrentSeminar } from './CurrentSeminar';
import { SeminarReservation } from './SeminarReservation';
import { useSeminarList } from '../../../../hooks/queries/useSeminar';

export const SeminarSection = () => {
  const { data, isLoading } = useSeminarList({
    page: 0,
    size: 1,
    sortDirection: 'DESC',
  });

  const currentSeminar = data?.data[0] || null;

  return (
    <SeminarContainer>
      <CurrentSeminar seminar={currentSeminar} loading={isLoading} />
      <SeminarReservation />
    </SeminarContainer>
  );
};
