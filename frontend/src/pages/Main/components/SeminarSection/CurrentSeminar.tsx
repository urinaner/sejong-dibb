import { useNavigate } from 'react-router-dom';
import type { Seminar } from './types';
import { LoadingSpinner } from '../../../../components/LoadingSpinner';

interface CurrentSeminarProps {
  seminar: Seminar | null;
  loading: boolean;
}

export const CurrentSeminar = ({ seminar, loading }: CurrentSeminarProps) => {
  const navigate = useNavigate();

  if (loading)
    return <LoadingSpinner text={'최신 세미나정보를 불러오는중 입니다.'} />;
  if (!seminar) return <p>세미나가 없습니다.</p>;

  return (
    <button
      style={{ flex: '1' }}
      onClick={() => navigate(`/news/seminar/${seminar.id}`)}
    >
      <p style={{ justifyContent: 'center', marginBottom: '1rem' }}>세미나</p>
      <p>{seminar.name}</p>
      <div>
        {seminar.speaker}
        <br />
        {seminar.startTime}
        <br />
        {seminar.place}
      </div>
    </button>
  );
};
