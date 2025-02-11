import React from 'react';
import styled from 'styled-components';
import { ActivityImage } from '../../types/activity.types';

interface ActivityCardProps {
  image: ActivityImage;
  itemsPerView: number;
  onClick: () => void;
}

const Card = styled.div<{ itemsPerView: number }>`
  flex: 0 0
    calc(
      (100% - ${(props) => (props.itemsPerView - 1) * 20}px) /
        ${(props) => props.itemsPerView}
    );
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
  background: white;
  height: 200px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const ErrorFallback = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
  text-align: center;
  padding: 20px;
`;
const ActivityCard: React.FC<ActivityCardProps> = ({
  image,
  itemsPerView,
  onClick,
}) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
    console.error('Failed to load image:', image.url); // URL 디버깅용 로그 추가
  };

  return (
    <Card
      itemsPerView={itemsPerView}
      onClick={onClick}
      role="button"
      aria-label="활동 사진 보기"
    >
      {imageError ? (
        <ErrorFallback>이미지를 불러올 수 없습니다</ErrorFallback>
      ) : (
        <ImageContainer imageUrl={image.url} onError={handleImageError} />
      )}
    </Card>
  );
};

export default React.memo(ActivityCard);
