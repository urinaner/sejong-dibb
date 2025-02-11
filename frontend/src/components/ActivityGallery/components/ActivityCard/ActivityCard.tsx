// src/components/ActivityGallery/components/ActivityCard/ActivityCard.tsx
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

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div<{ imageUrl: string }>`
  width: 100%;
  height: 200px;
  background-image: url(${(props) => props.imageUrl});
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 16px;
  background: white;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.4;
`;

const Date = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666;
`;

const ErrorFallback = styled.div`
  width: 100%;
  height: 200px;
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

  // 이미지 로드 에러 처리
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <Card
      itemsPerView={itemsPerView}
      onClick={onClick}
      role="button"
      aria-label={`${image.title} 활동 사진 보기`}
    >
      {imageError ? (
        <ErrorFallback>이미지를 불러올 수 없습니다</ErrorFallback>
      ) : (
        <ImageContainer imageUrl={image.url} onError={handleImageError} />
      )}
      <CardContent>
        <Title>{image.title}</Title>
        <Date>{image.date}</Date>
      </CardContent>
    </Card>
  );
};

export default React.memo(ActivityCard);
